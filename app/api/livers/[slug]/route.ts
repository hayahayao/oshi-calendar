import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { google, youtube_v3 } from 'googleapis'
import * as dayjs from 'dayjs'

const youtube: youtube_v3.Youtube = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY,
})

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const liver = await prisma.liver.findUnique({
      where: {
        slug: params.slug,
      },
    })

    const time = dayjs().subtract(3, 'month').toISOString()

    // TODO: polling to get totalResults
    const ytbData = await youtube.search.list({
      part: ['snippet'],
      order: 'date',
      publishedAfter: time,
      channelId: liver.channelId,
    })
    return NextResponse.json(ytbData.data)
  } catch (e) {
    throw e
  }
}
