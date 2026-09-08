import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Semua foto di-host sendiri di /public/foto, jadi tidak ada host
     eksternal yang perlu di-allowlist untuk next/image. */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/kemitraan-tea-tree",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
