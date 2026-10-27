import React, { useState } from "react";
import { Upload } from "lucide-react";
function RequestModal({ open, onClose }) {
  const [type, setType] = useState("otro");
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const [requestStart, setRequestStart] = useState(date);
  const [requestEnd, setRequestEnd] = useState(date);
  const [program, setProgram] = useState("");
  const [module, setModule] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const newRequest = {
      id: 1,
      subject,
      description,
      program,
      module,
      date,
      requestStart,
      requestEnd,
    };
    console.log(newRequest);

    onClose();
  }

  // console.log(`program: ${program} *********** description: ${description}`);
  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <div className="modal-titlebar">
          <h2>Formulario de Solicitud del Estudiante</h2>
        </div>
        <div className="modal-content">
          <div className="form-left">
            <label>
              Correo
              <input value="diegosolano@upb.edu" readOnly />
            </label>
            <label>
              Programa académico
              <select onChange={(e) => setProgram(e.target.value)}>
                <option>Seleccione un programa</option>
              </select>
            </label>
            <label>
              Materia
              <select onChange={(e) => setModule(e.target.value)}>
                <option>Seleccione una materia</option>
              </select>
            </label>
            <label>
              Tipo de solicitud
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="otro">otro</option>
                <option value="licencia">licencia</option>
                <option value="baja">dar de baja la materia</option>
              </select>
            </label>
            {type === "licencia" && (
              <label>
                Documentación de respaldo
                <div className="upload-box">
                  <Upload size={24} />
                  <input type="file" accept=".jpg,.jpeg,.pdf" />
                </div>
              </label>
            )}
          </div>
          <div className="form-right">
            {type !== "baja" && (
              <label>
                Asunto
                <input
                  placeholder={
                    type === "licencia"
                      ? "especifique el motivo de la licencia"
                      : "especifique el motivo de su solicitud"
                  }
                  onChange={(e) => setSubject(e.target.value)}
                />
              </label>
            )}
            <label>
              Descripción
              <textarea
                placeholder="escribe algún comentario complementario"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            {type === "licencia" && (
              <label>
                Periodo de la licencia
                <div className="date-row">
                  <div>
                    <span>Fecha de inicio</span>
                    <input
                      type="date"
                      value={requestStart}
                      min={date}
                      // disabled={!!existingCourse}
                      onChange={(e) => setRequestStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>Fecha de finalización</span>
                    <input
                      type="date"
                      value={requestEnd}
                      min={date}
                      // disabled={!!existingCourse}
                      onChange={(e) => setRequestEnd(e.target.value)}
                    />
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit">Enviar Solicitud</button>
        </div>
      </form>
    </div>
  );
}

export { RequestModal };
