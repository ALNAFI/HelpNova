# HelpNova — Project Guide (AGENTS.md)

> **Purpose:** Cursor-readable guide to the **current** HelpNova codebase.
> **Source of truth:** The existing implementation, this file, and the user’s latest explicit instructions. Older planning docs and original design briefs are not mandatory.
> **Cursor rules:** Also follow `.cursor/rules/` (`no-demo-framing`, `no-dev-jargon`, `reuse-before-create`).

## 1. What HelpNova is

**HelpNova** is a premium **customer-support and automation SaaS marketing website** built with **Next.js App Router, React, and TypeScript**.

It includes:

- Three distinct homepages: `/` (AI Customer Support), `/home-automation`, `/home-inbox`
- Product, solutions, pricing, company, editorial, legal, and utility pages
- An interactive **Guided Demo** at `/demo` (Inbox → Automation → Insights) with shared client state
- Site-wide theme support, marketing motion (GSAP / Lenis / Motion), and selective Three.js canvases on the alternate homes

**Visitor-facing copy:** Present HelpNova as a professional product site. Do **not** frame the site as a “demo,” “sample,” or “concept website” in UI text. Prefer confident product language. Routes, code, and internal names may still use technical terms such as `/demo`.

**Honesty boundary (implementation):** Forms, auth screens, integrations UI, chatbot answers, and `/demo` interactions are **client-side / local**. Do not claim a message was delivered, an account was created, an integration was connected, a payment was taken, or that a live AI model answered. Do not invent testimonials, measured savings, or unverified security certifications. No backend, auth provider, database, payments, or AI API is required unless the user explicitly expands scope.

## 2. Stack (verified)

| Area | Current choice |
|---|---|
| Framework | **Next.js 16** App Router + **React 19** |
| Language | **TypeScript** (`npm run typecheck`) |
| Styling | **Tailwind CSS 4** + single `src/app/globals.css` (semantic CSS variables) |
| UI tooling | **shadcn** (`components.json`, New York style) where used |
| Icons | **Lucide React** (primary); **Hugeicons** also installed |
| Motion | **GSAP** (+ `@gsap/react`), **Lenis** (smooth scroll), **Motion** (`motion/react`) for selected UI |
| 3D | **Three.js** used on `/home-automation` and `/home-inbox` canvases (not React Three Fiber) |
| Fonts | **Plus Jakarta Sans** (headings), **Inter** (body/UI) via `next/font` in `src/app/layout.tsx` |
| State | React hooks; **ThemeProvider**; **ChatbotProvider** (marketing); **DemoProvider** + `useReducer` (scoped to `/demo`) |
| Content | Local typed data under `src/data/` — no CMS |
| Scripts | `dev`, `build`, `start`, `lint`, `typecheck` |

**Code conventions**

- Prefer **Server Components**; add `"use client"` only for interaction, browser APIs, or animation.
- UI in `.tsx`; data/types/config/utils in `.ts`.
- Internal links via `next/link`; images via `next/image` when appropriate.
- One global stylesheet: `src/app/globals.css`. Module-scoped CSS beside complex interactive modules is used where needed (e.g. smart routing, feature illustrations).
- Do not build parallel HTML/CSS/JS prototypes outside `src/app`.
- Reuse existing components before creating new ones; remove obsolete unused files when replacing something (see `.cursor/rules/reuse-before-create.mdc`).

## 3. Design system (as implemented)

Tokens live in `src/app/globals.css` (`:root` / `.dark`):

- **Light:** background `#FAFAFC`, foreground `#171321`, surface `#FFFFFF`, accent `#6D28D9`
- **Dark:** background `#0F0D15`, foreground `#F6F3FC`, surface `#181420`, accent `#A78BFA`
- Additional roles: muted, border, success, warning, danger, workspace preview colors, radii (`--radius-control` / `--radius-card` / `--radius-workspace`), soft shadow, header height, FAB dock variables
- Prefer semantic tokens / theme utilities over hard-coded one-off colors in new work

**Theme:** `ThemeProvider` supports `light` | `dark` | `system`, persisted under `localStorage` key `theme`, with a blocking `ThemeScript` in the root layout.

**Typography:** Plus Jakarta for large headings; Inter for body and app UI. Use existing page heading scales rather than inventing a new type system.

**Responsive / a11y:** Mobile-first layouts; respect `prefers-reduced-motion` in GSAP and decorative motion; keep keyboard focus and meaningful labels on interactive controls.

## 4. App structure (current)

