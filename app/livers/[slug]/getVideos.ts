// @ts-nocheck
import { Innertube, UniversalCache } from 'youtubei.js/web'
// import { fetch, ProxyAgent } from 'undici'

export default async function getVideos(channelId) {
  try {
    // const httpsAgent = new ProxyAgent(process.env.HTTPS_PROXY)

    const yt = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true,
      fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const url =
          typeof input === 'string'
            ? new URL(input)
            : input instanceof URL
            ? input
            : new URL(input.url)

        // Transform the url for use with our proxy.
        url.searchParams.set('__host', url.host)
        url.host = 'localhost:8080'
        url.protocol = 'http'

        const headers = init?.headers
          ? new Headers(init.headers)
          : input instanceof Request
          ? input.headers
          : new Headers()

        // Now serialize the headers.
        url.searchParams.set('__headers', JSON.stringify([...headers]))

        if (input instanceof Request) {
          // @ts-ignore
          input.duplex = 'half'
        }

        // Copy over the request.
        const request = new Request(
          url,
          input instanceof Request ? input : undefined
        )

        headers.delete('user-agent')

        return fetch(
          request,
          init
            ? {
                ...init,
                headers,
              }
            : {
                headers,
              }
        )
      },
      // fetch: (input, init) => {
      //   return process.env.NODE_ENV === 'development'
      //     ? fetch(input, {
      //         ...init,
      //         dispatcher: httpsAgent,
      //       })
      //     : fetch(input, init)
      // },
    })

    const channel = await yt.getChannel(channelId)

    // get all videos
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

    return {
      streams: resData,
    }
  } catch (e) {
    console.error(e)
    return {
      streams: [],
    }
  }
}
