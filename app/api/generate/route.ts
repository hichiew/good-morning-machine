import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { buildImagePrompt } from '@/lib/prompt'

export const runtime = 'nodejs' // IMPORTANT

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * GET — just for sanity check
 * Visiting /api/generate in browser should return this
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'POST to this endpoint to generate an image.',
  })
}

/**
 * POST — actual image generation
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { mode, occasion } = body

    if (!mode || !occasion) {
      return NextResponse.json(
        { error: 'Missing mode or occasion' },
        { status: 400 }
      )
    }

    const prompt = buildImagePrompt({
      mode,
      occasion,
      aspect: 'square',
    })
    

    const result = await openai.images.generate({
      model: 'gpt-image-1-mini',
      prompt,
      size: '1024x1024',
      quality: "low",
    })

    const imageBase64 = result.data?.[0]?.b64_json

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'No image returned from OpenAI' },
        { status: 502 }
      )
    }

    return NextResponse.json({ imageBase64 })
  } catch (err: any) {
    console.error('❌ /api/generate failed:', err)

    return NextResponse.json(
      {
        error: err?.message || 'Unknown server error',
      },
      { status: 500 }
    )
  }
}
