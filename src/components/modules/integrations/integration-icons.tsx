import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Boxes,
  CreditCard,
  FolderOpen,
  Headphones,
  Mail,
  MessageSquare,
  ShoppingBag,
  ShoppingCart,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const integrationIconById: Record<string, LucideIcon> = {
  shopify: ShoppingCart,
  woocommerce: ShoppingBag,
  stripe: CreditCard,
  gmail: Mail,
  slack: MessageSquare,
  "microsoft-teams": Users,
  hubspot: Workflow,
  salesforce: Boxes,
  zendesk: Headphones,
  notion: BookOpen,
  "google-drive": FolderOpen,
  zapier: Zap,
};
