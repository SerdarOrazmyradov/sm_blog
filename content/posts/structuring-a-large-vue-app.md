---
title: "Structuring a Large Vue App: A Feature-Based Folder Architecture"
description: "Why the default components/composables/stores split breaks down at scale, and how a feature-first structure fixes it."
date: 2026-09-10T09:58:12+05:00
draft: false
cover: "/images/structuring-a-large-vue-app.png"
lastmod: 2026-09-10T09:58:12+05:00
author: Reza Baar
categories:
  - Development
keyboards: ["vue","architecture","feature","components","composables","stores","split"]
tags:
  - Vue.js
  - Architecture
  - Frontend
  - JavaScript
canonicalURL: "https://certificates.dev/blog/structuring-a-large-vue-app-a-feature-based-folder-architecture?friend=MOKKAPPS"
---

When we try add new feature or fix bug on big project with default structure is big problem or imposible 
but in this article we will learn how to fix that

default structure good for small project (when component under 10) 


```
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

changes for billing


now the billing bug is a single folder.Everything you need (the components,the data logic,the store,the types) is right there you aren't jumping between global folders,and it's clear that this folder is the billing feature.


...... 

## ORIGINAL


Most Vue projects start with the default structure: a `components/` folder, a `composables/` folder, a `stores/` folder. This works great until it doesn't. Once your app grows past 50 or so components, `components/` becomes a graveyard where UI elements go to be forgotten and duplicated, and fixing a single feature means jumping between four top-level folders. In this post, we'll look at why the type-based split breaks down, how a feature-based structure fixes it, and when each approach is the right call.

This is a community convention, or maybe my convention. It is not an official recommendation. The Vue.js website doesn't prescribe a project structure beyond the style guide (naming rules, multi-word component names, and so on). Feature-based organization is a popular pattern borrowed from the broader frontend world (it's common in React and Angular circles and rooted in domain-driven design), and plenty of experienced Vue developers use it. But it's one option among several, not the blessed answer. Treat everything here as a reasonable default to weigh, not a rule.

## Vue Has No Folder Conventions

Plain Vue (Vue + Vite) has no folder conventions. Vue doesn't scan directories or auto-import anything like Nuxt does. You import every component and composable explicitly, and you could name your folders anything you like. Nothing about the structure is enforced.

That's freeing but also means the responsibility is entirely yours. The `components/`, `composables/`, `stores/` layout is just a convention people adopted, not something the framework strictly requires. Since nothing is enforced, you're free to organize however serves your project best, which is exactly why it's worth thinking about deliberately rather than defaulting.

## Vue Has No Folder Conventions

Plain Vue (Vue + Vite) has no folder conventions. Vue doesn't scan directories or auto-import anything like Nuxt does. You import every component and composable explicitly, and you could name your folders anything you like. Nothing about the structure is enforced.

That's freeing but also means the responsibility is entirely yours. The `components/`, `composables/`, `stores/` layout is just a convention people adopted, not something the framework strictly requires. Since nothing is enforced, you're free to organize however serves your project best, which is exactly why it's worth thinking about deliberately rather than defaulting.

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

The issue isn't obvious at ten files. It shows up at a hundred. When you need to fix a bug in the billing flow, the billing code is scattered across three top-level folders. You open `components/` and scroll past project components and user components to find the billing ones. You jump to `composables/` and do it again. You jump to `stores/` and do it a third time.

This is cognitive load. The files that change together don't live together, so every task involves hunting across the codebase. It also makes ownership fuzzy: when everything is in shared folders, no one clearly owns the billing feature.

## Organizing by Feature Instead

A feature-based structure flips the axis. Instead of grouping by what a file is, you group by what feature it belongs to. Everything related to billing lives in one place:

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

Now the billing bug is a single folder. Everything you need (the components, the data logic, the store, the types) is right there. You aren't jumping between global folders, and it's clear that this folder is the billing feature.

## What Lives Outside Features

Not everything belongs to a feature. Three categories sit outside the `features/` directory.

**Shared UI** is your design-system layer: buttons, inputs, modals, and other atomic components that have no business logic. Any feature can use them.

```text
src/
  shared/
    ui/
      BaseButton.vue
      BaseInput.vue
      BaseModal.vue
    composables/
      useClickOutside.ts
      useMediaQuery.ts

```

**Core** is global infrastructure: the API client, authentication, telemetry, router setup. This is the plumbing every feature depends on but that doesn't belong to any single feature.

```text
src/
  core/
    api/
      client.ts
    auth/
      useAuth.ts
    router/
      index.ts
