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
    <div className="hero-content grid grid-cols-3 gap-6">
      {livers.map((liver) => (
        <LiverCard key={liver.id} liver={liver}></LiverCard>
      ))}
    </div>
  )
}
