import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
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
    const res = await prisma.liver.findMany()
    return NextResponse.json({
      livers: res,
    })
  } catch (e) {
    throw e
  }
}
