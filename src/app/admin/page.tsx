'use client';

import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { handleSubmit } from './loginHelper';
import img from './x-icon.png'

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setError('');
      }, 3000); // 3 secondi
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {showToast && (
        <div className={styles.toast}>
          <img src='/prova.png' alt="Errore" className={styles.toastIcon} />
          <span>Credenziali errate</span>
        </div>
      )}

      <div className={styles.background}>
        <form
          className={styles.card}
          onSubmit={(e) => handleSubmit(e, username, password, setError)}
        >
          <h2 className={styles.title}>Admin Login</h2>

          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Entra
          </button>
        </form>
      </div>
    </>
  );
}
