// Writes out/sitemap.xml and out/robots.txt after `next build` (output: 'export').
const fs = require('fs')
const path = require('path')

const site = (process.env.SITE ?? 'https://tanlocnguyen0598.github.io').trim().replace(/\/$/, '')
const base = `${site}${process.env.BASE_PATH ?? ''}`
const outDir = path.join(__dirname, '..', 'out')

const posts = fs.readdirSync(path.join(__dirname, '..', 'content/en/articles'))
    .filter(f => f.endsWith('.md'))
    .map(f => `/post/${f.replace(/\.md$/, '')}`)

const urls = ['', '/post', ...posts]
    .map(p => `  <url><loc>${base}${p}</loc></url>`)
    .join('\n')

fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
fs.writeFileSync(path.join(outDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)

console.log(`sitemap.xml: ${urls.split('\n').length} urls`)
