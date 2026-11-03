import React, { useMemo } from "react";
import { Search, ChevronDown, Trash2 } from "lucide-react";
// import "../styles.css";
import styles from "./StudentPanel.module.css";
import { useRequests } from "../contexts/RequestContext";

function RequestsSent({ onOpen }) {
  const { requests, getRequestById } = useRequests();
  return (
    <div className={styles["requests-sent"]}>
      <h2>Solicitudes enviadas</h2>
      <table className={styles["requests-table"]}>
        <tbody>
          {requests.map((r) => (
            <tr
              key={r.id}
              className={styles["request-row"]}
              onClick={() => onOpen(r.id)}
            >
              <th className={styles["request-subject"]}> {r.subject}</th>
              <td className={styles["request-description"]}>{r.description}</td>
              <td className={styles["request-date"]}>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { RequestsSent };
