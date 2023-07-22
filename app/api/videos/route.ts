import { NextResponse, NextRequest } from 'next/server'
import { google, youtube_v3 } from 'googleapis'

const youtube: youtube_v3.Youtube = google.youtube({
  version: 'v3',
  auth: process.env.API_KEY,
})

export async function GET(request: NextRequest) {
  const res = await youtube.search.list({
    part: ['snippet'],
    channelId: 'UCuuAb_72QzK0M1USPMEl1yw',
  })
  return NextResponse.json(res.data)
}
