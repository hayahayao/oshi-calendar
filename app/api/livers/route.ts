import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // const secret = request.nextUrl.searchParams.get('secret')
  // if (secret !== process.env.MY_SECRET_TOKEN) {
  //   return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
  //     status: 401,
  //     statusText: 'Unauthorized',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  // }

  try {
    const livers = await prisma.liver.findMany()

    return NextResponse.json({ livers })
  } catch (e) {
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
