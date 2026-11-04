# Living Rhea

The production site for https://livingrhea.com, a static Astro rebuild of the former WordPress site. It ships zero JavaScript on public pages (JSON-LD only), with inlined CSS, local fonts and images, and click-to-load videos. See `AGENTS.md` for the rules.

The repo is still named `yatanco/livingrhea-beta`. The `livingrhea-beta` Cloudflare Pages project builds `main` and serves `livingrhea.com` and `www.livingrhea.com`. It went live on 3 November 2026. **Pushing `main` deploys to production**, so commit and push only when the owner asks.

## Run and verify

Use Node 24 (`.nvmrc`), then:

```sh
npm ci
npm run dev
```

`npm run check` builds the site, checks local links, assets and anchors in `dist/`, and runs the tests. Astro is pinned to `7.4.2` with a committed lockfile.

## Source

- `src/pages/`: routes, including the blog, category and tag archives, the sitemap and RSS.
- `src/content/pages/` and `src/content/posts/`: Markdown content (the CMS edits these). `src/content/settings/site.json` holds site settings such as the contact form endpoint.
- `src/components/` and `src/components/pages/`: shared components and one component per main page.
- `src/layouts/Base.astro`: the page shell, SEO tags and JSON-LD.
- `src/styles/beta/global.css`: the design system.
- `public/`: fonts, images (kept under their historical `/wp-content/uploads/` paths), `_redirects`, `_headers`, `robots.txt` and the CMS at `/admin/`.
- `migration/`: original WordPress exports, kept as reference data.

## Editing

The owner edits blog posts and the main pages' text at `/admin/` ([Sveltia CMS](https://sveltiacms.app), signed in with GitHub). Each edit becomes a draft pull request. See [the editing guide](docs/cms-editing-guide.md) and [the CMS architecture](docs/cms-architecture.md). Layout changes are made in the source.

## Launch and follow-up

See [LAUNCH-TODO.md](LAUNCH-TODO.md) for the remaining post-launch tasks, including archiving the old `yatanco/livingrhea-astro` repo, and [SEO-AIO-RECOVERY.md](SEO-AIO-RECOVERY.md) for traffic recommendations. Older documents in `docs/` describe the previous `livingrhea-astro` site and may be out of date.
