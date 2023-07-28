import Link from 'next/link'
import type { Liver } from '@prisma/client'
import LiverCard from './components/LiverCard'

async function getLivers() {
  const res = await fetch('http://localhost:3000/api/livers')
  return res.json()
}

export default async function Page() {
  const { livers = [] }: { livers: Liver[] } = await getLivers()
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
