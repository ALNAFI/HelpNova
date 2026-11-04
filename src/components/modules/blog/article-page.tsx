import { ArticleContent } from "@/components/modules/blog/article-content";
import { ArticleCta } from "@/components/modules/blog/article-cta";
import { ArticleHero } from "@/components/modules/blog/article-hero";
import { ArticleNavigation } from "@/components/modules/blog/article-navigation";
import { ArticleShare } from "@/components/modules/blog/article-share";
import { ArticleToc } from "@/components/modules/blog/article-toc";
import { ReadingProgress } from "@/components/modules/blog/reading-progress";
import { RelatedArticles } from "@/components/modules/blog/related-articles";
import { Container } from "@/components/ui/container";
import {
  getAdjacentBlogPosts,
  getRelatedBlogPosts,
} from "@/data/editorial/blog";
import type { BlogArticleBody, BlogPost } from "@/types/editorial";

type ArticlePageProps = {
  post: BlogPost;
  body: BlogArticleBody;
};

export function ArticlePage({ post, body }: ArticlePageProps) {
  const related = getRelatedBlogPosts(post.slug, 3);
  const adjacent = getAdjacentBlogPosts(post.slug);
  const tocSections = [
    ...body.sections,
    { id: "conclusion", title: "Closing thoughts", blocks: [] },
  ];

  return (
    <div className="relative isolate overflow-hidden">
      <ReadingProgress targetId="article-body" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_45%_at_50%_-6%,var(--glow),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-grid-fade [mask-image:linear-gradient(to_bottom,black_38%,transparent_100%)]"
        aria-hidden
      />

      <ArticleHero post={post} />

      <Container className="pb-4">
        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,46rem)_11rem] lg:justify-between xl:grid-cols-[15rem_minmax(0,46rem)_12rem]">
          <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.25rem)] lg:self-start">
            <ArticleToc sections={tocSections} />
          </aside>

          <article id="article-body" className="min-w-0">
            <ArticleContent body={body} />
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-[calc(var(--header-height)+1.25rem)] space-y-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                Share
              </p>
              <ArticleShare title={post.title} />
            </div>
          </aside>
        </div>
      </Container>

      <div className="mt-10 sm:mt-14">
        <ArticleNavigation previous={adjacent.previous} next={adjacent.next} />
      </div>

      <RelatedArticles posts={related} />
      <ArticleCta />
    </div>
  );
}
