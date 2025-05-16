import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const { id, domanda, soluzione } = await req.json();

    if (!id || domanda === undefined || soluzione === undefined) {
      return NextResponse.json({ message: "Tutti i campi sono obbligatori" }, { status: 400 });
    }

    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE domande SET domanda = ?, soluzione = ? WHERE id = ?',
        [domanda, soluzione, id],
        (err) => {
          if (err) {
            console.error("Errore modifica domanda:", err);
            resolve(NextResponse.json({ message: "Errore nel database" }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ message: "Domanda aggiornata con successo" }, { status: 200 }));
          }
        }
      );
    });
  } catch (error) {
    console.error("Errore PUT:", error);
    return NextResponse.json({ message: "Errore interno" }, { status: 500 });
  }
}
