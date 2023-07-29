import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Innertube, YTNodes } from 'youtubei.js'
import { fetch, ProxyAgent } from 'undici'

// export const revalidate = 0

const httpsAgent = new ProxyAgent(process.env.HTTPS_PROXY)

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const liver = await prisma.liver.findUnique({
      where: {
        slug: params.slug,
      },
    })

    if (!liver) {
      throw new Error('Get liver info Error')
    }

    const yt = await Innertube.create({
      generate_session_locally: true,
      fetch: (input, init) => {
        // input.duplex = 'half'
        return fetch(input, {
          ...init,
          dispatcher: httpsAgent,
        })
      },
    })

    const channelId = liver.channelId

    const channel = await yt.getChannel(channelId)

    const streamsInfo = await channel.getLiveStreams()
    const streams = streamsInfo.videos

    const res = streams.map((i) => ({
      title: i.title.toString(),
      published: i.published.toString(),
      duration: i.duration.seconds,
    }))
    console.log('==== ', res)

    return NextResponse.json({
      streams: res,
    })
  } catch (e) {
    console.error(e)
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
