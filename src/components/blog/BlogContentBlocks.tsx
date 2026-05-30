import { contentToBlocks } from "@/lib/cms";

export default function BlogContentBlocks({ content }: { content: string }) {
  const blocks = contentToBlocks(content);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.type}-${index}`}
              className="text-3xl font-semibold text-[var(--foreground)]"
            >
              {block.value}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="space-y-3 pl-5 text-base leading-8 text-[var(--muted)]"
            >
              {block.value.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={`${block.type}-${index}`}
            className="text-base leading-8 text-[var(--muted)]"
          >
            {block.value}
          </p>
        );
      })}
    </div>
  );
}
