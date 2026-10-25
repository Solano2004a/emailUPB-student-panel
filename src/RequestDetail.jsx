import React from "react";
import { ArrowLeft, FileText } from "lucide-react";

//TODO:implement the request and display that request to the requests list
export default function RequestDetail({ onBack }) {
  return (
    <section className="detail-page">
      <div className="detail-title">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2>Solicitud de licencia</h2>
          <p>Nombre de programa - Nombre del modulo</p>
        </div>
      </div>
      <div className="detail-info">
        <strong>correoeestudiante@upb.edu</strong>
        <strong>código estudiantil: 55555</strong>
      </div>
      <div className="detail-section">
        <span>Motivo de la licencia</span>
        <div className="description-box">
          <span>Descripción</span>
        </div>
      </div>
      <div className="detail-section">
        <span>Periodo de la licencia</span>
        <strong>
          Inicio: 09/09/25&nbsp;&nbsp; - &nbsp;&nbsp;fin: 13/09/25
        </strong>
      </div>
      <div className="detail-section">
        <span>Archivos adjuntos</span>
        <div className="attachment-list">
          <div className="file-card">
            <FileText size={37} strokeWidth={1.2} />
          </div>
          <div className="file-card">
            <FileText size={37} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
