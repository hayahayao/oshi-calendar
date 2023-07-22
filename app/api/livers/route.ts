import { NextResponse, NextRequest } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'oshi-calendar',
  password: process.env.DB_PASSWORD,
  port: 5432,
})

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
    const res = await pool.query('SELECT * FROM livers')
    return NextResponse.json({
      livers: res.rows,
    })
  } catch (e) {
    throw e
  }
}
