import { NextResponse } from "next/server";

export async function GET() {
  const script = `
    (function() {
      var iframe = document.createElement('iframe');
      iframe.src = "https://next-testing-three-kappa.vercel.app/embed-content";
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.height = "200px"; // Adjust as needed
      document.currentScript.parentNode.insertBefore(iframe, document.currentScript);
    })();
  `;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
