import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailPage } from "@/components/modules/case-studies/case-study-detail-page";
import {
  caseStudies,
  getCaseStudyStory,
} from "@/data/editorial/case-studies";
import { siteConfig } from "@/config/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getCaseStudyStory(slug);

  if (!story) {
    return {
      title: "Case study not found",
    };
  }

  const { study } = story;
  const url = `${siteConfig.url}/case-studies/${study.slug}`;

  return {
    title: study.title,
    description: study.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: study.title,
      description: study.excerpt,
      type: "article",
      url,
      tags: [study.categoryLabel, "Illustrative scenario"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const story = getCaseStudyStory(slug);

  if (!story) {
    notFound();
  }

  return <CaseStudyDetailPage study={story.study} detail={story.detail} />;
}
