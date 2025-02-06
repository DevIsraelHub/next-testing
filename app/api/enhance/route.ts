import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { content, customPrompt } = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
      },
    })

    const prompt =
      customPrompt ||
      `
    Enhance the following website description to make it more detailed, professional, and technically accurate.
    Keep the same meaning but improve clarity and completeness.
    Limit your response to no more than 300 words.
    
    Original text: "${content}"
    
    Enhanced version:`

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    })

    const response = await result.response.text()

    // Ensure the response is no more than 300 words
    const words = response.split(/\s+/)
    const limitedResponse = words.slice(0, 300).join(" ")

    return NextResponse.json({
      suggestion: limitedResponse,
      status: "success",
    })
  } catch (error) {
    console.error("Enhancement error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate enhancement",
        status: "error",
      },
      { status: 500 },
    )
  }
}

