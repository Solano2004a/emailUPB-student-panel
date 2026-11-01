import React, { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useRequests } from "./contexts/RequestContext";

//TODO:implement the request and display that request to the requests list
export default function RequestDetail({ selectedRequestId, onBack }) {
  const { getRequestById } = useRequests();
  const [request, setRequest] = useState({});
  useEffect(() => {
    async function fetchRequest() {
      const data = await getRequestById(selectedRequestId);
      setRequest(data);
    }

    fetchRequest();
  }, [selectedRequestId, getRequestById]);
  // const request = getRequestById(selectedRequestId);
  return (
    <section className="detail-page">
      <div className="detail-title">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2>Solicitud de licencia</h2>
          <p>{`${request.program} - ${request.module}`}</p>
          {/* <p>Nombre de programa - Nombre del modulo</p> */}
        </div>
      </div>
      <div className="detail-info">
        <strong>correoeestudiante@upb.edu</strong>
        <strong>código estudiantil: 55555</strong>
      </div>
      <div className="detail-section">
        <span>{`Motivo de la licencia: ${request.subject}`}</span>
        <div className="description-box">
          <span>{request.description}</span>
        </div>
      </div>
      <div className="detail-section">
        <span>Periodo de la licencia</span>
        <strong>
          {`Inicio: ${request.requestStart}`}&nbsp;&nbsp; - &nbsp;&nbsp;
          {`fin: ${request.requestEnd}`}
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
