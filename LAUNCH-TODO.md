# Launch on Cloudflare Pages

This repo (`yatanco/livingrhea-beta`, branch `main`) is the version of livingrhea.com that will launch. Its history already contains all of `yatanco/livingrhea-astro`, which is retired once the domain moves. Do not change DNS or move the domain before the owner signs off.

## Cloudflare configuration

Pages project: `livingrhea-beta` (https://livingrhea-beta.pages.dev/, custom domain https://beta.livingrhea.com/).

- Repository: `yatanco/livingrhea-beta`, connected through Cloudflare's Git integration.
- Production branch: `main`. Pushing `main` deploys beta.
- Build: `npm run build`. Output: `dist`. Root: repository root.
- Node: `24` (`.nvmrc`).
- No WordPress, database or CMS secret is needed at build time.

`livingrhea.com` is currently attached to the old `livingrhea-astro` Pages project. A custom domain can belong to only one project, so it must be removed there before adding it here (step 7).

## Owner checks before switching the domain

1. Review Home, About, Coaching, Breathwork, Music, Press, Smoothie Movement, Blog and Contact on desktop and phone.
2. Submit a real contact message to `https://formspree.io/f/mzeerlkq` and confirm it reaches the intended inbox. In the Formspree dashboard, check that the notification address is correct. The agent has not sent a test message.
3. Test the newsletter signup and smoothie guide delivery with an address you control. The existing Mailchimp audience (`224b479806`) is kept. Its automation cannot be verified from the page HTML.
4. Confirm that the latest `main` deploy succeeded, that historical redirects work, and that `/sitemap.xml` and `/blog/rss.xml` return XML.

## Launch steps

5. Note the current DNS records for `livingrhea.com` and `www` so they can be restored if needed. Do not change email MX/TXT records.
6. Keep the WordPress backup and the old `livingrhea-astro` deployment available for rollback until step 10 passes.
7. In Cloudflare Pages, remove `livingrhea.com` and `www.livingrhea.com` from the `livingrhea-astro` project's custom domains. Add both to `livingrhea-beta`, then follow Cloudflare's displayed DNS instructions exactly.
8. Wait for HTTPS to be active. Canonicals already use `https://livingrhea.com`. Redirect `www` to the apex with a Cloudflare redirect rule.
9. Search indexing: the `X-Robots-Tag: noindex` rules in `public/_headers` only match `beta.livingrhea.com` and the `*.pages.dev` hosts, so livingrhea.com is indexable without any change. Keep them so the staging hosts stay out of search. Optionally, redirect `beta.livingrhea.com` to `livingrhea.com` with a Cloudflare redirect rule, or remove it from the project.
10. On the real domain, verify the home page, several old article URLs (they should 301 to `/blog/<slug>/`), a few `/tag/` URLs, `/feed/` and the contact page. Then submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
11. Update `AGENTS.md` and `README.md`: this repo becomes production, so remove the "never push beta work there" and beta-only wording.

## After launch: retire the old repo

12. Once livingrhea.com has served from `livingrhea-beta` without issues for about a week, disconnect or delete the `livingrhea-astro` Pages project. Then archive `yatanco/livingrhea-astro` on GitHub (Settings → Archive this repository) and add a README note pointing to `yatanco/livingrhea-beta`. Optionally rename this repo, for example to `livingrhea`. GitHub redirects the old name, but the Cloudflare Git connection and the CMS `repo:` setting must then be updated.
13. Retire the old WordPress hosting after the checks above pass. The site does not depend on it.

## CMS

Sveltia CMS at `/admin/`, publishing to this repo (`main`) through GitHub as draft PRs. See `docs/cms-editing-guide.md` (owner) and `docs/cms-architecture.md` (setup). It covers blog posts fully and the main pages' title, description and body text. Changing page layout is still a developer task.
