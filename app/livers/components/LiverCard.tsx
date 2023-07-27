import Link from 'next/link'
import Image from 'next/image'
import type { Liver } from '@prisma/client'

export default function LiverCard({ liver }: { liver: Liver }) {
  return (
    <Link href={`/livers/${liver.slug}`}>
      {/* Arbitrary values cannot be computed from dynamic values */}
      {/* https://v2.tailwindcss.com/docs/just-in-time-mode#all-variants-are-enabled */}
      {/* TODO: hover */}
      <div
        className="card lg:card-side w-50 bg-base-100 shadow-xl"
        style={{ backgroundColor: liver.colorHighlight }}
      >
        <figure className="avatar w-40 h-40 m-5 rounded-xl">
          <Image
            src={liver.avatar}
            width={400}
            height={400}
            alt={liver.enName}
          />
        </figure>
        <div className="card-body p-4">
          <p className="card-title font-mono text-base whitespace-pre">
            {liver.enName}
          </p>
          <p className="card-title font-mono text-base whitespace-pre">
            {liver.name}
          </p>
        </div>
      </div>
    </Link>
  )
}
