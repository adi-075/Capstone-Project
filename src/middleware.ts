import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/app/utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  await updateSession(req, res);
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};