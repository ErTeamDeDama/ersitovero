import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Tutti i campi sono obbligatori' }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        reject(NextResponse.json({ message: 'Errore nel database' }, { status: 500 }));
        return;
      }

      if (results.length > 0 && results[0].password === password) {
        // LOGIN OK - salva cookie
        const response = NextResponse.json({ message: 'Login riuscito' });
        response.cookies.set('session', username, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: '/',
        });
        resolve(response);
      } else {
        resolve(NextResponse.json({ message: 'Credenziali errate' }, { status: 401 }));
      }
    });
  });
}