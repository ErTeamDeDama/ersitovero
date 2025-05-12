"use client";

import React, { useState } from 'react';
import './admin.css';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleLogout = async () => {
    try {
      await fetch('/api/logout');
      window.location.href = '/admin';
    } catch (error) {
      console.error('Errore durante il logout', error);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage(data.message);
        setMessageType('success');
      } else {
        setMessage(data.message || 'Errore durante la creazione dell\'admin');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Errore nella creazione admin:', error);
      setMessage('Errore di connessione. Riprova più tardi.');
      setMessageType('error');
    }
  };

  return (
    <div className="admin-page">
      <div className="top-bar">
        <div className="left-section">
          <h1 className="admin-title">Ciao Admin</h1>
          <form className="admin-form" onSubmit={handleCreateAdmin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">Crea Admin</button>
            {message && <p className={`message ${messageType}`}>{message}</p>}
          </form>
        </div>

        <div className="right-section">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}