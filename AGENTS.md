# HelpNova — Project Guide (AGENT.md)

> **Purpose:** A concise, human-readable and Cursor-readable guide to the HelpNova project.
> **Current direction:** Personal project first. Marketplace submission, account approval, and resale preparation are **not part of the current work**.
> **Source of truth:** This guide reflects the latest user-approved architecture and the retained product/design decisions. If an older planning file conflicts, follow this guide and the user's latest explicit instruction.

## 1. Project concept

**HelpNova** is a visually ambitious, premium **customer-support and automation SaaS concept website** built with **Next.js App Router, React, and TypeScript**. It combines:

- Three genuinely different marketing homepages: **AI Customer Support**, **Automation**, and **Shared Inbox**.
- Feature, solution, pricing, company, editorial, and utility pages.
- An interactive **local Guided Demo** connecting **Inbox → Workflow Automation → Insights**.
- Beautiful, original product-style UI, light/dark themes, responsive layouts, and refined motion.

**Goal:** Deliver a polished, modern, original, fast, accessible, maintainable **24-page-type** personal project with clear component reuse and memorable design. Build each module carefully rather than generating the whole website at once.

**Important product boundary:** The initial demo, chatbot, contact, login, signup, integrations, and pricing are **UI/local simulations**, not a live customer-support platform. Do not claim that a message was delivered, an account was created, an integration was connected, or AI answered a question. No backend, Supabase, real auth, database, payment system, or AI API is required unless the user explicitly changes the scope later.

## 2. Technology and non-negotiable code rules

| Area | Choice |
|---|---|
| Framework | **Next.js App Router** + React |
| Language | **TypeScript** with strict typing |
| UI source | **`.tsx`** for React pages, layouts, providers, and components |
| Non-UI source | **`.ts`** for data, types, config, logic, and utilities |
| Styling | **Tailwind CSS** + **one** `src/app/globals.css` for global styles/design tokens |
| Icons | **Lucide React** |
| Animations | **GSAP** for selective premium motion; **Lenis** only where useful |
| Fonts | **Plus Jakarta Sans** (headings), **Inter** (body and UI), loaded through `next/font` |
| State | React hooks and **Context + useReducer** for the connected demo |
| Content | Local, typed TypeScript data; no CMS required |
| Testing | TypeScript check, ESLint, production build, responsive/interaction tests |
| Future 3D | Evaluate **Three.js / React Three Fiber** at the **very end**, not now |

**Never build a page as standalone HTML/CSS/JavaScript.** No `index.html`, `script.js`, separate HTML prototype, Vite application, or parallel website outside `src/app`. Next.js generates HTML from `.tsx`. Standard framework config files such as `eslint.config.mjs` are allowed. Do not create a second `globals.css` or unnecessary per-page CSS/JS files.

Use **Server Components by default** and add `"use client"` only where interaction, browser APIs, or animations require it. Prefer small client components over making an entire page/client layout interactive. Use `next/link` for internal navigation and `next/image` where appropriate. No unnecessary dependencies or placeholder folders.

## 3. Approved project folder architecture

This is the intended structure; **create folders/files only when their module needs them**.

```text
helpnova/
├── AGENT.md
├── README.md
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── .gitignore
├── public/
│   ├── brand/
│   ├── images/
│   │   ├── home/
│   │   ├── features/
│   │   ├── blog/
│   │   └── case-studies/
│   └── icons/
└── src/
    ├── app/
    │   ├── (auth)/
    │   │   ├── layout.tsx
    │   │   ├── login/page.tsx
    │   │   └── signup/page.tsx
    │   ├── (marketing)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── home-automation/page.tsx
    │   │   ├── home-inbox/page.tsx
    │   │   ├── features/
    │   │   │   ├── page.tsx
    │   │   │   ├── chatbot/page.tsx
    │   │   │   ├── automation/page.tsx
    │   │   │   └── inbox/page.tsx
    │   │   ├── integrations/page.tsx
    │   │   ├── solutions/
    │   │   │   ├── page.tsx
    │   │   │   └── ecommerce/page.tsx
    │   │   ├── pricing/page.tsx
    │   │   ├── about/page.tsx
    │   │   ├── contact/page.tsx
    │   │   ├── blog/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── case-studies/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── faq/page.tsx
    │   │   ├── privacy/page.tsx
    │   │   └── terms/page.tsx
    │   ├── (demo)/
    │   │   └── demo/
    │   │       ├── layout.tsx
    │   │       └── page.tsx
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── error.tsx
    │   └── not-found.tsx
    ├── components/
    │   ├── ui/
    │   ├── common/
    │   └── modules/
    │       ├── home/
    │       ├── features/
    │       ├── solutions/
    │       ├── pricing/
    │       ├── integrations/
    │       ├── demo/
    │       │   ├── inbox/
    │       │   ├── automation/
    │       │   └── insights/
    │       ├── blog/
    │       ├── case-studies/
    │       ├── auth/
    │       └── other-pages/
    ├── config/
    ├── context/
    ├── hooks/
    ├── lib/
    ├── types/
    ├── data/
    │   ├── marketing/
    │   ├── demo/
    │   ├── editorial/
    │   └── chatbot/
    └── utils/
```

