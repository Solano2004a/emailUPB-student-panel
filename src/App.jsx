import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { RecoverView, LoginView } from "./login/Login";
import StudentPanel from "./student-panel/StudentPanel";

import "./styles.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  replace,
} from "react-router-dom";
import { RequestProvider } from "./contexts/RequestContext";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  return (
    <RequestProvider>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/student-panel" />
            ) : (
              <LoginView
                onForgot={() => navigate("/recover", { replace: true })}
                onLogin={() => setIsAuthenticated(true)}
              />
            )
          }
        />

        <Route
          path="/recover"
          element={
            <RecoverView onBack={() => navigate("/login", { replace: true })} />
          }
        />
        <Route
          path="/student-panel"
          element={
            isAuthenticated ? (
              <StudentPanel
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </RequestProvider>
  );
}

export default App;
