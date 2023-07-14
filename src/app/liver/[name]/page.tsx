import React from 'react'
import { getVideos } from '@/lib/db'

export default async function Page() {
  const { items = [] } = await getVideos()
  console.log(items)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {items.map((val, i) => (
        <div key={`${val.etag}`} className="flex w-full">
          <p>{val.etag}</p>
          <p>{val?.snippet?.title}</p>
          <p>{val?.snippet?.description}</p>
        </div>
      ))}
    </div>
  )
}
