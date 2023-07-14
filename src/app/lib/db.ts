import { google, youtube_v3 } from 'googleapis'

const youtube: youtube_v3.Youtube = google.youtube({
  version: 'v3',
  auth: process.env.API_KEY,
})

export async function getVideos() {
  const res = await youtube.search.list({
    part: ['snippet'],
    channelId: 'UCuuAb_72QzK0M1USPMEl1yw',
  })

  console.log(res)

  return res.data
}
