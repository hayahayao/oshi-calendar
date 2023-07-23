import { Liver } from '@/types'
import Link from 'next/link'

async function getLivers() {
  const res = await fetch('http://localhost:3000/api/livers')
  return res.json()
}

export default async function Page() {
  const { livers } = await getLivers()
  return (
    <div className="grid grid-cols-4 gap-4 min-h-screen p-24">
      {livers.map((liver: Liver) => (
        <Link key={liver.slug} href={`/livers/${liver.slug}`}>
          <img src={liver.avatar} className="w-10 h-10"></img>
          <p style={{ color: liver.color.main }}>{liver.enName}</p>
          <p style={{ color: liver.color.main }}>{liver.name}</p>
        </Link>
      ))}
    </div>
  )
}
