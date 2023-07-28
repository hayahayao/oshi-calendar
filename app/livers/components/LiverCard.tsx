import './liver.css'
import Link from 'next/link'
import Image from 'next/image'
import type { Liver } from '@prisma/client'

export default function LiverCard({ liver }: { liver: Liver }) {
  return (
    <Link
      href={`/livers/${liver.slug}`}
      prefetch={false}
      passHref
      legacyBehavior
    >
      <div
        className="liver w-50 card cursor-pointer bg-neutral text-neutral-content shadow-xl lg:card-side"
        style={{
          '--liver-main-color': liver.colorMain,
          '--liver-highlight-color': liver.colorHighlight,
        }}
      >
        <div className="avatar m-5 h-40 w-40">
          <Image
            className="rounded-full ring ring-neutral-content"
            src={liver.avatar}
            width={400}
            height={400}
            alt={liver.enName}
          />
        </div>
        <div className="card-body items-center justify-items-center p-5 m-auto">
          <div className="card-title text-base text-center">
            {liver.enName} <br /> {liver.name}
          </div>
        </div>
      </div>
    </Link>
  )
}
