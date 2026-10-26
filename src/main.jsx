import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { RecoverView, LoginView } from "./login/Login";
import { RequestsSent } from "./RequestsSent";
import emailUPBlogo from "./assets/emailUPBlogo.png";
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
  PencilLine,
} from "lucide-react";
import RequestDetail from "./RequestDetail";
import PasswordChange from "./PasswordChange";
import "./styles.css";
import { RequestModal } from "./wizard";
import Received from "./RequestsReceived";
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

const initialReceived = [
  {
    id: 1,
    subject: "Asunto",
    description: "descripcion",
    date: "17 ago",
    status: "respondido",
    read: false,
  },
  {
    id: 2,
    subject: "Asunto",
    description: "descripcion",
    date: "24 sep",
    status: "respondido",
    read: false,
  },
  {
    id: 3,
    subject: "Asunto",
    description: "descripcion",
    date: "15 jun",
    status: "respondido",
    read: false,
  },
  {
    id: 4,
    subject: "Asunto",
    description: "descripcion",
    date: "21 mar",
    status: "respondido",
    read: false,
  },
  {
    id: 5,
    subject: "Asunto",
    description: "descripcion",
    date: "20 mar",
    status: "respondido",
    read: false,
  },
  {
    id: 6,
    subject: "Asunto",
    description: "descripcion",
    date: "12 feb",
    status: "respondido",
    read: false,
  },
  {
    id: 7,
    subject: "Asunto",
    description: "descripcion",
    date: "01 ene",
    status: "respondido",
    read: false,
  },
  {
    id: 8,
    subject: "Asunto",
    description: "descripcion",
    date: "04/05/24",
    status: "respondido",
    read: false,
  },
  {
    id: 9,
    subject: "Asunto",
    description: "descripcion",
    date: "20/01/23",
    status: "respondido",
    read: false,
  },
];
function Logo() {
  return (
    <div className="brand">
      <img src={emailUPBlogo} alt="UPBlogo" width={34} height={32} />
      <span>
        <span className="brand-tiny">email</span>
        UPB
      </span>
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
function Sidebar({ onRequest, onReceived, onRequests, onPassword, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="top">
        <Logo />
        <button className="request-btn" onClick={onRequest}>
          <PencilLine size={18} />
          Solicitar
        </button>
      </div>
      <nav>
        <button className="nav-item" onClick={onReceived}>
          <Mail size={16} />
          <span>Recibidos</span>
        </button>
        <button className="nav-item" onClick={onRequests}>
          <Send size={16} />
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
  const [requests, setRequests] = useState(initialRequests);
  const [previousSection, setPreviousSection] = useState("");
  const [section, setSection] = useState("received");
  const [received, setReceived] = useState(initialReceived);

  //Received states

  return (
    <>
      {screen === "login" && (
        <LoginView
          onForgot={() => setScreen("recover")}
          onLogin={() => {
            (setScreen(""), setSection("received"));
          }}
        />
      )}
      {screen === "recover" && (
        <RecoverView onBack={() => setScreen("login")} />
      )}
      {screen !== "login" && screen !== "recover" && (
        <div className="app">
          <Sidebar
            onRequest={() => setModal(true)}
            onReceived={() => setSection("received")}
            onRequests={() => setSection("requestsSent")}
            onPassword={() => setSection("password")}
            onLogout={() => {
              (setScreen("login"), setSection(""));
            }}
          />

          <main className="main-panel">
            <header className="topbar">
              <div>
                <div className="eyebrow">PANEL DE ESTUDIANTE</div>
                <h1>Bienvenido, Diego.</h1>
                <p>Solicita licencias o materias incompletas.</p>
              </div>
              <div className="profile">
                <div className="avatar">D</div>
                <div className="profile-meta">
                  <strong>Diego</strong>
                  <span>Estudiante</span>
                </div>
                {/* <ChevronDown size={16} /> */}
              </div>
            </header>
            {section === "received" && (
              <Received
                received={received}
                setReceived={setReceived}
                onOpen={() => {
                  setSection("detail");
                  setPreviousSection("received");
                }}
              />
            )}
            {section === "requestsSent" && (
              <RequestsSent
                onOpen={() => {
                  setSection("detail");
                  setPreviousSection("requestsSent");
                }}
                requests={requests}
              />
            )}{" "}
            {section === "detail" && (
              <RequestDetail
                onBack={() => {
                  setSection(previousSection);
                  setPreviousSection("");
                }}
              />
            )}{" "}
            {section === "password" && <PasswordChange />}
          </main>

          <RequestModal open={modal} onClose={() => setModal(false)} />
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
