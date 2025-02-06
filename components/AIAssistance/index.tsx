"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// import { Wand2 } from "lucide-react"

import { AIAssistantProps } from "@/types/ai-assistance";
import { SuggestionPopup } from "./SuggestionPopup";
import { useToast } from "@/hooks/use-toast";

const HISTORY_KEY = "ai_assistant_history"


export function AIAssistant({ content, onUpdate, position }: AIAssistantProps) {
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const storedHistory = localStorage.getItem(HISTORY_KEY)
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem(HISTORY_KEY)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const handleEnhance = async (customPrompt?: string) => {
    setIsLoading(true)
    setShowSuggestion(true)
    setSuggestion("")

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, customPrompt }),
      })

      const data = await response.json()

      if (data.status === "error") {
        throw new Error(data.error)
      }

      setSuggestion(data.suggestion)
      setHistory((prev) => [...prev, data.suggestion])
      setCurrentHistoryIndex(history.length)
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate enhancement. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = () => {
    if (suggestion) {
      onUpdate(suggestion)
    }
    setShowSuggestion(false)
  }

  const handleDismiss = () => {
    setShowSuggestion(false)
  }

  const handleHistoryNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentHistoryIndex > 0) {
      setCurrentHistoryIndex((prev) => prev - 1)
      setSuggestion(history[currentHistoryIndex - 1])
    } else if (direction === "next" && currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex((prev) => prev + 1)
      setSuggestion(history[currentHistoryIndex + 1])
    }
  }

  const handleCustomPrompt = (prompt: string) => {
    handleEnhance(prompt)
  }

  return (
    <>
      {!showSuggestion &&
        <Button
          variant="outline"
          size="sm"
          className="absolute w-[52px] h-[52px] border-background border-4 bg-primary text-white ring-1 shadow-lg ring-[#b9b9b9b9] scale-90 active:scale-90 hover:scale-100 transition-all hover:bg-primary hover:text-white rounded-sm rounded-se-full rounded-ss-full rounded-ee-full text-md font-semibold p-0 -right-[60px] bottom-4 z-index-[9999]"
          disabled={isLoading || !content.trim()}
          onClick={() => handleEnhance()}
        >
          {/* <Wand2 className="w-[14px] h-[14px]" /> */}
          AI
        </Button>
      }

      {showSuggestion && (
        <SuggestionPopup
          suggestion={suggestion}
          originalText={content}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
          position={position!}
          isLoading={isLoading}
          history={history}
          onHistoryNavigate={handleHistoryNavigate}
          currentHistoryIndex={currentHistoryIndex}
          onCustomPrompt={handleCustomPrompt}
        />
      )}
    </>
  )
}

