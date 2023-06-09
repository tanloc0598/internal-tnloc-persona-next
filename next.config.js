/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SITE: process.env.SITE ?? " ",
    SITE_TITLE: process.env.SITE_TITLE ?? " - Persona",
    LOGROCKET_APP_ID: process.env.LOGROCKET_APP_ID??"",
    GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY ?? "",
    BASE_PATH: process.env.BASE_PATH ?? "",
    BLOG_URL: process.env.BLOG_URL ?? "",
    CV_LINK: process.env.CV_LINK ?? "",

  },
  basePath: process.env.BASE_PATH ?? "",
  images:{unoptimized: true}
}

module.exports = nextConfig
