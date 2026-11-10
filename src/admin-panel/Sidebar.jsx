import { Icon } from "./ui.jsx";
import React from "react";
import style from "./AdminPanel.module.css";

const ITEMS = [
  ["received", "mail", "Bandeja de Entrada"],
  ["all", "file", "Registro de Solicitudes"],
  ["password", "key", "Cambiar contraseña"],
  ["programs", "book", "Programas creados"],
];

export default function Sidebar({ section, onChange, onLogout }) {
  return (
    <aside className={style["side"]}>
      <div className={style["brand"]}>
        <span className={style["logo"]}>
          <Icon n="logo" size={26} />
        </span>
        emailUPB
      </div>

      <nav className={style["nav"]}>
        {ITEMS.map(([id, icon, label]) => (
          <button
            key={id}
            className={section === id ? style["on"] : ""}
            onClick={() => onChange(id)}
          >
            <Icon n={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button className={style["logout"]} onClick={onLogout}>
        Cerrar Sesión
        <Icon n="logout" size={18} />
      </button>

      <div className={style["ver"]}>ADMIN · 1.0</div>
    </aside>
  );
}
