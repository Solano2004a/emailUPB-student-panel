import React, { useState } from "react";

export default function PasswordChange() {
  const [current, setCurrent] = useState(""),
    [next, setNext] = useState(""),
    [repeat, setRepeat] = useState("");
  const save = (e) => {
    e.preventDefault();
    if (next !== repeat) return alert("Las nuevas contraseñas no coinciden.");
    alert("Cambios guardados.");
  };
  return (
    <section className="password-page">
      <h2>Contraseña</h2>
      <div className="password-divider" />
      <form className="password-form" onSubmit={save}>
        <h3>Cambio de contraseña</h3>
        <label>
          <span>Código</span>
          <input value="55555" readOnly />
        </label>
        <label>
          <span>Nombre Completo</span>
          <input value="DIEGO SOLANO TERAN" readOnly />
        </label>
        <label>
          <span>Contraseña actual</span>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </label>
        <label>
          <span>Contraseña nueva</span>
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </label>
        <label>
          <span>Repetir contraseña nueva</span>
          <input
            type="password"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          />
        </label>
        <button className="save-password">Guardar cambios</button>
      </form>
    </section>
  );
}
