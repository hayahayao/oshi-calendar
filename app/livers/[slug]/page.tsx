import React from 'react'

async function getVideos(slug: string) {
  const res = await fetch(`http://localhost:3000/api/livers/${slug}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { items = [] } = await getVideos(params.slug)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {items.map((val) => (
        <div key={`${val.etag}`} className="flex w-full">
          <p>{val.etag}</p>
          <p>{val?.snippet?.title}</p>
          <p>{val?.snippet?.description}</p>
        </div>
      ))}
    </div>
  )
}
