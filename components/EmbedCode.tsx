"use client";

import { useState } from "react";

const EmbedCode = () => {
  const embedCode = `<script src="https://next-testing-three-kappa.vercel.app/api/embed" async></script>`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 border rounded-lg">
      <p className="mb-2">Copy this code to embed:</p>
      <pre className="p-2 bg-gray-100 border rounded">{embedCode}</pre>
      <button
        className="mt-2 px-3 py-1 bg-purple-500 text-white rounded"
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  );
};

export default EmbedCode;
