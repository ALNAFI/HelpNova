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