```

**Pages** (or **`views/`**) are the route-level components that compose features together. A dashboard page might pull in components from the billing, user, and projects features to build a single screen.

```text
src/
  pages/
    DashboardPage.vue
    BillingPage.vue
    SettingsPage.vue
```

Putting it together, the top level looks like this:

```text
src/
  core/          # global infrastructure
  shared/        # design-system UI and generic composables
  features/      # business features, each self-contained
  pages/         # route-level components that compose features
  main.ts
```

## The Public API of a Feature

This pattern makes feature folders actually maintainable: each feature exposes a public API through an **`index.ts`** barrel file. Other parts of the app import from the feature, not from files deep inside it.

```ts
// features/billing/index.ts
export { default as BillingSummary } from './components/BillingSummary.vue';
export { useBilling } from './composables/useBilling';
export type { Invoice, BillingPlan } from './types';
```

Now a page imports from the feature's front door:

```ts
// pages/BillingPage.vue
<script setup lang="ts">
import { BillingSummary, useBilling } from '@/features/billing';

const { plan, invoices } = useBilling();
</script>
```

This does two things. It keeps the feature's internal structure private, so you can rearrange files inside **`billing/`** without breaking every import across the app. And it makes dependencies between features explicit: if the projects feature imports from billing, that import goes through billing's public API, and you can see the coupling clearly.

However, because barrel files aren't free. In your production build, Rollup (or Rolldown in Vite 8) can usually tree-shake through a barrel fine, so unused exports still get dropped, as long as the re-exported modules are side-effect-free. The cost shows up at dev time. Vite serves modules unbundled during development, so importing one thing from a big barrel makes the dev server pull in and transform everything that barrel re-exports. For a large feature with a huge **`index.ts`**, that can slow cold starts and HMR. Barrels also make it easier to create circular dependencies by accident. So keep barrels reasonably small, and if dev startup gets sluggish, importing directly from the specific file instead of through the barrel is the usual fix. The public-API benefit is real, but it's a tradeoff, not a pure win.

## The Rule That Keeps It Clean

A feature-based structure only stays clean if you follow one rule: **features don't reach into each other's internals.** A feature can depend on **`shared`/** and core/ freely. It can depend on another feature only through that feature's public **`index.ts`**. It never imports a file from deep inside another feature.

If you find two features constantly reaching into each other, that's a signal. Either the shared piece belongs in **`shared/`**, or the two features are really one feature that should be merged. This rule turns your folder structure into a lightweight architecture check.

## Avoiding Over-Nesting

One trap with feature folders is going too deep. A five-level path like **`features/billing/components/invoices/rows/InvoiceRow.vue`** makes navigation harder, not easier. Deep nesting fights your editor's quick-open, since you have to remember the whole path.

Keep it flat within reason. If a feature is small, you don't need the full **`components/composables/stores`** sub-structure. A handful of files at the feature root is fine:

```text
features/
  notifications/
    NotificationBell.vue
    NotificationList.vue
    useNotifications.ts
    types.ts
    index.ts
```

Add the sub-folders only when a feature grows enough to need them. The structure should serve the feature's size, not impose ceremony on small ones.

## Does Structure Affect Performance?

My short answer is “no”. Your folder structure has essentially no effect on your production bundle, tree-shaking, or bundle size.

Bundlers build their output from the **module graph**, meaning what imports what, not where files sit on disk. Tree-shaking works on ES module imports and exports: it drops any export nothing references, as long as the module is side-effect-free. Code-splitting happens at dynamic **`import()`** boundaries and lazy-loaded routes. None of that reads your folder names. A feature-based app and a type-based app with the same code compile to identical bundles. So "which structure is faster" is the wrong question. Structure is a developer-experience and maintainability decision, not an optimization one.

The things that actually affect your bundle are separate from folder layout:

## Key Takeaways

* Feature-based structure groups everything for a feature (components, composables, stores, types) in one folder
* Keep **`shared/`** for design-system UI, **`core/`** for global infrastructure, and **`pages/`** for route-level composition
* A public API through an **`index.ts`** barrel keeps internals private, but watch barrel size since it can slow the dev server
* The key rule: features depend on **`shared`** and **`core`** freely, but on other features only through their public API

## Conclusion

Feature-based organization is one popular way to keep a large Vue app navigable. Its real value is making the files that change together live together, so fixing a bug or building a feature happens in one folder instead of four. It won't make your app faster, and it's overkill for small projects. Start with the default structure, and when scanning **`components/`** starts to hurt, consider reorganizing by feature. Weigh it as an option, and pick what keeps your team productive.