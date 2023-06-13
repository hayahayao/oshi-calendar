import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(401).json({ message: 'Unauthorised API access.' })
}
export default handler
