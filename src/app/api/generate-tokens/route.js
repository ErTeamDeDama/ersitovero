import db from '../../../lib/db';
import { NextResponse } from 'next/server';


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]:;<>,.?/';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

export async function POST(req) {
    const { className, tokenCount } = await req.json();
  
    if (
      typeof className !== "string" ||
      className.trim() === "" ||
      typeof tokenCount !== "number" ||
      !Number.isInteger(tokenCount) ||
      tokenCount < 1
    ) {
      return NextResponse.json({ message: "Tutti i campi sono obbligatori" }, { status: 400 });
    }
  
    try {
      const newTokens = []; // Array per i nuovi token generati
  
      // Crea i token e salvali nel database
      for (let i = 0; i < tokenCount; i++) {
        const token = generateRandomString(5);
        newTokens.push(token);
  
        // Inserisci il token nel database (tabella 'token')
        await new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO token (token, classe, usato) VALUES (?, ?, ?)',
            [token, className, false],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      }
  
      // Restituisci solo i token appena creati
      return NextResponse.json({ 
        message: 'Token creati con successo!',
        tokens: newTokens // restituisce solo i token appena generati
      });
    } catch (error) {
      console.error('Errore nella creazione dei token:', error);
      return NextResponse.json({ message: 'Errore nel database' }, { status: 500 });
    }
  }