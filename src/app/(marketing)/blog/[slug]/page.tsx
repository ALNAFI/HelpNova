import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/modules/blog/article-page";
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticlePage post={article.post} body={article.body} />;
}
