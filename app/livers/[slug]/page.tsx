import React from 'react'
import type { Liver } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

const Heatmap = React.lazy(() => import('./components/Heatmap'))

export const revalidate = 60 * 60 * 24

export default async function Page({ params }: { params: { slug: string } }) {
  const liver: Liver | null = await prisma.liver.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!liver) {
    throw new Error('Get liver info Error')
  }

  return (
    <div className="hero-content text-center font-mono">
      <div className="">
        <div className="avatar m-5 h-40 w-40">
          <Image
            className="rounded-full ring ring-neutral-content"
            style={{ backgroundColor: `${liver.colorMain}` }}
            src={liver.avatar}
            width={400}
            height={400}
            alt={liver.enName}
          />
        </div>
        <h2 className="text-xl" style={{ color: `${liver.colorMain}` }}>
          {liver.enName}
        </h2>
        <div className="mt-5 flex justify-center">
          <Link href={liver.linkYoutube} className="btn btn-ghost">
            <i className="nes-icon youtube"></i>
          </Link>
          <div className="divider divider-horizontal"></div>
          <Link href={liver.linkTwitter} className="btn btn-ghost">
            <i className="nes-icon twitter"></i>
          </Link>
        </div>
        <React.Suspense
          fallback={
            <span className="mt-10 loading loading-ring loading-lg"></span>
          }
        >
          <Heatmap liver={liver}></Heatmap>
        </React.Suspense>
      </div>
    </div>
  )
}
