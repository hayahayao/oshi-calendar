// @ts-nocheck
'use client'
import { NextRequest, NextResponse } from 'next/server'
import { Innertube, UniversalCache } from 'youtubei.js'
import { fetch, ProxyAgent } from 'undici'

export const revalidate = 60 * 60 * 24

const httpsAgent = new ProxyAgent(process.env.HTTPS_PROXY)

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const channelId = params.slug

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

    const channel = await yt.getChannel(channelId)

    let continuation = await channel.getLiveStreams()
    let streams = continuation.videos

    while (continuation.has_continuation) {
      continuation = await continuation.getContinuation()
      streams = streams.concat(continuation.videos)
    }

    const resData: Stream[] = streams.map((i) => ({
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
      streams: resData,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