**Folder responsibilities**

- `src/app/`: Next.js routes, layouts, metadata, and error handling. Keep route files thin; the homepage is **`src/app/(marketing)/page.tsx`** and serves `/`. Route-group names in parentheses are **not** part of URLs.
- `components/ui/`: reusable buttons, inputs, tabs, cards, accordions, dialogs, etc.
- `components/common/`: header, footer, navigation, theme switcher, logo, shared sections, shared product UI, and reusable motion wrappers.
- `components/modules/`: page-specific sections, page assembly, and local interactive components. No separate `features/` directory.
- `config/`: site identity, route registry, navigation, theme settings, and constants.
- `context/`: site theme and **demo-scoped** context/reducer; do not mount demo state globally.
- `hooks/`: reusable React hooks; keep module-only hooks beside their module when practical.
- `lib/`: actual third-party adapters/integrations (GSAP/Lenis, etc.), **not** speculative Supabase/Auth setup.
- `types/`: cross-module TypeScript types; keep local types with their modules.
- `data/`: editable marketing content, six blog posts, three fictional case studies, demo seeds, plans, FAQ, and widget answers.
- `utils/`: **pure** helpers such as `cn`, formatters, and validators; no duplicate helpers in `lib/`.
- `public/`: original/appropriately licensed static assets. Avoid flattening functional product previews into images.

**Demo routing choice:** `/demo` has its own `(demo)` route group/layout, so it can use a dedicated workspace shell without the marketing footer. Login and signup have their own `(auth)` layout.

## 4. Visual design system

**Direction:** Original, fancy **Hybrid Premium SaaS** aesthetic, inspired by the general polish of Attio-style interfaces but **not copied**. Design should feel premium through hierarchy, whitespace, product UI, subtle gradients, layered surfaces, careful contrast, and purposeful microinteractions.

- **Brand:** HelpNova original wordmark/symbol; **Electric Violet** primary accent.
- **Typography:** Plus Jakarta Sans for large headings; Inter for paragraphs, forms, and application UI.
- **Themes:** Marketing site **Light / Dark / System**, light on first visit; preference persists. Demo initially Light with optional Dark. Deliberately dark workspace previews can appear inside Light marketing pages.
- **Color starting points (editable):** Light background `#FAFAFC`, text `#171321`, surface `#FFFFFF`, accent `#6D28D9`; Dark background `#0F0D15`, text `#F6F3FC`, surface `#181420`, accent `#A78BFA`. Use **semantic CSS variables** in `globals.css`, not scattered hard-coded values.
- **Typography starting scale:** home H1 ~36px mobile / 48–64px desktop; page title ~32px / 40–48px; section title ~28px / 32–40px; body 16px with comfortable line-height. Responsive sizes, not rigid screenshots.
- **Shape/spacing:** restrained borders/shadows, ~8px control radius, ~16px card radius, ~20px workspace radius; generous section spacing and consistent gutters. Exact tokens are design starting points, not fixed without visual review.
- **Responsive:** mobile-first; usable at **320px** without horizontal overflow. Desktop multi-column product panels become mobile-friendly stacked or drill-down views. Support keyboard, visible focus, meaningful labels, and reduced motion.
- **Motion:** GSAP for selected section reveals/product storytelling and real workflow-result visualization. CSS for simple hover/focus. Lenis only for appropriate marketing scroll, never forced into nested demo panels. Respect `prefers-reduced-motion`; clean up animation instances on unmount.
- **3D:** a potential final-stage enhancement **after all 24 modules, responsiveness, and QA**. Do not install a 3D library, create a 3D folder, or let effects compromise performance now.

**Shared shell:** sticky header with logo; Product, Solutions, Resources, Pricing; theme, Login, Explore Demo. Product links: Features, Chatbot, Automation, Shared Inbox, Integrations. Resources: Blog, Case Studies, FAQ. Mobile accessible drawer. Footer links to all three homepages, company, product, resources, Login, Sign Up, and legal pages. Each homepage's logo links to its own homepage.

## 5. All 24 page modules: content and interactions

**Module 0 is the project foundation/architecture, not a public page.** The 24 modules below are page **types**; six blog details and three case-study details create additional URLs.

### Three distinct homepages (exact section order)

**01 — AI Customer Support Home `/` (10 sections)**

