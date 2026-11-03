import React, { createContext, useState } from "react";

import Received from "./RequestsReceived";
import { RequestsSent } from "./RequestsSent";
import RequestDetail from "../RequestDetail";
import PasswordChange from "../PasswordChange";
import { RequestModal } from "./wizard";
import emailUPBlogo from "../assets/emailUPBlogo.png";

import { PencilLine, Mail, Send, KeyRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import "../styles.css";
import styles from "./StudentPanel.module.css";

function Logo() {
  return (
    <div className={styles["brand"]}>
      <img src={emailUPBlogo} alt="UPBlogo" width={34} height={32} />
      <span>
        <span className={styles["brand-tiny"]}>email</span>
        UPB
      </span>
    </div>
  );
}

function Sidebar({ onRequest, onReceived, onRequests, onPassword, onLogout }) {
  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["top"]}>
        <Logo />
        <button className={styles["request-btn"]} onClick={onRequest}>
          <PencilLine size={18} />
          Solicitar
        </button>
      </div>
      <nav>
        <button className={styles["nav-item"]} onClick={onReceived}>
          <Mail size={16} />
          <span>Recibidos</span>
        </button>
        <button className={styles["nav-item"]} onClick={onRequests}>
          <Send size={16} />
          <span>
            Solicitudes
            <br />
            enviadas
          </span>
        </button>
        <button className={styles["nav-item"]} onClick={onPassword}>
          <KeyRound size={16} />
          <span>
            Cambiar
            <br />
            contraseña
          </span>
        </button>
      </nav>
      <div className={styles["sidebar-bottom"]}>
        <button className={styles["logout"]} onClick={onLogout}>
          <span>Cerrar Sesión</span>
          <LogOut size={13} />
        </button>
      </div>
    </aside>
  );
}
//UseCOntext step 1: Create a context
// const PostContext = createContext();
function StudentPanel({ isAuthenticated, setIsAuthenticated }) {
  const [modal, setModal] = useState(false);
  // const [requests, setRequests] = useState(initialRequests);
  const [previousSection, setPreviousSection] = useState("");
  const [section, setSection] = useState("received");
  // const [received, setReceived] = useState(initialReceived);

  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const navigate = useNavigate();
  return (
    //useCOntext step 2: Provide value to child components
    // <PostContext.Provider
    //   value={{
    //     received,
    //     setReceived,
    //   }}
    // >
    <div className="app">
      <Sidebar
        onRequest={() => setModal(true)}
        onReceived={() => setSection("received")}
        onRequests={() => setSection("requestsSent")}
        onPassword={() => setSection("password")}
        onLogout={() => {
          (setIsAuthenticated(false), setSection(""), navigate("/login"));
        }}
      />

      <main className={styles["main-panel"]}>
        <header className={styles["topbar"]}>
          <div>
            <div className={styles["eyebrow"]}>PANEL DE ESTUDIANTE</div>
            <h1>Bienvenido, Diego.</h1>
            <p>Solicita licencias o materias incompletas.</p>
          </div>
          <div className={styles["profile"]}>
            <div className={styles["avatar"]}>D</div>
            <div className={styles["profile-meta"]}>
              <strong>Diego</strong>
              <span>Estudiante</span>
            </div>
          </div>
        </header>
        {section === "received" && (
          <Received
            onOpen={(id) => {
              setSelectedRequestId(id);
              setSection("detail");
              setPreviousSection("received");
            }}
          />
        )}
        {section === "requestsSent" && (
          <RequestsSent
            onOpen={(id) => {
              setSelectedRequestId(id);
              setSection("detail");
              setPreviousSection("requestsSent");
            }}
          />
        )}{" "}
        {section === "detail" && (
          <RequestDetail
            selectedRequestId={selectedRequestId}
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
    // </PostContext.Provider>
  );
}
export default StudentPanel;
