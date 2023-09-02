'use client'
import React from 'react'
import Heatmap from './components/Heatmap'
import type { Liver } from '@prisma/client'

type Stream = {
  title: string
  duration: number
  published: string
}

async function getVideos(slug: string) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/livers/${slug}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const revalidate = 0

export default async function Page({ params }: { params: { slug: string } }) {
  const { liver, streams }: { liver: Liver; streams: Stream[] } =
    await getVideos(params.slug)
  const calendarData = streams.map((stream) => ({
    key: new Date(stream.published),
    data: stream.duration,
  }))

  return (
    <div className="flex">
      {calendarData.length}
      <Heatmap data={calendarData}></Heatmap>
    </div>
  )
}
