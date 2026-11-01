import React, { useMemo } from "react";
import { Search, ChevronDown, Trash2 } from "lucide-react";
import "./styles.css";
import { useRequests } from "./contexts/RequestContext";

function RequestsSent({ onOpen }) {
  // todo: implement a new request list logic here, because it is obvious that every request belongs to the user, so the way requests sent and request replied from admin are displayed must be though deep
  const { requests, getRequestById } = useRequests();
  return (
    <div className="requests-sent">
      <h2>Solicitudes enviadas</h2>
      <table className="requests-table">
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="request-row" onClick={() => onOpen(r.id)}>
              <th className="request-subject"> {r.subject}</th>
              <td className="request-description">{r.description}</td>
              <td className="request-date">{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { RequestsSent };
