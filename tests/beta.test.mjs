import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { load } from "cheerio";

// Every built HTML page except the CMS, which loads its own editor.
async function pages(dir = "dist") {
  const out = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) {
      if (path !== "dist/admin") out.push(...(await pages(path)));
    } else if (name.endsWith(".html")) out.push(path);
  }
  return out;
}
const all = await pages();
const html = new Map(
  await Promise.all(all.map(async (p) => [p, load(await readFile(p, "utf8"))])),
);

// The one script allowed besides JSON-LD: the deferred Google Analytics tag.
const analytics = (await readFile("src/components/Analytics.astro", "utf8"))
  .match(/<script is:inline>([\s\S]*?)<\/script>/)[1]
  .trim();

test("public pages run no JavaScript but analytics, and load nothing from other hosts", () => {
  for (const [page, $] of html) {
    for (const s of $("script").toArray()) {
      if ($(s).attr("type") === "application/ld+json") continue;
      assert.equal($(s).html().trim(), analytics, `${page}: only the analytics script`);
      assert.equal($(s).attr("src"), undefined, page);
    }
    assert.equal($("script:not([type])").length, 1, `${page}: analytics once`);
    for (const el of $("link[href], img[src], source[srcset], iframe[src]").toArray()) {
      const url = $(el).attr("href") || $(el).attr("src") || $(el).attr("srcset");
      if ($(el).is("iframe") || $(el).is('link[rel="canonical"], link[rel="alternate"]')) continue;
      assert.doesNotMatch(url, /^(https?:)?\/\//, `${page}: ${url}`);
    }
    assert.equal($('link[rel="stylesheet"]').length, 0, `${page}: CSS is inlined`);
  }
});

test("every external link and form target already existed on the live site", async () => {
  const known = new Set([
    ...JSON.parse(await readFile("tests/fixtures/external-links.json", "utf8")),
    // Wayback snapshots that replace links whose sites have since gone offline.
    ...JSON.parse(await readFile("tests/fixtures/archived-links.json", "utf8")),
  ]);
  for (const [page, $] of html)
    for (const el of $("a[href], form[action]").toArray()) {
      const url = $(el).attr("href") || $(el).attr("action");
      if (/^https?:/.test(url) && !url.startsWith("https://livingrhea.com/"))
        assert.ok(known.has(url) || known.has(url.replace(/&/g, "&amp;")), `${page}: ${url}`);
    }
});

test("pages have one h1, a description, a livingrhea.com canonical and labelled media", () => {
  for (const [page, $] of html) {
    assert.equal($("h1").length, 1, `${page}: h1`);
    const description = $('meta[name="description"]').attr("content") || "";
    assert.ok(description.length > 20 && description.length <= 160, `${page}: description`);
    assert.match($('link[rel="canonical"]').attr("href"), /^https:\/\/livingrhea\.com\//, page);
    for (const img of $("img").toArray()) {
      assert.ok($(img).attr("alt") !== undefined, `${page}: img alt`);
      assert.ok($(img).attr("width") && $(img).attr("height"), `${page}: ${$(img).attr("src")}`);
    }
    for (const frame of $("iframe").toArray()) assert.ok($(frame).attr("title"), `${page}: iframe title`);
    assert.equal($("main#main").length, 1, page);
  }
});

test("videos load YouTube only after a click", () => {
  const $ = html.get("dist/about/index.html");
  const frames = $("iframe.video").toArray();
  assert.equal(frames.length, 6);
  for (const frame of frames) {
    assert.match($(frame).attr("srcdoc"), /youtube-nocookie\.com\/embed\/[\w-]+\?autoplay=1/);
    assert.match($(frame).attr("srcdoc"), /url\(\/_astro\//);
    assert.equal($(frame).attr("loading"), "lazy");
  }
});

test("navigation works without JavaScript on desktop and mobile", () => {
  const $ = html.get("dist/index.html");
  const desktop = $(".desktop-nav a").map((_, a) => $(a).attr("href")).get();
  const mobile = $(".mobile-nav a").map((_, a) => $(a).attr("href")).get();
  for (const href of ["/", "/about/", "/coaching/", "/himalayan-breathwork/", "/smoothie-movement/", "/music/", "/press/", "/blog/", "/contact/"]) {
    assert.ok(desktop.includes(href), href);
    assert.ok(mobile.includes(href), href);
  }
  assert.equal($("details.mobile-nav > summary").length, 1);
});

test("newsletter forms keep the Mailchimp audience and honeypot", () => {
  const $ = html.get("dist/index.html");
  const forms = $('form[action*="list-manage.com"]').toArray();
  assert.equal(forms.length, 2);
  for (const form of forms) {
    assert.equal($(form).find('input[name="EMAIL"][required]').length, 1);
    assert.equal($(form).find('input[name="b_1f4a62aaddd7118ef28dc647b_224b479806"]').length, 1);
  }
  assert.equal($("#freeGuide").length, 1);
});

test("robots.txt welcomes every crawler and lists the sitemap", async () => {
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.match(robots, /^User-agent: \*\nAllow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow:/m);
  assert.match(robots, /^Sitemap: https:\/\/livingrhea\.com\/sitemap\.xml$/m);
});

test("every page has its own title", () => {
  const seen = new Map();
  for (const [page, $] of html) {
    if (page === "dist/404.html") continue;
    const title = $("title").text();
    assert.ok(!seen.has(title), `${page} repeats ${seen.get(title)}: ${title}`);
    seen.set(title, page);
  }
});

test("headings never skip a level (h2 after h1, h3 after h2, ...)", () => {
  for (const [page, $] of html) {
    let prev = 1;
    for (const h of $("main h1, main h2, main h3, main h4, main h5, main h6").toArray()) {
      const level = Number(h.tagName[1]);
      assert.ok(level <= prev + 1, `${page}: h${prev} -> h${level} "${$(h).text().slice(0, 50)}"`);
      prev = level;
    }
  }
});
