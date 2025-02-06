export interface Suggestion {
  id: string
  original: string
  improved: string
  type: "enhancement" | "correction" | "expansion"
}

export interface AIAssistantProps {
  content: string
  onUpdate: (newContent: string) => void
  position?: string
}

