# Living Rhea: owner's manual

A short guide to running livingrhea.com: what lives where, how to post, and who to ask.

## Your site at a glance

| What | Where | Notes |
|---|---|---|
| The website | https://livingrhea.com | Fast and simple: no WordPress, no plugins to update, nothing to hack. |
| The editor | https://livingrhea.com/admin/ | Write and edit blog posts here. |
| Hosting | Cloudflare (Pages project `livingrhea-beta`) | Rebuilds the site whenever a change is published. Keeps every past version. |
| Site files | GitHub (`yatanco/livingrhea-beta`) | Every page, post and photo is saved here, with full history. |
| Contact form | Formspree | Messages from the Contact page arrive by email. |
| Newsletter and free smoothie guide | Mailchimp | Signups go straight to your existing audience. |

## Writing a blog post

1. Go to **livingrhea.com/admin/** and click **Sign in with GitHub**. (No GitHub account yet? Ask your developer to invite you.)
2. Open **Blog posts** and click **New Post**, or click an existing post to edit it.
3. Fill in:
   - **Title**: shown at the top of the post and in Google.
   - **Excerpt / description**: one or two sentences. Google and social shares show this.
   - **Publish date**: the date shown on the post.
   - **Categories**: reuse an existing one, spelled exactly as listed below.
   - **Tags** (optional): a few keywords. A tag gets its own page once 3 or more posts use it.
   - **Featured image**: upload a photo. The site resizes and compresses it automatically.
   - **Featured image alt text**: a short description of the photo, for people using screen readers and for Google.
   - **Post body**: the article itself. Use the toolbar for headings, bold, links and images. Don't use the largest heading ("Heading 1"): the title already is one. Start with "Heading 2".
4. Click **Save**. Your post is now a **draft**, which is not on the live site yet.

### Categories

Use these exactly (name, then the slug in brackets):

- Scientific Wellness (`scientific-wellness`)
- Recipes (`recipes`)
- Product Reviews (`product-reviews`)
- Publications & Interviews (`publications-interviews`)
- Poetic Reflections (`poetic-reflections`)
- Blog (`blog`)

A new category is fine too: give it a name and a slug in lowercase letters and hyphens, for example `mindful-eating`.

## Publishing

Saved changes wait as drafts so nothing goes live by accident.

1. In the editor, open your draft and set its status to **Ready**.
2. Click **Publish**.
3. The site rebuilds and the change is live in about **two minutes**.

To keep a finished post off the site for now, tick **Save as draft (hidden from the live site)** before publishing. Untick it later to show the post.

New posts appear automatically on the Blog page, in the RSS feed, and in the sitemap Google reads. No extra step is needed.

## What to ask your developer for

The editor covers blog posts, plus each main page's title and search description. Ask your developer for:

- changes to the text, buttons, photos or layout of the main pages (Home, About, Coaching, Himalayan Breathwork, Music, Press, Smoothie Movement, Contact)
- new pages or menu items
- links to booking, Fullscript or any other outside service
- anything that looks broken

Please keep page and post addresses (URLs) the same. If one must change, tell your developer so old links can be pointed to the new address.

## Contact messages

Messages from the Contact page come by email through Formspree. After sending, visitors see Formspree's confirmation page. To change which address receives them, or to look at past messages and the spam folder, sign in at formspree.io. A hidden spam trap on the form filters most bot messages before they reach you.

## Newsletter and the free smoothie guide

Signup boxes on the site (including the smoothie guide) add people to your existing Mailchimp audience. The welcome email and the guide delivery are set up inside Mailchimp. Edit them there, not on the website.

## Search engines and AI assistants

The site is open to all search engines and AI assistants (Google, Bing, ChatGPT, Claude, Perplexity and others), so your articles can be found and quoted. Google and Bing get a sitemap at `livingrhea.com/sitemap.xml`. Search traffic takes a few weeks to settle after a move like this one. Google Search Console and Bing Webmaster Tools show how the site is doing in search.

## If something goes wrong

- **The site looks wrong after a change:** tell your developer. Cloudflare keeps every published version, and going back to the previous one takes a minute.
- **Can't sign in to the editor:** tell your developer. It's usually a permission setting, not something you did.
- **Never** change the domain or DNS settings in Cloudflare unless your developer asks you to. That's what keeps the site and your email working.

## Accounts to keep safe

Cloudflare (hosting and domain), GitHub (site files and editor sign-in), Formspree (contact form) and Mailchimp (newsletter). Use strong passwords and two-factor sign-in on each. Make sure you can sign in to every one yourself, not only your developer.
