import { ArticleDiagram } from "@/components/modules/blog/article-diagram";
import type {
  BlogArticleBody,
  BlogContentBlock,
} from "@/types/editorial";
import { cn } from "@/utils/cn";

type ArticleContentProps = {
  body: BlogArticleBody;
  className?: string;
};

export function ArticleContent({ body, className }: ArticleContentProps) {
  return (
    <div
      className={cn(
        "article-prose w-full max-w-[54rem] text-[1.05rem] leading-[1.75] text-foreground",
        className,
      )}
    >
      {body.introduction.map((paragraph) => (
        <p key={paragraph} className="mb-4 text-justify text-muted">
          {paragraph}
        </p>
      ))}

      {body.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-[calc(var(--header-height)+1.5rem)] pt-3"
        >
          <h2 className="mt-5 mb-3 font-heading text-[1.65rem] font-semibold tracking-tight text-balance sm:text-[1.85rem]">
            {section.title}
          </h2>
          {section.blocks.map((block, index) => (
            <ContentBlock
              key={`${section.id}-${block.type}-${index}`}
              block={block}
            />
          ))}
        </section>
      ))}

      <section
        id="conclusion"
        className="scroll-mt-[calc(var(--header-height)+1.5rem)] pt-3"
      >
        <h2 className="mt-5 mb-3 font-heading text-[1.65rem] font-semibold tracking-tight sm:text-[1.85rem]">
          Closing thoughts
        </h2>
        {body.conclusion.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-justify text-muted">
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  );
}

function ContentBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4 text-justify text-muted">{block.text}</p>
      );
    case "list":
      if (block.ordered) {
        return (
          <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-justify text-muted">
            {block.items.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mb-5 list-disc space-y-1.5 pl-5 text-justify text-muted">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-5 border-l-[3px] border-accent py-0.5 pl-5 text-justify text-[1.05rem] leading-[1.75] text-foreground italic">
          {block.text}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="my-5 rounded-2xl border border-accent/30 bg-accent-soft/70 px-4 py-3.5">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {block.title}
          </p>
          <p className="mt-1.5 text-justify text-[0.975rem] leading-7 text-foreground">
            {block.text}
          </p>
        </aside>
      );
    case "diagram":
      return (
        <ArticleDiagram kind={block.kind} caption={block.caption} />
      );
    default:
      return null;
  }
}
