import { getCookie } from 'cookies-next'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const accessToken = getCookie('accessToken', { res, req })
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}