1. Centered editorial hero, **Explore Demo** + **Explore Features** CTAs, dark three-tab **Inbox / Automation / Insights** sample workspace.
2. Who It's For: Ecommerce / SaaS / Services cards.
3. Unified Inbox showcase with sample thread.
4. Workflow Automation showcase with read-only flow.
5. Deliberately dark Insights & Analytics sample section.
6. Feature Bento with mini product UI.
7. Integrations preview (six of twelve).
8. Sample Customer Support Scenarios (three topics).
9. Pricing preview **plus** short FAQ.
10. Final CTA.

**02 — Automation Home `/home-automation` (9 sections)**

1. Split hero: copy/CTAs left, lightweight workflow right.
2. Routing / tagging / escalation use cases (illustrative).
3. Trigger → Condition → Action walkthrough.
4. Branching workflow, selectable read-only node details.
5. Team handoff to Inbox.
6. Integrations and workflow relationship.
7. Illustrative automation outcomes (no fabricated measured claims).
8. Pricing preview **plus** short FAQ.
9. Final CTA.

**03 — Shared Inbox Home `/home-inbox` (9 sections)**

1. Product-led hero with large selectable inbox preview.
2. Illustrative Email / Chat / Social channels.
3. Selectable conversation/thread showcase.
4. Assignment, internal notes, handoff preview.
5. Status, tags, priority, filters organization preview (read-only).
6. Automation-to-team handoff.
7. Sample team workload and resolution insights.
8. Pricing preview **plus** short FAQ.
9. Final CTA.

**Marketing preview rule:** previews may switch tabs, select a conversation, or inspect a node. They **do not** send replies, execute rules, or mutate the full demo. Do not auto-cycle hero tabs. Navbar/footer are not counted as homepage sections.

### Remaining pages

| # | Page / route | Required sections and behavior |
|---|---|---|
| 04 | **Features** `/features` | Hero; Chatbot/Automation/Inbox narratives; connected Insights example; feature bento; Demo CTA. |
| 05 | **Chatbot Feature** `/features/chatbot` | Hero + Q&A visual; preset-answer concept; sample/local-session explanation; open the floating sample widget; FAQ; CTA. |
| 06 | **Automation Feature** `/features/automation` | Hero; Trigger/Condition/Action; Matched/Otherwise diagram with selectable node details; routing/team examples; Inbox/Insights connection; Demo CTA. |
| 07 | **Inbox Feature** `/features/inbox` | Hero; sample conversation/thread; assignment and internal-note illustration; Open/Resolved and read-only tags/priority; workflow/Insights connection; CTA. |
| 08 | **Integrations** `/integrations` | Hero with illustrative notice; local search and category filters; **12** integration cards; no-results/clear filters; CTA. No live Connect/OAuth. |
| 09 | **Solutions** `/solutions` | Hero; Ecommerce/SaaS/Services cards; inquiry→assignment→insight journey; sample scenarios; CTA. |
| 10 | **Ecommerce Solution** `/solutions/ecommerce` | Hero; fictional Order Tracking inquiry; Order rule and fallback; Inbox handoff/internal note; relevant illustrative integrations; Demo CTA. |
| 11 | **Pricing** `/pricing` | Hero; Monthly/Yearly toggle; **3** sample plans; comparison; FAQ; Contact CTA. No checkout. |
| 12 | **About** `/about` | Editable story; mission; values (Clarity/Ownership/Consideration); original product illustration; sample team/roles; CTA. |
| 13 | **Contact** `/contact` | Hero; name/email/subject/message form; validation; integration explanation; explicit **nothing sent** feedback. |
| 14 | **Guided Interactive Demo** `/demo` | Dedicated shell; **Inbox / Automation / Insights** views sharing one local state; sample scenarios; theme; Reset Demo; details in §6. |
| 15 | **Blog Index** `/blog` | Hero; search/category filter; **6** post cards; results/no-results/clear filters; CTA. |
| 16 | **Blog Detail** `/blog/[slug]` | Breadcrumb; title/metadata/cover; structured article; table of contents/reading progress where useful; related posts. Six local slugs. |
| 17 | **Case Studies** `/case-studies` | Hero; **3 fictional** story cards; Demo CTA; no fake testimonials or real customer claims. |
| 18 | **Case Study Detail** `/case-studies/[slug]` | Breadcrumb; fictional badge; Context, Inquiry, Example Workflow, Team Handoff, What It Illustrates; related stories; CTA. Three local slugs. |
| 19 | **FAQ** `/faq` | Hero; search; grouped accessible accordions; approximately **10** Q&As; Contact/Demo links. |
| 20 | **Privacy** `/privacy` | Clearly marked editable sample privacy page; local demo inputs, theme preference storage, external links. |
| 21 | **Terms** `/terms` | Clearly marked editable sample terms; fictional content, no operational service, usage boundaries. |
| 22 | **Not Found** `src/app/not-found.tsx` | Original 404 design; Back Home + Explore Demo; **no** separate `/404` route. |
| 23 | **Login** `/login` | Split form/product visual; email/password/show password; validation; demo-only notice; Sign Up link; no real sign-in. |
| 24 | **Sign Up** `/signup` | Split form/product visual; name/email/password/show password; validation; demo-only notice; Login link; no account creation. |

