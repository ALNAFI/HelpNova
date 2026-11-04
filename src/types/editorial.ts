export type BlogCategoryId =
  | "all"
  | "customer-support"
  | "automation"
  | "shared-inbox"
  | "analytics"
  | "product-guides";

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
};

export type BlogVisualId =
  | "handoffs"
  | "inbox"
  | "routing"
  | "metrics"
  | "notes"
  | "integrations";

export type BlogCardLayout =
  | "editorial"
  | "compact"
  | "image-first"
  | "text-led";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategoryId, "all">;
  readingTime: string;
  publishedAt: string;
  featured: boolean;
  visual: BlogVisualId;
  layout: BlogCardLayout;
  contentPreview: string[];
};

export type BlogDiagramKind =
  | "handoff"
  | "inbox"
  | "routing"
  | "metrics"
  | "notes"
  | "explore";

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "diagram"; kind: BlogDiagramKind; caption: string };

export type BlogArticleSection = {
  id: string;
  title: string;
  blocks: BlogContentBlock[];
};

export type BlogArticleBody = {
  slug: string;
  introduction: string[];
  sections: BlogArticleSection[];
  conclusion: string[];
  relatedSlugs: string[];
};
