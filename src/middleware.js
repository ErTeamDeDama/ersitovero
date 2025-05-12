import { NextResponse } from 'next/server';

export function middleware(request) {

  const session = request.cookies.get('session');

  // Se non c'è sessione e la pagina è /admin-dashboard, reindirizza
  if (!session && request.nextUrl.pathname.startsWith('/admin-dashboard')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Altrimenti, consenti l'accesso
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dashboard'], // Rimuovi il * per includere tutte le rotte
};