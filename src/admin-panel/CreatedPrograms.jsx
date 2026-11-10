import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "./ui.jsx";
import ProgramWizard from "./ProgramWizard.jsx";
import StudentsModal from "./StudentsModal.jsx";
import style from "./AdminPanel.module.css";

export default function CreatedPrograms({ programs, setPrograms }) {
  const [sel, setSel] = useState([]);
  const [open, setOpen] = useState({});
  const [menu, setMenu] = useState(null);
  const [wizard, setWizard] = useState(false);
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const close = () => setMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const current = useMemo(() => {
    if (!viewing) return null;
    const p = programs.find((x) => x.id === viewing.pid);
    const m = p?.modules.find((x) => x.id === viewing.mid);
    return p && m ? { p, m } : null;
  }, [viewing, programs]);

  const allSel = programs.length > 0 && sel.length === programs.length;
  const toggleSel = (id) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const removeSelected = () => {
    setPrograms((ps) => ps.filter((p) => !sel.includes(p.id)));
    setSel([]);
  };

  const patchModule = (pid, mid, fn) =>
    setPrograms((ps) =>
      ps.map((p) =>
        p.id !== pid
          ? p
          : {
              ...p,
              modules: fn(p.modules).filter(Boolean),
            },
      ),
    );

  const removeModule = (pid, mid) =>
    patchModule(pid, mid, (ms) => ms.filter((m) => m.id !== mid));

  const setStudents = (pid, mid, students) =>
    patchModule(pid, mid, (ms) =>
      ms.map((m) => (m.id === mid ? { ...m, students } : m)),
    );

  const saveWizard = (d) => {
    const name = (d.existing || d.program).trim();
    const mod = {
      id: Date.now(),
      name: d.course.trim(),
      start: d.start,
      end: d.end,
      students: d.students,
    };

    setPrograms((ps) => {
      const found = ps.find((p) => p.name.toLowerCase() === name.toLowerCase());
      return found
        ? ps.map((p) =>
            p === found ? { ...p, modules: [...p.modules, mod] } : p,
          )
        : [...ps, { id: Date.now() + 1, name, modules: [mod] }];
    });

    setWizard(false);
  };

  return (
    <>
      <div className={style["sec-head"]}>
        <div>
          <h2>Programas</h2>
        </div>

        <button className={style.btn} onClick={() => setWizard(true)}>
          <Icon n="plus" size={16} />
          Crear Programa o modulo
        </button>
      </div>

      <div className={style.card}>
        <div className={`${style.prow} ${style.head}`}>
          <input
            type="checkbox"
            className={style.cb}
            checked={allSel}
            onChange={() => setSel(allSel ? [] : programs.map((p) => p.id))}
          />

          <span className={style.grow} />

          <button
            className={style["icon-btn"]}
            onClick={removeSelected}
            disabled={!sel.length}
            aria-label="Eliminar programas"
          >
            <Icon n="trash" />
          </button>
        </div>

        {programs.map((p) => (
          <div key={p.id}>
            <div className={style.prow}>
              <input
                type="checkbox"
                className={style.cb}
                checked={sel.includes(p.id)}
                onChange={() => toggleSel(p.id)}
              />

              <b className={style.grow}>{p.name}</b>

              <button
                className={style["icon-btn"]}
                onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
                aria-label="Expandir"
              >
                <Icon n={open[p.id] ? "up" : "down"} size={16} />
              </button>
            </div>

            {open[p.id] &&
              p.modules.map((m) => (
                <div key={m.id} className={`${style.prow} ${style.sub}`}>
                  <span className={`${style.grow} ${style.muted}`}>
                    {m.name}
                  </span>

                  <div className={style.rel}>
                    <button
                      className={style["icon-btn"]}
                      aria-label="Opciones"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenu(menu === m.id ? null : m.id);
                      }}
                    >
                      <Icon n="dots" size={18} />
                    </button>

                    {menu === m.id && (
                      <div className={style.menu}>
                        <button
                          onClick={() => setViewing({ pid: p.id, mid: m.id })}
                        >
                          Ver estudiantes
                        </button>

                        <button onClick={() => removeModule(p.id, m.id)}>
                          Eliminar módulo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}

        {!programs.length && (
          <div className={style.empty}>Aún no hay programas creados.</div>
        )}
      </div>

      {wizard && (
        <ProgramWizard
          programs={programs}
          onClose={() => setWizard(false)}
          onSave={saveWizard}
        />
      )}

      {current && (
        <StudentsModal
          program={current.p}
          module={current.m}
          onClose={() => setViewing(null)}
          onChange={(list) => setStudents(current.p.id, current.m.id, list)}
        />
      )}
    </>
  );
}
