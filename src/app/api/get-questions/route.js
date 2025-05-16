import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  return new Promise((resolve) => {
    db.query('SELECT id, domanda, soluzione FROM domande', (err, results) => {
      if (err) {
        console.error("Errore nel recupero delle domande:", err);
        resolve(NextResponse.json({ message: 'Errore nel database' }, { status: 500 }));
        return;
      }

      resolve(NextResponse.json({ questions: results }, { status: 200 }));
    });
  });
}
