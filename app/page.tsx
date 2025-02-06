"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { AIAssistant } from "@/components/AIAssistance"

export default function Page() {
  const [description, setDescription] = useState("")


  return (
    <div className="max-w-2xl mt-[20vh] mx-auto p-4">
      <div className="relative">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your website project..."
          className="min-h-[200px]"
        />
        <AIAssistant content={description} onUpdate={setDescription} position={"right-[-410px] bottom-0"} />
      </div>
      <Toaster />
    </div>
  )
}

