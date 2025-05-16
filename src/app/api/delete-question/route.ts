import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID mancante" }, { status: 400 });
    }

    return new Promise((resolve, reject) => {
      db.query('DELETE FROM domande WHERE id = ?', [id], (err) => {
        if (err) {
          console.error("Errore eliminazione domanda:", err);
          resolve(NextResponse.json({ message: "Errore nel database" }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ message: "Domanda eliminata con successo" }, { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error("Errore DELETE:", error);
    return NextResponse.json({ message: "Errore interno" }, { status: 500 });
  }
}
