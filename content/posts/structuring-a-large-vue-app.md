---
title: "Structuring a Large Vue App: A Feature-Based Folder Architecture"
date: 2026-09-10T09:58:12+05:00
lastmod: 2026-09-10T09:58:12+05:00
author: Reza Baar
# avatar: /img/author.jpg
# authorlink: https://author.site
cover: "images/structuring-a-large-vue-app.png"
# covercaption: a description of the cover image
# images:
#   - /img/cover.jpg
categories:
  - Development
tags:
  - Vue.js
  - Architecture
  - Frontend
  - JavaScript
# nolastmod: true
# math: true
draft: true
canonicalURL: "https://certificates.dev/blog/structuring-a-large-vue-app-a-feature-based-folder-architecture?friend=MOKKAPPS"
---

```markdown
> 📌 **Salgylanma:** Bu makala Reza Baar tarapyndan ýazylan bolup, [Certificates.dev](https://certificates.dev/blog/structuring-a-large-vue-app-a-feature-based-folder-architecture?friend=MOKKAPPS) saýtyndan alyndy. Original awtor: **Reza Baar** (*September 9, 2026*).

---

Most Vue projects start with the default structure: a `components/` folder, a `composables/` folder, a `stores/` folder. This works great until it doesn't. Once your app grows past 50 or so components, `components/` becomes a graveyard where UI elements go to be forgotten and duplicated, and fixing a single feature means jumping between four top-level folders. In this post, we'll look at why the type-based split breaks down, how a feature-based structure fixes it, and when each approach is the right call.

This is a community convention, or maybe my convention. It is not an official recommendation. The Vue.js website doesn't prescribe a project structure beyond the style guide. Feature-based organization is a popular pattern borrowed from the broader frontend world, and plenty of experienced Vue developers use it.

## Vue Has No Folder Conventions

Plain Vue (Vue + Vite) has no folder conventions. Vue doesn't scan directories or auto-import anything like Nuxt does. You import every component and composable explicitly, and you could name your folders anything you like. Nothing about the structure is enforced.

That's freeing but also means the responsibility is entirely yours.

## The Problem with Organizing by Type

The default structure organizes files by what they are: all components together, all composables together, all stores together. Here's what that looks like as an app grows:

```text
src/
  components/
    UserAvatar.vue
    UserProfileForm.vue
    BillingSummary.vue
    BillingHistoryTable.vue
    InvoiceRow.vue
    ProjectCard.vue
    ProjectBoard.vue
    ... 80 more files
  composables/
    useUser.ts
    useBilling.ts
    useInvoices.ts
    useProjects.ts
    ... 30 more files
  stores/
    user.ts
    billing.ts
    projects.ts
    ... more files

```

When you need to fix a bug in the billing flow, the billing code is scattered across three top-level folders. This increases cognitive load.

## Organizing by Feature Instead

A feature-based structure flips the axis. Instead of grouping by what a file is, you group by what feature it belongs to:

```text
src/
  features/
    billing/
      components/
        BillingSummary.vue
        BillingHistoryTable.vue
        InvoiceRow.vue
      composables/
        useBilling.ts
        useInvoices.ts
      stores/
        billing.ts
      types.ts
      index.ts
    user/
      components/
        UserAvatar.vue
        UserProfileForm.vue
      composables/
        useUser.ts
      stores/
        user.ts
      types.ts
      index.ts
    projects/
      components/
        ProjectCard.vue
        ProjectBoard.vue
      composables/
        useProjects.ts
      stores/
        projects.ts
      types.ts
      index.ts

```

Now the billing bug is a single folder. Everything you need is right there.

## What Lives Outside Features

Not everything belongs to a feature. Three categories sit outside the `features/` directory:

1. **Shared UI (`shared/`):** Design-system layer (buttons, inputs, modals).
2. **Core (`core/`):** Global infrastructure (API client, authentication, router setup).
3. **Pages (`pages/` or `views/`):** Route-level components that compose features together.

```text
src/
  core/          # global infrastructure
  shared/        # design-system UI and generic composables
  features/      # business features, each self-contained
  pages/         # route-level components that compose features
  main.ts

```

## The Public API of a Feature

Expose a public API through an `index.ts` barrel file:

```typescript
// features/billing/index.ts
export { default as BillingSummary } from './components/BillingSummary.vue';
export { useBilling } from './composables/useBilling';
export type { Invoice, BillingPlan } from './types';

```

Now a page imports directly from the front door:

```vue
<!-- pages/BillingPage.vue -->
<script setup lang="ts">
import { BillingSummary, useBilling } from '@/features/billing';
const { plan, invoices } = useBilling();
</script>

```

## Key Takeaways

* Feature-based structure groups everything for a feature in one folder.
* Keep `shared/` for design-system UI, `core/` for global infrastructure, and `pages/` for route-level composition.
* Features depend on `shared` and `core` freely, but on other features only through their public API (`index.ts`).

---

*Original makalany [Certificates.dev](https://certificates.dev/blog/structuring-a-large-vue-app-a-feature-based-folder-architecture?friend=MOKKAPPS) saýtynda okaň.*

```

---

### 5. Hugo Dream Temasynda Salgylanma (Canonical URL) Görkezmek

Eger saýtyňyzyň SEO görkezijileri üçin original salgylanma baglamasyny temanyň `<head>` bölümine goşmak isleseňiz, `layouts/partials/head.html` (ýa-da temanyň tipli başlyk faýlyna) aşakdaky kody goşup bilersiňiz:

```html
{{ if .Params.canonicalURL }}
  <link rel="canonical" href="{{ .Params.canonicalURL }}" />
{{ else }}
  <link rel="canonical" href="{{ .Permalink }}" />
{{ end }}

```
