import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ message: 'Tutti i campi sono obbligatori' }, { status: 400 });
    }

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO domande (domanda, soluzione) VALUES (?, ?)', [question, answer], (err) => {
        if (err) {
          console.error("Errore nel database:", err);
          resolve(NextResponse.json({ message: 'Errore nel database' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ message: 'Domanda creata con successo!' }, { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error('Errore nella creazione delle domande:', error);
    return NextResponse.json({ message: 'Errore nel server' }, { status: 500 });
  }
}
