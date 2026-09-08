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
  async headers() {
    const htmlCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=3600, stale-while-revalidate=86400",
      },
      {
        key: "CDN-Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
      {
        key: "Cloudflare-CDN-Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];

    return [
      { source: "/kemitraan-tea-tree", headers: htmlCache },
      { source: "/terima-kasih", headers: htmlCache },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
