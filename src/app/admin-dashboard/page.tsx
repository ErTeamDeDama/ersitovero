"use client";

import React, { useState } from "react";
import "./admin.css";

export default function AdminPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [showTokenGenerator, setShowTokenGenerator] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [tokenCount, setTokenCount] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [tokenMessage, setTokenMessage] = useState("");
  const [tokenMessageType, setTokenMessageType] = useState<"success" | "error" | "">("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      window.location.href = "/admin";
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage(data.message);
        setMessageType("success");
      } else {
        setMessage(data.message || "Errore durante la creazione dell'admin");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Errore nella creazione admin:", error);
      setMessage("Errore di connessione. Riprova più tardi.");
      setMessageType("error");
    }
  };

  const handleGenerateTokens = async (e: React.FormEvent) => {
    e.preventDefault();
    setTokenMessage("");
    setTokenMessageType("");

    try {
      const res = await fetch("/api/generate-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, tokenCount }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setTokenMessage(data.message);
        setTokenMessageType("success");
      } else {
        setTokenMessage(data.message || "Errore durante la generazione dei token");
        setTokenMessageType("error");
      }
    } catch (error) {
      console.error("Errore nella generazione dei token:", error);
      setTokenMessage("Errore di connessione. Riprova più tardi.");
      setTokenMessageType("error");
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>
        <button className="logout-minimal" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <nav className={`side-drawer ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => { setShowCreateAdmin(true); setShowTokenGenerator(false) }}>+ Crea Admin</li>
          <li onClick={() => { setShowTokenGenerator(true); setShowCreateAdmin(false) }}>+ Genera Token</li>
        </ul>
      </nav>

      <main className="admin-main">
        {showCreateAdmin && (
          <div className="form-container">
            <h2>Crea un nuovo Admin</h2>
            <form className="form" onSubmit={handleCreateAdmin}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="submit-button">
                Crea
              </button>
              {message && <p className={`message ${messageType}`}>{message}</p>}
            </form>
          </div>
        )}

        {showTokenGenerator && (
          <div className="form-container">
            <h2>Genera Token</h2>
            <form className="form" onSubmit={handleGenerateTokens}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Nome Classe"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Numero di Token"
                  value={tokenCount}
                  onChange={(e) => setTokenCount(Number(e.target.value))}
                  min="1"
                  className="input-field"
                />
              </div>
              <button type="submit" className="submit-button">
                Genera
              </button>
              {tokenMessage && <p className={`message ${tokenMessageType}`}>{tokenMessage}</p>}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
