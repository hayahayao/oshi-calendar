'use client'

import { useState, useEffect } from 'react'
import { CalendarHeatmap } from 'reaviz'
import type { Liver } from '@prisma/client'
import Loading from '@/app/components/Loading'
// import getVideos from '../getVideos'

type Stream = {
  title: string
  duration: any
  published?: any
}

type ResponseData = {
  streams: Stream[]
}

async function getVideos(channelId: string): Promise<ResponseData> {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/livers/${channelId}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function Heatmap({ liver }: { liver: Liver }) {
  const [streams, setStreams] = useState<Stream[]>([])
  const [error, setError] = useState<Boolean>(false)

  useEffect(() => {
    async function getStreams() {
      try {
        const data = await getVideos(liver.channelId)
        setStreams(data.streams)
      } catch (e) {
        setError(true)
      }
    }
    getStreams()
  }, [liver.channelId])

  const calendarData = streams.map((stream) => ({
    key: new Date(stream.published),
    data: stream.duration,
  }))

  return (
    <div className="text-center">
      {calendarData.length ? (
        <>
          <p className="text-base">
            {liver.enName} has streamed {calendarData.length} times!
          </p>
          <CalendarHeatmap
            className="mt-10"
            data={calendarData}
            height={115}
            width={715}
          ></CalendarHeatmap>
          {/* TODO: video list */}
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
