import React from 'react'
import { YTNodes } from 'youtubei.js'

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
  const { streams = [] } = await getVideos(params.slug)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {streams.map((val) => (
        <div key={`${val.title}`} className="flex w-full">
          <p>{val.title}</p>
          <p>{val.published}</p>
          <p>{val.duration}</p>
        </div>
      ))}
    </div>
  )
}
