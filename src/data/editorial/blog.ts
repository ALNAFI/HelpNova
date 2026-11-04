import { getBlogArticleBody } from "@/data/editorial/blog-content";
import type { BlogCategory, BlogPost } from "@/types/editorial";

export const blogPageCopy = {
  eyebrow: "The HelpNova Journal",
  title: "Fresh perspectives. Better conversations.",
  description:
    "Explore ideas, practical guides, and thoughtful perspectives on customer support, automation, and building better experiences.",
  exploreEyebrow: "Library",
  exploreTitle: "Explore the latest thinking.",
  exploreDescription:
    "Insights and practical ideas for creating better support experiences.",
  searchPlaceholder: "Search articles...",
  emptyTitle: "No stories found.",
  emptyDescription: "Try a different search or explore all articles.",
  clearFiltersLabel: "Clear Filters",
  spotlightEyebrow: "Editorial Spotlight",
  ctaTitle: "Ready to see the ideas in action?",
  ctaDescription:
    "Explore how conversations, automation, and insights come together in HelpNova's interactive demo.",
  demoLabel: "Explore Demo",
  featuresLabel: "Explore Features",
  featuredLabel: "Featured Stories",
  readArticle: "Read Article",
  readStory: "Read Story",
  relatedTitle: "Keep exploring.",
  relatedDescription:
    "More ideas and perspectives from the HelpNova Journal.",
  articleCtaTitle: "Turn ideas into experiences.",
  articleCtaDescription:
    "Explore how conversations, automation, and insights come together in HelpNova's guided demo.",
  backToJournal: "Back to Journal",
  onThisPage: "On this page",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  shareArticle: "Share",
  previousArticle: "Previous article",
  nextArticle: "Next article",
} as const;

export const blogCategories: BlogCategory[] = [
  { id: "all", label: "All Articles" },
  { id: "customer-support", label: "Customer Support" },
  { id: "automation", label: "Automation" },
  { id: "shared-inbox", label: "Shared Inbox" },
  { id: "analytics", label: "Analytics" },
  { id: "product-guides", label: "Product Guides" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "handoffs",
    slug: "better-support-handoffs",
    title: "Designing calmer customer-support handoffs",
    excerpt:
      "How teams keep context intact when a conversation moves from automation to a specialist—without forcing customers to repeat themselves.",
    category: "customer-support",
    readingTime: "6 min read",
    publishedAt: "2026-02-12",
    featured: true,
    visual: "handoffs",
    layout: "editorial",
    contentPreview: [
      "A handoff should feel continuous, not like starting over.",
      "Shared context, clear ownership, and a visible next step reduce friction for everyone involved.",
    ],
  },
  {
    id: "inbox",
    slug: "organizing-shared-inbox",
    title: "Organizing conversations with a shared inbox",
    excerpt:
      "A practical look at channels, status, and ownership—so every message has a clear place and a clear next action.",
    category: "shared-inbox",
    readingTime: "7 min read",
    publishedAt: "2026-01-28",
    featured: true,
    visual: "inbox",
    layout: "image-first",
    contentPreview: [
      "Shared inboxes work best when teams can see the same conversation state.",
      "Filters and ownership cues help attention land where it matters most.",
    ],
  },
  {
    id: "routing",
    slug: "topic-based-routing",
    title: "Topic-based routing and thoughtful workflow automation",
    excerpt:
      "Match · Otherwise branching that routes order, billing, and technical inquiries with room for graceful fallbacks.",
    category: "automation",
    readingTime: "8 min read",
    publishedAt: "2026-01-14",
    featured: true,
    visual: "routing",
    layout: "editorial",
    contentPreview: [
      "Routing is most useful when conditions stay readable.",
      "A clear Otherwise path keeps unexpected inquiries from getting stuck.",
    ],
  },
  {
    id: "metrics",
    slug: "meaningful-support-metrics",
    title: "Understanding meaningful support metrics",
    excerpt:
      "Which signals help teams notice workload, resolution patterns, and conversation health—without chasing vanity numbers.",
    category: "analytics",
    readingTime: "5 min read",
    publishedAt: "2025-12-18",
    featured: false,
    visual: "metrics",
    layout: "text-led",
    contentPreview: [
      "Open volume, assignment balance, and resolution rate tell a clearer story together.",
      "Metrics should illuminate decisions, not create noise.",
    ],
  },
  {
    id: "notes",
    slug: "internal-notes-collaboration",
    title: "Using internal notes for quieter team collaboration",
    excerpt:
      "How private notes keep customer threads readable while teammates share context, next steps, and careful handoffs.",
    category: "customer-support",
    readingTime: "5 min read",
    publishedAt: "2025-12-02",
    featured: false,
    visual: "notes",
    layout: "compact",
    contentPreview: [
      "Internal notes protect the customer view while keeping team thinking close to the thread.",
      "Clarity in notes often shows up as clarity in replies.",
    ],
  },
  {
    id: "integrations",
    slug: "explore-before-integrations",
    title: "Explore support workflows before connecting integrations",
    excerpt:
      "Why trying the local demo first helps teams understand inbox, automation, and insights before wiring external tools.",
    category: "product-guides",
    readingTime: "6 min read",
    publishedAt: "2025-11-20",
    featured: false,
    visual: "integrations",
    layout: "image-first",
    contentPreview: [
      "Seeing the connected journey locally makes integration choices more intentional.",
      "Explore first, then decide what belongs in your stack.",
    ],
  },
];

export const featuredBlogPosts = blogPosts.filter((post) => post.featured);

/** Spotlight uses an existing article that is not already in the featured carousel. */
export const spotlightPost =
  blogPosts.find((post) => post.slug === "meaningful-support-metrics") ??
  blogPosts[3];

export function getBlogCategoryLabel(id: BlogPost["category"]) {
  return blogCategories.find((category) => category.id === id)?.label ?? id;
}

export function formatBlogDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogArticle(slug: string) {
  const post = getBlogPostBySlug(slug);
  const body = getBlogArticleBody(slug);
  if (!post || !body) return null;
  return { post, body };
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const body = getBlogArticleBody(slug);
  const related = (body?.relatedSlugs ?? [])
    .map((relatedSlug) => getBlogPostBySlug(relatedSlug))
    .filter((post): post is BlogPost => post != null && post.slug !== slug);

  if (related.length >= limit) return related.slice(0, limit);

  const fallback = blogPosts.filter(
    (post) => post.slug !== slug && !related.some((item) => item.id === post.id),
  );
  return [...related, ...fallback].slice(0, limit);
}

export function getAdjacentBlogPosts(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index < 0) {
    return { previous: null, next: null };
  }
  return {
    previous: index > 0 ? blogPosts[index - 1] : null,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  };
}
