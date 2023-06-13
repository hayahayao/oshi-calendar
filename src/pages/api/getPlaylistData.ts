import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { authenticate } from '@google-cloud/local-auth'
import path from 'path'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method
    if (httpMethod == 'GET') {
      const response = await getPlaylistData()
      res.status(200).json(response)
    } else {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${httpMethod} not allowed`)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

// TODO: use ApiKey instead of OAuth

export async function getPlaylistData() {
  const youtube = google.youtube('v3')
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../../../../client_secret.json'),
    scopes: ['https://www.googleapis.com/auth/youtube'],
  })
  google.options({ auth })

  const res = await youtube.playlists.list({
    part: ['snippet'],
    channelId: 'UCuuAb_72QzK0M1USPMEl1yw',
  })
  return res
}

export default handler
