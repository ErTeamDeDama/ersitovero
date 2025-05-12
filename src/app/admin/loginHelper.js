export const handleSubmit = async (e, username, password, setError) => {
    e.preventDefault();
    
    // Verifica che i campi non siano vuoti
    if (!username || !password) {
      setError('Tutti i campi sono obbligatori');
      return;
    }
  
    // Simula l'invio dei dati al server
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Login riuscito
        console.log('Login riuscito');
        window.location.href = '/admin-dashboard';  // Cambia con il percorso del dashboard
      } else {
        // Credenziali errate
        setError('Credenziali errate');
      }
    } catch (err) {
      // Gestisce l'errore di connessione
      setError('Errore di connessione');
      console.error(err);
    }
  };