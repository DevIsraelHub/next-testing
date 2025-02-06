"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PreviewModal from "@/components/preview-modal"
import { toast } from "@/hooks/use-toast"

export default function EmbedScriptGenerator() {
  const [showPreview, setShowPreview] = useState(false)
  const [embedId, setEmbedId] = useState("default-embed-id")

  const embedCode = `<script src="https://v0-next-testing-pwaxyo.vercel.app/embed.js" data-embed-id="${embedId}"></script>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(
      () => {
        toast({
          title: "Copied!",
          description: "Embed code copied to clipboard",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Embed Script Generator</h1>
      <div className="mb-4">
        <Label htmlFor="embed-id">Embed ID</Label>
        <Input id="embed-id" value={embedId} onChange={(e) => setEmbedId(e.target.value)} className="mt-1" />
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <pre className="whitespace-pre-wrap break-all">{embedCode}</pre>
      </div>
      <div className="flex space-x-2">
        <Button onClick={copyToClipboard}>Copy Embed Code</Button>
        <Button variant="outline" onClick={() => setShowPreview(true)}>
          Preview
        </Button>
      </div>
      <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} embedCode={embedCode} />
    </div>
  )
}
