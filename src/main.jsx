import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { RecoverView, LoginView } from "./login/Login";
import { RequestsSent } from "./RequestsSent";
import {
  Grid2X2,
  KeyRound,
  LogOut,
  Mail,
  Send,
  Trash2,
  RotateCcw,
  ChevronDown,
  Upload,
} from "lucide-react";
import RequestDetail from "./RequestDetail";
import PasswordChange from "./PasswordChange";
import "./styles.css";
import { RequestModal } from "./wizard";
const initialRequests = [
  {
    id: 1,
    subject: "Asunto",
    description: "descripcion",
    date: "17 ago",
    status: "respondido",
  },
  {
    id: 2,
    subject: "Asunto",
    description: "descripcion",
    date: "24 sep",
    status: "respondido",
  },
  {
    id: 3,
    subject: "Asunto",
    description: "descripcion",
    date: "15 jun",
    status: "no respondido",
  },
  {
    id: 4,
    subject: "Asunto",
    description: "descripcion",
    date: "21 mar",
    status: "respondido",
  },
  {
    id: 5,
    subject: "Asunto",
    description: "descripcion",
    date: "20 mar",
    status: "no respondido",
  },
  {
    id: 6,
    subject: "Asunto",
    description: "descripcion",
    date: "12 feb",
    status: "respondido",
  },
  {
    id: 7,
    subject: "Asunto",
    description: "descripcion",
    date: "01 ene",
    status: "no respondido",
  },
  {
    id: 8,
    subject: "Asunto",
    description: "descripcion",
    date: "04/05/24",
    status: "respondido",
  },
  {
    id: 9,
    subject: "Asunto",
    description: "descripcion",
    date: "20/01/23",
    status: "no respondido",
  },
];
function Logo() {
  return (
    <div className="brand">
      <span className="brand-mark">◉</span>emailUPB
    </div>
  );
}
function Avatar() {
  return (
    <div className="avatar">
      <div className="avatar-head" />
      <div className="avatar-body" />
    </div>
  );
}
function Sidebar({ onRequest, onRequests, onPassword, onLogout }) {
  return (
    <aside className="sidebar">
      <Logo />
      <button className="request-btn" onClick={onRequest}>
        <Send size={14} />
        Solicitar
      </button>
      <nav>
        <button className="nav-item" onClick={onRequests}>
          <Mail size={16} />
          <span>
            Solicitudes
            <br />
            enviadas
          </span>
        </button>
        <button className="nav-item" onClick={onPassword}>
          <KeyRound size={16} />
          <span>
            Cambiar
            <br />
            contraseña
          </span>
        </button>
      </nav>
      <div className="sidebar-bottom">
        <button className="logout" onClick={onLogout}>
          <span>Cerrar Sesión</span>
          <LogOut size={13} />
        </button>
      </div>
    </aside>
  );
}

function Calendar({ value, onChange }) {
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button type="button">
          <ChevronLeft size={14} />
        </button>
        <strong>Sep</strong>
        <span>2025</span>
        <button type="button">
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="weekdays">
        {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="days">
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - 1;
          const valid = day >= 1 && day <= 30;
          const selected = day === 9;
          return (
            <button
              type="button"
              key={i}
              className={`${!valid ? "muted" : ""} ${selected ? "selected" : ""}`}
              onClick={() => valid && onChange(String(day))}
            >
              {valid ? day : ""}
            </button>
          );
        })}
      </div>
      <input
        className="calendar-value"
        value={value}
        readOnly
        placeholder="Selecciona un periodo"
      />
    </div>
  );
}
function App() {
  const [screen, setScreen] = useState("login");
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("todos");
  const [requests, setRequests] = useState(initialRequests);

  return (
    <>
      {screen === "login" && (
        <LoginView
          onForgot={() => setScreen("recover")}
          onLogin={() => setScreen("requestsSent")}
        />
      )}
      {screen === "recover" && (
        <RecoverView onBack={() => setScreen("login")} />
      )}
      {screen !== "login" && screen !== "recover" && (
        <div className="app">
          <Sidebar
            onRequest={() => setModal(true)}
            onRequests={() => setScreen("requestsSent")}
            onPassword={() => setScreen("password")}
            onLogout={() => setScreen("login")}
          />

          <main className="main-panel">
            <header className="topbar">
              <div>
                <div className="eyebrow">PANEL DE ESTUDIANTE</div>
                <h1>Bienvenido, Diego.</h1>
                <p>Solicita licencias o materias incompletas.</p>
              </div>
              <div className="profile">
                <div className="avatar">R</div>
                <div className="profile-meta">
                  <strong>Robert</strong>
                  <span>Estudiante</span>
                </div>
                {/* <ChevronDown size={16} /> */}
              </div>
            </header>
            {screen === "requestsSent" && (
              <RequestsSent
                onOpen={() => setScreen("detail")}
                requests={requests}
              />
            )}{" "}
            {screen === "detail" && (
              <RequestDetail onBack={() => setScreen("requestsSent")} />
            )}{" "}
            {screen === "password" && <PasswordChange />}
          </main>

          <RequestModal open={modal} onClose={() => setModal(false)} />
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
