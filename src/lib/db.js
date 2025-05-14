import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'sql100.infinityfree.com',       // il tuo host (localhost per XAMPP)
  user: 'if0_38980448',            // nome utente del database (root di default)
  password: 'Checkers2025',            // la password di default di XAMPP è vuota (lasciare vuoto se non l'hai cambiata)
  database: 'if0_38980448_test'    // il nome del tuo database
});

db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err.stack);
    return;
  }
  console.log('Connesso al database con ID:', db.threadId);
});

export default db;
