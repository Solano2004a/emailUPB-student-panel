import React, { useState, useMemo } from "react";
import { Icon, RotateCwIcon, Trash2 } from "lucide-react";

function Received({ received, onOpen }) {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [notice, setNotice] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  //for now, the delete requests are managed with this state
  const [requests, setRequests] = useState(received);

  // const sectionRequests = useMemo(
  //   () => received.filter((r) => r.section === activeSection),
  //   [received, activeSection],
  // );
  const visibleRequests = useMemo(() => {
    const list = received.filter(
      (r) => {
        switch (filter) {
          case "Todas":
            return true;
          case "Leídas":
            return r.read;
          case "No Leídas":
            return !r.read;
          default:
            return true;
        }
      },
      // (r) => filter === "Todas" || (filter === "Leídas" ? r.read : !r.read),
    );
    return list;
  }, [received, filter]);
  const toggleOne = (id) => {
    setSelected((old) =>
      old.includes(id) ? old.filter((i) => i != id) : [...old, id],
    );
    // visibleRequests.map((r) => r.id === id);
  };

  const allSelected =
    visibleRequests.length > 0 &&
    visibleRequests.every((r) => selected.includes(r.id));

  // const toggleAll = () => {
  //   allSelected
  //     ? setSelected([])
  //     : setSelected((old) => [
  //         ...new Set([...old, visibleRequests.map((r) => r.id)]),
  //       ]);
  // };

  const deleteSelected = () => {
    if (!selected.length) return;
    setRequests((old) => old.filter((r) => !selected.includes(r.id)));
    setSelected([]);
  };
  const refresh = () => {
    // Implement the fetch incoming requests here
  };
  const toggleAll = () => {
    allSelected
      ? setSelected([])
      : visibleRequests.map((r) =>
          setSelected((old) => (old.includes(r.id) ? old : [...old, r.id])),
        );
  };
  // const allSelected =
  //   visibleRequests.length > 0 &&
  //   visibleRequests.every((r) => selected.includes(r.id));
  // const deleteSelected = () => {
  //   if (!selected.length) {
  //     setNotice("Selecciona al menos una solicitud para eliminar.");
  //     return;
  //   }
  //   setRequests((old) => old.filter((r) => !selected.includes(r.id)));
  //   setSelected([]);
  //   setNotice("Solicitud(es) eliminada(s).");
  // };
  // const refresh = () => {
  //   setRefreshKey((n) => n + 1);
  //   setNotice("Bandeja actualizada.");
  // };

  return (
    <>
      <div className="emailupb-toolbar">
        <div className="emailupb-toolbar-left">
          <input
            aria-label="Seleccionar todas las solicitudes"
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
          />
          <button
            className="emailupb-icon-button"
            aria-label="Actualizar bandeja"
            title="Actualizar"
            onClick={refresh}
          >
            <RotateCwIcon name="refresh" size={16} />
          </button>
        </div>
        <div className="emailupb-toolbar-right">
          <label htmlFor="emailupb-filter">Filtrar por</label>
          <select
            id="emailupb-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Todas</option>
            <option>No leídas</option>
            <option>Leídas</option>
          </select>
          <button
            className="emailupb-icon-button emailupb-delete"
            aria-label="Eliminar seleccionadas"
            title="Eliminar seleccionadas"
            onClick={deleteSelected}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
      <div className="emailupb-table-wrap">
        <table className="emailupb-table">
          <colgroup>
            <col className="check-col" />
            <col className="subject-col" />
            <col className="description-col" />
            <col className="date-col" />
          </colgroup>
          {/* <thead>
            <tr>
              <th aria-label="Selección" />
              <th>Asunto: Dar materia de baja</th>
              <th>Descripción</th>
              <th>{activeSection === "Recibidos" ? "17 ago" : "Fecha"}</th>
            </tr>
          </thead> */}
          <tbody>
            {visibleRequests.map((request) => (
              <tr
                key={request.id}
                className={request.read ? "" : "unread"}
                onClick={onOpen}
              >
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Seleccionar solicitud ${request.id}`}
                    checked={selected.includes(request.id)}
                    onChange={() => toggleOne(request.id)}
                    // this prevents to end up to the top of the tr of the event bubble
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>

                <td className="emailupb-subject">{request.subject}</td>
                <td className="emailupb-description">{request.description}</td>
                <td className="emailupb-date">{request.date}</td>
              </tr>
            ))}
            {!visibleRequests.length && (
              <tr>
                <td colSpan="4" className="emailupb-empty">
                  No hay solicitudes para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Received;
