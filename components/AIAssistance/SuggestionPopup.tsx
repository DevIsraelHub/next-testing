"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Check, History, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SuggestionPopupProps {
  suggestion: string
  originalText: string
  onAccept: () => void
  onDismiss: () => void
  position: string
  isLoading: boolean
  history: string[]
  onHistoryNavigate: (direction: "prev" | "next") => void
  currentHistoryIndex: number
  onCustomPrompt: (prompt: string) => void
}

export function SuggestionPopup({
  suggestion,
  originalText,
  onAccept,
  onDismiss,
  position,
  isLoading,
  history,
  onHistoryNavigate,
  currentHistoryIndex,
}: SuggestionPopupProps) {
  const [displayedSuggestion, setDisplayedSuggestion] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && suggestion) {
      const words = suggestion.split(" ")
      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setDisplayedSuggestion((prev) => `${prev} ${words[currentIndex]}`)
          setCurrentIndex((prev) => prev + 1)
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isLoading, suggestion, currentIndex])

  useEffect(() => {
    setDisplayedSuggestion(suggestion)
    setCurrentIndex(suggestion.split(" ").length)
  }, [suggestion])

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <Card
      className={`absolute ${position} w-[400px] h-[310px] shadow-lg flex flex-col z-[99999]`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 border-b mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold">Review AI suggestion</h4>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleHistory}>
            <History className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 lex flex-grow overflow-hidden">
        <div
          className={cn(
            "h-full transition-transform w-full duration-300 ease-in-out flex",
            showHistory ? "-translate-x-full" : "translate-x-0",
          )}
        >
          <div className="w-full flex-shrink-0 px-4">
            <div
              ref={contentRef}
              className="h-full w-full overflow-auto pr-2 pb-4"
            >
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Enhancement</span> <span className="text-gray-500">&bull;</span> Improve clarity
                </div>
                <div className="text-sm">
                  <div className="line-through text-muted-foreground mb-2">{originalText}</div>
                  <div className="font-medium">
                    {isLoading ? (
                      <div className="flex items-center mt-4">
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" /> thinking...
                      </div>
                    ) : (
                      displayedSuggestion
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-shrink-0 overflow-auto px-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Generation History</h3>
              {history.map((item, index) => (
                <div key={index} className="text-sm border-b pb-2">
                  <div className="font-medium mb-1">Generation {index + 1}</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col border-t flex items-center py-4 space-y-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-2">
            <Button onClick={onAccept} className="bg-primary hover:bg-primary text-white" disabled={isLoading}>
              Accept
            </Button>
            <Button variant="ghost" onClick={onDismiss}>
              Dismiss
            </Button>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onHistoryNavigate("prev")}
              disabled={currentHistoryIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onHistoryNavigate("next")}
              disabled={currentHistoryIndex === history.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

