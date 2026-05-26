import { NextResponse } from "next/server";
import {
  buildLocalAssistantReply,
  buildRelatedQuestions,
  formatKnowledgeContext,
  sanitizeHistory,
  searchKnowledge,
  type ChatbotHistoryMessage,
} from "@/lib/chatbotKnowledge";

export const runtime = "nodejs";

const groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";
const defaultModel = "llama-3.3-70b-versatile";

const systemPrompt = `You are the website assistant for Awish Clinic, a Delhi-focused clinic for aesthetic, skin, hair and weight-care services.
Only answer using the Awish Clinic knowledge provided in the prompt plus the conversation history.
Do not invent prices, doctor qualifications, guarantees, medical outcomes or contact details that are not explicitly in the provided knowledge.
Do not claim to diagnose or prescribe. This chatbot gives website guidance only, not medical advice.
If the answer is not confirmed in the knowledge, say that the current site information does not confirm it yet and invite the visitor to ask a narrower question or book a consultation.
Keep the answer concise, warm and useful. Use short paragraphs.`;

interface ChatbotRequestBody {
  message?: string;
  history?: ChatbotHistoryMessage[];
}

export async function POST(request: Request) {
  let body: ChatbotRequestBody;

  try {
    body = (await request.json()) as ChatbotRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const message = body.message?.trim().slice(0, 1500);

  if (!message) {
    return NextResponse.json(
      { error: "Please send a question for the chatbot." },
      { status: 400 }
    );
  }

  const snippets = searchKnowledge(message, 5);
  const relatedQuestions = buildRelatedQuestions(snippets);
  const localAnswer = buildLocalAssistantReply(message);
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      answer: localAnswer,
      provider: "local",
      relatedQuestions,
    });
  }

  const history = sanitizeHistory(body.history);
  const knowledgeContext = formatKnowledgeContext(snippets);
  const groqModel = process.env.GROQ_MODEL || defaultModel;

  try {
    const response = await fetch(groqApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: groqModel,
        temperature: 0.2,
        max_tokens: 350,
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          {
            role: "user",
            content: `Visitor question: ${message}\n\nAwish Clinic knowledge:\n${knowledgeContext}\n\nAnswer the visitor using only this knowledge.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq chatbot request failed:", errorText);

      return NextResponse.json({
        answer: localAnswer,
        provider: "local",
        relatedQuestions,
      });
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const answer = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      answer: answer || localAnswer,
      provider: "groq",
      relatedQuestions,
    });
  } catch (error) {
    console.error("Groq chatbot error:", error);

    return NextResponse.json({
      answer: localAnswer,
      provider: "local",
      relatedQuestions,
    });
  }
}
