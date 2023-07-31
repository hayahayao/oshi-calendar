// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Innertube, UniversalCache } from 'youtubei.js'
import { fetch, ProxyAgent } from 'undici'
import * as dayjs from 'dayjs'

export const revalidate = 60 * 60 * 24

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
      cache: new UniversalCache(true, process.cwd() + '/.cache'),
      generate_session_locally: true,
      fetch: (input, init) => {
        return fetch(input, {
          ...init,
          dispatcher: httpsAgent,
        })
      },
    })

    const channel = await yt.getChannel(liver.channelId)

    let continuation = await channel.getLiveStreams()
    let streams = continuation.videos

    while (continuation.has_continuation) {
      continuation = await continuation.getContinuation()
      streams = streams.concat(continuation.videos)
    }

    const resData = streams.map((i) => ({
      title: i.title.toString(),
      duration: i.duration.seconds,
      // origin_video: i,
    }))

    // get start_timestamp
    const basicInfos = await Promise.all(
      streams.map((video) => {
        return Promise.resolve(yt.getBasicInfo(video.id))
      })
    )
    basicInfos.forEach((info, i) => {
      // resData[i].origin_info = info
      resData[i].published = info.basic_info.start_timestamp
    })

    return NextResponse.json({
      liver,
      streams: resData,
    })
  } catch (e) {
    console.error(e)
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
