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
        "article-prose max-w-[46rem] text-[1.05rem] leading-8 text-foreground",
        className,
      )}
    >
      {body.introduction.map((paragraph) => (
        <p key={paragraph} className="mb-5 text-muted">
          {paragraph}
        </p>
      ))}

      {body.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-[calc(var(--header-height)+1.5rem)] pt-4"
        >
          <h2 className="mt-10 mb-4 font-heading text-[1.65rem] font-semibold tracking-tight text-balance sm:text-[1.85rem]">
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
        className="scroll-mt-[calc(var(--header-height)+1.5rem)] pt-4"
      >
        <h2 className="mt-10 mb-4 font-heading text-[1.65rem] font-semibold tracking-tight sm:text-[1.85rem]">
          Closing thoughts
        </h2>
        {body.conclusion.map((paragraph) => (
          <p key={paragraph} className="mb-5 text-muted">
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
      return <p className="mb-5 text-muted">{block.text}</p>;
    case "list":
      if (block.ordered) {
        return (
          <ol className="mb-6 list-decimal space-y-2 pl-5 text-muted">
            {block.items.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mb-6 list-disc space-y-2 pl-5 text-muted">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-7 border-l-2 border-accent pl-5 text-[1.05rem] leading-8 text-foreground italic">
          {block.text}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="my-7 rounded-[1.25rem] border border-accent/25 bg-accent-soft/50 px-5 py-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {block.title}
          </p>
          <p className="mt-2 text-[0.975rem] leading-7 text-foreground">
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
