"use client";

import React, { useState } from "react";
import { Button, Stack } from '@mui/material';
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
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState<true | false>(true);
  const [questionMessage, setQuestionMessage] = useState("");
  const [questionMessageType, setQuestionMessageType] = useState<"success" | "error" | "">("");
  const [showViewQuestions, setShowViewQuestions] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState<boolean>(true);
  type Question = {
    domanda: string;
    soluzione: boolean;
    id: number;
  };
  const [questions, setQuestions] = useState<
  { id: number; domanda: string; soluzione: boolean }[]
>([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleEditChange = (index: number, field: "domanda" | "soluzione", value: any) => {
  const updatedQuestions = [...questions];
  updatedQuestions[index] = {
    ...updatedQuestions[index],
    [field]: value,
  };
  setQuestions(updatedQuestions);
};

const handleDelete = async (id: number) => {
  if (!confirm("Sei sicuro di voler eliminare questa domanda?")) return;
  try {
    const res = await fetch("/api/delete-question", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setQuestions(questions.filter((q) => q.id !== id));
    } else {
      alert(data.message || "Errore durante l'eliminazione");
    }
  } catch (error) {
    console.error("Errore nella cancellazione:", error);
  }
};

const handleUpdate = async (id: number, index: number) => {
  const q = questions[index];
  try {
    const res = await fetch("/api/update-question", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        domanda: q.domanda,
        soluzione: q.soluzione,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.message || "Errore durante l'aggiornamento");
    }
  } catch (error) {
    console.error("Errore nella modifica:", error);
  }
};

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      window.location.href = "/admin";
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  };
  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionMessage("");
    setQuestionMessageType("");

    try {
      const res = await fetch("/api/create-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, answer: questionAnswer }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setQuestionMessage(data.message);
        setQuestionMessageType("success");
        setQuestionText("");
      } else {
        setQuestionMessage(data.message || "Errore durante la creazione della domanda");
        setQuestionMessageType("error");
      }
    } catch (error) {
      console.error("Errore nella creazione della domanda:", error);
      setQuestionMessage("Errore di connessione. Riprova più tardi.");
      setQuestionMessageType("error");
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

      let data = { message: "Errore sconosciuto", tokens: [] }; // Aggiungi un array di token vuoto
      if (res.headers.get("Content-Type")?.includes("application/json")) {
        data = await res.json();
      }

      if (res.status === 200) {
        setTokenMessage(data.message);
        setTokenMessageType("success");
        setGeneratedTokens(data.tokens); // Aggiorna i token generati
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
  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/get-questions");
      const data = await res.json();
      if (res.status === 200) {
        setQuestions(data.questions || []);
      } else {
        console.error("Errore nel recupero delle domande:", data.message);
      }
    } catch (error) {
      console.error("Errore nel recupero delle domande:", error);
    }
  };
  const handleUpdateQuestion = async (id: number) => {
    try {
      const res = await fetch("/api/update-question", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, domanda: editedQuestion, soluzione: editedAnswer }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingIndex(null);
        fetchQuestions();
      } else {
        console.error(data.message || "Errore durante la modifica");
      }
    } catch (error) {
      console.error("Errore durante la modifica:", error);
    }
  };
  const handleDeleteQuestion = async (id: number) => {
    try {
      const res = await fetch(`/api/delete-question?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        fetchQuestions(); // ricarica
      } else {
        console.error(data.message || "Errore durante l'eliminazione");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
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
          <li onClick={() => { setShowCreateAdmin(true); setShowTokenGenerator(false); setShowQuestionForm(false); setShowViewQuestions(false); }}>+ Crea Admin</li>
          <li onClick={() => { setShowTokenGenerator(true); setShowCreateAdmin(false); setShowQuestionForm(false); setShowViewQuestions(false); }}>+ Genera Token</li>
          <li onClick={() => { setShowQuestionForm(true); setShowCreateAdmin(false); setShowTokenGenerator(false); setShowViewQuestions(false); }}>+ Aggiungi Domanda</li>
          <li onClick={() => {
            setShowViewQuestions(true);
            setShowQuestionForm(false)
            setShowCreateAdmin(false);
            setShowTokenGenerator(false);
            fetchQuestions();
          }}>+ Visualizza Domande</li>
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
              {generatedTokens.length > 0 && (
                <div className="generated-tokens">
                  <h3>Token generati:</h3>
                  <ul>
                    {generatedTokens.map((token, idx) => (
                      <li key={idx}>{token}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        )}
        {showQuestionForm && (
          <div className="form-container">
            <h2>Aggiungi una Fake News</h2>
            <form className="form" onSubmit={handleCreateQuestion}>
              <div className="input-group">
                <textarea
                  placeholder="Scrivi la domanda"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  className="input-field resizable-textarea"
                />
              </div>
              <div className="input-group">
                <select
                  value={questionAnswer}
                  onChange={(e) => setQuestionAnswer(e.target.value as "vero" | "falso")}
                  className="input-field"
                >
                  <option value="vero">Vero</option>
                  <option value="falso">Falso</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Aggiungi</button>
              {questionMessage && <p className={`message ${questionMessageType}`}>{questionMessage}</p>}
            </form>
          </div>
        )}
        {showViewQuestions && (
          <div className="form-container">
            <h2>Domande inserite</h2>
            {questions.length === 0 ? (
              <p>Nessuna domanda trovata.</p>
            ) : (
              <ul className="question-list">
                {questions.map((q, idx) => (
                  <li key={idx}>
                    <strong>Domanda:</strong>{" "}
                    <textarea
                      value={q.domanda}
                      onChange={(e) => handleEditChange(idx, "domanda", e.target.value)}
                      className="editable-input"
                    />{" "}
                    <br />
                    <strong>Risposta:</strong>{" "} 
                    <select
                      value={q.soluzione ? "true" : "false"}
                      onChange={(e) =>
                        handleEditChange(idx, "soluzione", e.target.value === "true")
                      }
                      className="editable-select"
                    >
                      <option value="true" style={{backgroundColor:"black"}}>Vero</option>
                      <option value="false" style={{backgroundColor:"black"}}>Falso</option>
                    </select>{" "}
                    <br />
                    <button className="save-button" onClick={() => handleUpdate(q.id, idx)}>Salva</button>
                    <button className="delete-button" onClick={() => handleDelete(q.id)}>Elimina</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}


      </main>
    </div>
  );
}
