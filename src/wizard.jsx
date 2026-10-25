import React, { useState } from "react";
import { Upload } from "lucide-react";
function RequestModal({ open, onClose }) {
  const [type, setType] = useState("otro");
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <form
        className="modal"
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
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
              <select>
                <option>Seleccione un programa</option>
              </select>
            </label>
            <label>
              Materia
              <select>
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
                />
              </label>
            )}
            <label>
              Descripción
              <textarea placeholder="escribe algún comentario complementario" />
            </label>
            {type === "licencia" && (
              <label>
                Periodo de la licencia
                <input placeholder="Seleccionar periodo" />
              </label>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" onClick={() => {}}>
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
}

export { RequestModal };