## 6. Guided Demo: exact functional concept

- **Scenarios:** Order Tracking, Billing Issue, Technical Support. All fictional, with stable conversation IDs.
- **Inbox:** search; All/Open/Resolved filters; select a conversation; thread and customer details; assign Orders/Billing/Technical/General Triage; add local **Reply** or visually distinct **Internal Note**; Resolve/Reopen; activity log. Tags/priority are display-only.
- **Automation:** independently select an **inquiry** and an **Order/Billing/Technical rule**. Flow: **New Inquiry → Topic Condition → Matched / Otherwise**. Matched → corresponding team; Otherwise → **General Triage**. Read-only node Inspector on desktop; accessible bottom sheet on mobile. **Run Simulation** and **Replay**, path highlight, outcome and trace. No drag-and-drop or Step control.
- **Insights:** live Total, Open, Resolved, Assigned, Resolution Rate; status chart; **open** workload by team including Unassigned; recent activity. All derived from the **same canonical demo state**. Separate fixed **Historical Sample** volume chart with working **7/30-day** selector. No Average Response Time KPI.
- **State:** use one `useReducer` + Context scoped to `/demo`; immutable typed seed data; pure action logic/selectors. Assignment, replies, notes, resolution and automation update the same conversations/activity. Replay must not duplicate unchanged assignment events. GSAP visualizes the computed outcome, not the business rule.
- **Reset:** restore original conversations/activity, clear drafts, selections and simulation state; preserve theme choice. Switching Inbox/Automation/Insights keeps state; refreshing starts from seeds. Nothing is transmitted or stored as a real ticket.
- **Responsive:** desktop list/thread/context and workflow Inspector; mobile list→thread with Back, vertical workflow, readable charts, keyboard/focus-safe sheets.

## 7. Content inventory and design consistency

Use typed, editable local content. Initial planned inventory:

- **6 blog articles** on handoffs, shared inbox, topic routing, support metrics, internal notes, and exploring before integration.
- **3 fictional case studies** for order, billing, and technical-support scenarios.
- **12 illustrative integrations:** Shopify, WooCommerce, Stripe, Gmail, Slack, Microsoft Teams, HubSpot, Salesforce, Zendesk, Notion, Google Drive, Zapier. Names describe examples, **not** connected services; use only appropriately permitted logos or original generic icons.
- **3 sample pricing plans** (draft labels: Essential, Team, Scale), with synchronized Monthly/Yearly amounts and comparison content. Final prices remain editable.
- **~10 FAQ answers** shared consistently between the FAQ page and previews.
- **6 preset chatbot questions/answers**, no AI model call.
- **Local forms** with visible labels, inline errors, focus handling, and honest confirmation. No fake spinners, no network submission.

All public website copy should be **English**. Never expose development/process text in the UI such as “Module 1 done”, “Phase completed”, task IDs, or developer notes. Do not invent customer testimonials, measured savings, account status, or real business outcomes.

## 8. Implementation workflow and acceptance

1. **Foundation first:** create/verify the Next.js TypeScript project, exact route groups, Tailwind setup, `globals.css`, fonts, theme tokens, navigation, and reusable UI. Confirm `/` renders `src/app/(marketing)/page.tsx` directly.
2. **One module at a time:** review the relevant page requirements → provide a concrete design preview for user review → implement only the approved module → run checks → review result → move on only with user approval.
3. **Cursor instructions must be explicit:** specify the exact `.tsx` route and `components/modules/` destination, section order, interactive behavior, mobile/dark states, and what must **not** be created. Inspect existing code before editing; reuse components rather than duplicating them.
4. **After each module:** run `npm run typecheck`, `npm run lint`, `npm run build` (where scripts exist), plus relevant behavior checks. Verify desktop/mobile, light/dark, keyboard, navigation, empty/error states, and no dead controls.
5. **No silent scope creep:** ask before adding new dependencies, routes, integrations, backend functionality, or 3D. Do not replace TSX with HTML/CSS/JS prototypes. Do not silently implement later modules.
6. **Final polish:** complete all 24 page types and functional QA first; only then decide whether restrained 3D enhances the site.

**Definition of done:** The page matches its approved sections and design, works at mobile and desktop widths, has correct navigation and theme behavior, passes available checks, and contains no misleading demo claims or developer-only text. If a check was not run, say **not verified**; never report an unrun test as passed.
