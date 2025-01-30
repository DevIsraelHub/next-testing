export default {
  async headers() {
    return [
      {
        source: "/embed-content",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // Allow embedding
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *", // Allow all sites
          },
        ],
      },
    ];
  },
};
