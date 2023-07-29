import type { Liver } from '@prisma/client'
import LiverCard from './components/LiverCard'

type ResponseData = {
  livers: Liver[]
}

async function getLivers(): Promise<ResponseData> {
  const res = await fetch('http://localhost:3000/api/livers')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const { livers } = await getLivers()
  return (
    <div className="hero-content text-center">
      <div className="font-mono">
        <h1 className="mt-10 text-2xl">NIJISANJI EN</h1>
        <div className="mt-10 mb-10 grid grid-cols-3 gap-6">
          {livers.map((liver) => (
            <LiverCard key={liver.id} liver={liver}></LiverCard>
          ))}
        </div>
      </div>
    </div>
  )
}
