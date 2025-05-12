// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  // Rimuovi il cookie (es. "token")
  const response = NextResponse.json({ message: 'Logout effettuato' });
  response.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // scadenza passata
  });

  return response;
}