```text
helpnova/
├── AGENTS.md
├── package.json
├── next.config.ts
├── components.json          # shadcn config
├── public/                  # brand, images, icons as needed
├── .cursor/rules/           # always-on agent rules
└── src/
    ├── app/
    │   ├── layout.tsx       # fonts, theme shell, metadata
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── (marketing)/     # SiteHeader + SiteFooter + SmoothScroll + ChatbotProvider
    │   ├── (automation-universe)/  # /home-automation — Nav2 + Footer2
    │   ├── (inbox-home)/           # /home-inbox — Nav3 + Footer3
    │   ├── (demo)/demo/            # DemoProvider shell (no marketing footer)
    │   └── (auth)/                 # login / signup layout
    ├── components/
    │   ├── ui/              # button, container, accordion, motion helpers, …
    │   ├── common/          # header, footers, navs, theme, chatbot FAB, reveal, …
    │   └── modules/         # page-specific sections by domain
    ├── config/              # site, routes, navigation, ribbon config
    ├── context/             # theme, lenis, chatbot, demo (+ reducer)
    ├── data/
    │   ├── marketing/
    │   ├── editorial/       # blog + case studies
    │   ├── demo/            # demo seed + historical chart data
    │   └── chatbot/
    ├── hooks/
    ├── lib/                 # gsap helper, theme script, ribbon helpers, chatbot helpers
    ├── types/
    └── utils/               # cn, validators, demo selectors/formatters, …
```

Route-group names in parentheses are **not** URL segments.

## 5. Routes (implemented)

| Route | Notes |
|---|---|
| `/` | AI Customer Support home + scroll ribbon |
| `/home-automation` | Automation home (dedicated shell + Three canvas) |
| `/home-inbox` | Shared Inbox home (dedicated shell + Three scene) |
| `/features` | Features overview |
| `/features/chatbot` | Chatbot feature |
| `/features/automation` | Automation feature (includes inquiry path / explorer UI) |
| `/features/inbox` | Inbox feature |
| `/integrations` | Integrations directory (filterable; 12 entries in data) |
| `/solutions` | Solutions overview |
| `/solutions/ecommerce` | Ecommerce solution + Smart Routing section |
| `/pricing` | Plans (Essential / Team / Scale), monthly/yearly toggle |
| `/about` | Company |
| `/contact` | Contact form UI (local; does not send) |
| `/blog`, `/blog/[slug]` | 6 posts |
| `/case-studies`, `/case-studies/[slug]` | 3 stories |
| `/faq` | FAQ |
| `/privacy`, `/terms`, `/security` | Legal / trust pages |
| `/demo` | Guided interactive Command Center |
| `/login`, `/signup` | Auth UI (local validation only) |
| `/404` | Marketing 404 page; also `src/app/not-found.tsx` |

Blog slugs: `better-support-handoffs`, `organizing-shared-inbox`, `topic-based-routing`, `meaningful-support-metrics`, `internal-notes-collaboration`, `explore-before-integrations`.

Case-study slugs: `order-tracking`, `billing-support`, `technical-support`.

## 6. Marketing homes (actual sections)

**`/`** — Hero → Audience → Inbox → Automation → Insights → Feature bento → Integrations preview → Scenarios → Pricing + FAQ → Final CTA. Decorative `HomeScrollRibbon` wraps the page.

**`/home-automation`** and **`/home-inbox`** — Separate route groups with their own nav/footer and richer visual systems (including Three.js). Treat those shells as intentional product variants, not duplicates of the marketing header.

## 7. Guided Demo (`/demo`)

Implemented interactive workspace:

- Shared state via `DemoProvider` + `demo-reducer` (scoped to the demo layout)
- Views: **Inbox**, **Automation**, **Insights**
- Seed data in `src/data/demo/`; selectors/helpers in `src/utils/demo-*`
- Reset restores seed conversations/activity and clears draft/simulation UI state; theme preference is independent (site theme)
- Activity in the demo is local to the session — do not imply real tickets are transmitted

Preserve `/demo` and related code. Do not strip the feature because the path contains “demo.”

## 8. Shared chrome & interactions

- **Marketing:** `SiteHeader`, `SiteFooter`, Lenis `SmoothScroll`, floating chatbot + back-to-top (`FloatingActions` / chatbot components)
- **Chatbot:** Preset answers via `ChatbotProvider` + `src/data/chatbot` — no live model call
- **Alternate homes:** `Nav2`/`Footer2`, `Nav3`/`Footer3`
- **Auth:** dedicated `(auth)` layout
- Navigation source of truth: `src/config/routes.ts` + `src/config/navigation.ts`

## 9. Content & copy guidelines

- Public English copy only; keep it conversion-focused and product-like
- Strip visitor-facing jargon: sample, placeholder, mock, concept website, draft policy, codebase, etc. (see `.cursor/rules/no-dev-jargon.mdc` and `no-demo-framing.mdc`)
- Editable content lives in `src/data/**` — prefer updating data files over hard-coding long copy in components
- Legal pages use shared `LegalHero` / `LegalSection` patterns; privacy copy is product-facing and must stay accurate about local forms, theme storage, and interactive experiences

## 10. Development workflow

1. Inspect the codebase before adding anything; reuse or extend existing modules.
2. Match neighboring patterns (layout, tokens, motion, data shape).
3. After meaningful changes, run `npm run typecheck` and `npm run lint` (and `npm run build` when appropriate). Say **not verified** if a check was not run.
4. Do not add dependencies, backends, or major new routes without explicit user approval.
5. Do not leave unused or abandoned files after replacements.

**Definition of done:** Matches the requested scope, works in light/dark and at mobile/desktop widths, keeps navigation/theme coherent, passes available checks, and contains no misleading claims or developer-only UI text.
