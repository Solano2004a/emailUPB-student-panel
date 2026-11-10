import React, { useMemo, useState } from "react";
import { Icon, Avatar } from "./ui.jsx";
import style from "./AdminPanel.module.css";

export default function Received({ requests, setRequests, onOpen }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState([]);

  const stats = useMemo(
    () => ({
      total: requests.length,
      answered: requests.filter((r) => r.status === "answered").length,
      pending: requests.filter((r) => r.status === "pending").length,
    }),
    [requests],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter(
      (r) =>
        (filter === "all" || r.status === filter) &&
        `${r.student} ${r.type} ${r.desc}`.toLowerCase().includes(q),
    );
  }, [requests, query, filter]);

  const allChecked =
    visible.length > 0 && visible.every((r) => selected.includes(r.id));

  const toggle = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );

  const toggleAll = () =>
    setSelected(allChecked ? [] : visible.map((r) => r.id));

  const removeSelected = () => {
    setRequests((rs) => rs.filter((r) => !selected.includes(r.id)));
    setSelected([]);
  };

  return (
    <>
      <div className={style["sec-head"]}>
        <div>
          <h2>Registro de solicitudes</h2>
          <p className={style["muted"]}>
            Consulta, filtra y administra las solicitudes recibidas.
          </p>
        </div>
      </div>

      <div className={style["stats"]}>
        <div className={style["stat"]}>
          <b>{stats.total}</b>
          <span>Recibidos en total</span>
        </div>

        <div className={style["stat"]}>
          <b>{stats.answered}</b>
          <span>Respondidas</span>
        </div>

        <div className={style["stat"]}>
          <b>{stats.pending}</b>
          <span>Pendientes</span>
        </div>
      </div>

      <div className={style["card"]}>
        <div className={style["toolbar"]}>
          <label className={style["search"]}>
            <Icon n="search" size={18} />
            <input
              placeholder="Buscar solicitudes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <span className={style["grow"]} />
          <span className={style["muted"]}>Filtrar por</span>

          <select
            className={style["select"]}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas las solicitudes</option>
            <option value="pending">Pendientes</option>
            <option value="answered">Respondidas</option>
          </select>

          <button
            className={style["icon-btn"]}
            onClick={removeSelected}
            disabled={!selected.length}
            aria-label="Eliminar seleccionadas"
          >
            <Icon n="trash" />
          </button>
        </div>

        <div className={`${style["tr"]} ${style["th"]} ${style["r4"]}`}>
          <input
            type="checkbox"
            className={style["cb"]}
            checked={allChecked}
            onChange={toggleAll}
          />
          <span>ESTUDIANTE</span>
          <span>ASUNTO / DESCRIPCIÓN</span>
          <span>FECHA</span>
        </div>

        {visible.map((r) => (
          <div
            key={r.id}
            className={`${style["tr"]} ${style["r4"]}`}
            onClick={() => onOpen(r)}
          >
            <input
              type="checkbox"
              className={style["cb"]}
              checked={selected.includes(r.id)}
              onClick={(e) => e.stopPropagation()}
              onChange={() => toggle(r.id)}
            />

            <span className={style["who"]}>
              <Avatar name={r.student} />
              {r.student}
            </span>

            <span className={style["ellipsis"]}>
              {r.type} - {r.desc}
            </span>

            <span className={style["date"]}>{r.date}</span>
          </div>
        ))}

        {!visible.length && (
          <div className={style["empty"]}>
            No hay solicitudes que coincidan.
          </div>
        )}
      </div>
    </>
  );
}
