import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/modules/blog/article-page";
import { Container } from "@/components/ui/container";
import {
  blogPosts,
  getBlogArticle,
  getBlogCategoryLabel,
} from "@/data/editorial/blog";
import { siteConfig } from "@/config/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  const { post } = article;
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const category = getBlogCategoryLabel(post.category);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      tags: [category],
    },
  };
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<ArticleRouteFallback />}>
      <BlogArticleRoute params={params} />
    </Suspense>
  );
}

async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticlePage post={article.post} body={article.body} />;
}

function ArticleRouteFallback() {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_45%_at_50%_-6%,var(--glow),transparent_58%)]"
        aria-hidden
      />
      <Container className="pt-8 pb-16 sm:pt-12">
        <div className="h-4 w-48 animate-pulse rounded bg-surface-muted" />
        <div className="mt-8 max-w-3xl space-y-4">
          <div className="h-5 w-40 animate-pulse rounded-full bg-surface-muted" />
          <div className="h-12 w-full max-w-2xl animate-pulse rounded-xl bg-surface-muted" />
          <div className="h-20 w-full max-w-xl animate-pulse rounded-xl bg-surface-muted" />
        </div>
        <div className="mt-8 h-56 animate-pulse rounded-[1.6rem] bg-surface-muted sm:h-64 lg:h-72" />
      </Container>
    </div>
  );
}
