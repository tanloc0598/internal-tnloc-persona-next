/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SITE: process.env.SITE ?? " ",
    SITE_TITLE: process.env.SITE_TITLE ?? " - Persona",
    LOGROCKET_APP_ID: process.env.LOGROCKET_APP_ID??"",
    GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY ?? ""
  },
}

module.exports = nextConfig
