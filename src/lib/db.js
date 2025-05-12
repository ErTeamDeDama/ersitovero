import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',       // il tuo host (localhost per XAMPP)
  user: 'root',            // nome utente del database (root di default)
  password: '',            // la password di default di XAMPP è vuota (lasciare vuoto se non l'hai cambiata)
  database: 'login_app'    // il nome del tuo database
});

db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err.stack);
    return;
  }
  console.log('Connesso al database con ID:', db.threadId);
});

export default db;