"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { faqAssistantPrompt, faqChatbotCategories } from "@/data/faqChatbot";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type ChatbotResponse = {
  answer?: string;
  provider?: "groq" | "local";
  relatedQuestions?: string[];
  error?: string;
};

const welcomeMessage =
  "Ask me about Awish Clinic services, recovery basics, Delhi coverage, consultation flow or the FAQs listed on the site. You can also start with the quick topics above.";

const createMessage = (
  role: ChatMessage["role"],
  content: string
): ChatMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
});

export default function FAQChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", welcomeMessage),
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [showInlineAssistantPrompt, setShowInlineAssistantPrompt] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectedCategory = useMemo(
    () => faqChatbotCategories.find((category) => category.id === selectedCategoryId) ?? null,
    [selectedCategoryId]
  );

  useEffect(() => {
    if (open) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, relatedQuestions, open, isLoading]);

  const appendMessages = (...nextMessages: ChatMessage[]) => {
    setMessages((current) => [...current, ...nextMessages]);
  };

  const resetToCategories = () => {
    setSelectedCategoryId(null);
    setShowInlineAssistantPrompt(false);
  };

  const focusInput = () => {
    window.setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleInlineAssistantPrompt = () => {
    setShowInlineAssistantPrompt(true);
    appendMessages(
      createMessage(
        "assistant",
        "You are still inside the Awish Clinic assistant. Type your detailed question below and I will answer here using the clinic information available on the site."
      )
    );
    focusInput();
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    setError(null);
    setShowInlineAssistantPrompt(false);
    setRelatedQuestions([]);
    appendMessages(
      createMessage("user", question),
      createMessage("assistant", answer)
    );
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    focusInput();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userMessage = input.trim();
    if (!userMessage || isLoading) {
      return;
    }

    const history = messages
      .slice(-6)
      .map((message) => ({ role: message.role, content: message.content }));

    setError(null);
    setInput("");
    setShowInlineAssistantPrompt(false);
    setIsLoading(true);
    appendMessages(createMessage("user", userMessage));

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      const payload = (await response.json()) as ChatbotResponse;

      if (!response.ok || !payload.answer) {
        throw new Error(payload.error || "The chatbot could not answer right now.");
      }

      setRelatedQuestions(payload.relatedQuestions ?? []);
      appendMessages(createMessage("assistant", payload.answer));
    } catch (submissionError) {
      setRelatedQuestions([]);
      setError("The assistant could not reply right now. Please try again in a moment.");
      appendMessages(
        createMessage(
          "assistant",
          "I could not respond just now. Please try again, or ask a more specific question about a service, consultation, recovery or Delhi coverage."
        )
      );
      console.error(submissionError);
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(25rem,calc(100vw-1.5rem))]">
        <div className="overflow-hidden rounded-[1.8rem] border border-[rgba(30,36,34,0.12)] bg-[rgba(255,253,249,0.98)] shadow-[0_30px_90px_rgba(10,18,22,0.18)] backdrop-blur">
          <div className="bg-[linear-gradient(135deg,#17312f_0%,#214d48_100%)] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/62">Awish AI assistant</p>
                <h3 className="mt-2 text-2xl font-semibold">How can we help?</h3>
                <p className="mt-2 text-sm leading-6 text-white/74">
                  Start with the clinic FAQs or ask your own question for a real-time answer inside the chatbot.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold text-white/82 transition hover:bg-white/16"
              >
                Close
              </button>
            </div>
          </div>

          <div className="border-b border-[rgba(30,36,34,0.08)] bg-[rgba(246,241,233,0.55)] px-4 py-4">
            {!selectedCategory ? (
              <div className="space-y-3">
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Choose a topic to explore common questions, or type a custom question below.
                </p>
                <div className="flex flex-wrap gap-2">
                  {faqChatbotCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategoryId(category.id)}
                      className="rounded-full border border-[rgba(30,36,34,0.12)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[rgba(33,77,72,0.18)] hover:bg-[var(--surface)]"
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                      {selectedCategory.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {selectedCategory.intro}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetToCategories}
                    className="rounded-full border border-[rgba(30,36,34,0.12)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-white"
                  >
                    Back
                  </button>
                </div>

                <div className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-1">
                  {selectedCategory.items.map((item, index) => (
                    <button
                      key={`${selectedCategory.id}-${index}`}
                      type="button"
                      onClick={() => handleQuickQuestion(item.question, item.answer)}
                      className="rounded-[1rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-3 text-left text-sm font-semibold text-[var(--foreground)] transition hover:border-[rgba(33,77,72,0.18)] hover:bg-[var(--surface)]"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleInlineAssistantPrompt}
              className="mt-3 block w-full rounded-[1.2rem] bg-[var(--accent)] px-4 py-4 text-left text-white transition hover:bg-[#724230]"
            >
              <p className="font-semibold">{faqAssistantPrompt}</p>
              <p className="mt-1 text-sm leading-6 text-white/82">
                Ask your detailed question right here in the chatbot.
              </p>
            </button>
          </div>

          <div className="max-h-[18rem] overflow-y-auto px-4 py-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-sm ${
                      message.role === "assistant"
                        ? "border border-[rgba(30,36,34,0.08)] bg-white text-[var(--foreground)]"
                        : "bg-[linear-gradient(135deg,#17312f_0%,#214d48_100%)] text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {showInlineAssistantPrompt && (
                <div className="rounded-[1.2rem] border border-dashed border-[rgba(33,77,72,0.22)] bg-[rgba(255,255,255,0.8)] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
                  Ask anything about services, recovery basics, clinic location, consultation flow or the FAQs already listed above.
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-[1.35rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-3 text-sm text-[var(--muted)]">
                    Thinking...
                  </div>
                </div>
              )}

              {!!relatedQuestions.length && !isLoading && (
                <div className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                    Related questions
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => handleSuggestedQuestion(question)}
                        className="rounded-full border border-[rgba(30,36,34,0.12)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="text-sm leading-6 text-[#9b4834]">{error}</p>
              )}

              <div ref={messageEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[rgba(30,36,34,0.08)] bg-white px-4 py-4">
            <div className="flex items-center gap-2 rounded-full border border-[rgba(30,36,34,0.12)] px-2 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about any service, concern or consultation..."
                className="h-10 min-w-0 flex-1 border-none bg-transparent px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                aria-label="Ask the Awish Clinic assistant"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#17312f_0%,#214d48_100%)] px-4 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-[rgba(33,77,72,0.3)] bg-[rgba(15,31,28,0.85)] px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur hover:bg-[rgba(15,31,28,0.95)] hover:scale-105 transition-all duration-300"
        aria-expanded={open}
        aria-label="Open FAQ chatbot"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand)] text-white">
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z" />
          </svg>
        </span>
        <span className="pr-0.5">AI Chat</span>
      </button>
    </>
  );
}
