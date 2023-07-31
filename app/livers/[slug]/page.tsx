import React from 'react'
import Heatmap from './components/Heatmap'

// type ResponseData = {
//   streams: YTNodes.Video[]
// }

async function getVideos(slug: string) {
  const res = await fetch(`http://localhost:3000/api/livers/${slug}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const revalidate = 0

export default async function Page({ params }: { params: { slug: string } }) {
  const { liver, streams } = await getVideos(params.slug)
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
