/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/AIRE-Companion-Guide.pdf',
        destination: '/AIRELabPlaybook-Facilitator%20Guide%20Sample%20V.5.6.28.pdf',
      },
    ]
  },
}
module.exports = nextConfig
