const fs = require("fs");
const path = require("path");

const baseUrl = "https://phytohealthorganics.com";
const publicDir = path.join(__dirname, "..", "public");
const productsFile = path.join(__dirname, "..", "src", "data", "products.ts");

function readProductSlugs() {
  const text = fs.readFileSync(productsFile, "utf8");
  const re = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let m;
  while ((m = re.exec(text))) slugs.push(m[1]);
  return Array.from(new Set(slugs));
}

function buildUrls() {
  const pages = ["/", "/products", "/we-serve", "/contact", "/about", "/bulk-order"];
  const slugs = readProductSlugs();
  slugs.forEach((s) => pages.push(`/products/${s}`));
  return pages;
}

function buildSitemap(urls) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const items = urls
    .map((u) => `  <url>\n    <loc>${baseUrl}${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

function ensurePublic() {
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
}

function writeRobots() {
  const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");
}

function main() {
  ensurePublic();
  const urls = buildUrls();
  const sitemap = buildSitemap(urls);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
  writeRobots();
  console.log(`Wrote sitemap.xml and robots.txt to ${publicDir}`);
}

main();
