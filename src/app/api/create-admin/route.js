import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Verifica se i campi sono presenti
    if (!username || !password) {
      return NextResponse.json({ message: 'Tutti i campi sono obbligatori' }, { status: 400 });
    }

    // Aggiungi il nuovo admin nel database
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
          reject(NextResponse.json({ message: 'Errore nel database' }, { status: 500 }));
          return;
        }

        // Admin creato con successo
        const response = NextResponse.json({ message: 'Admin creato con successo!' });
        resolve(response);
      });
    });
  } catch (error) {
    console.error('Errore durante la creazione dell\'admin:', error);
    return NextResponse.json({ message: 'Errore nella creazione dell\'admin' }, { status: 500 });
  }
}
