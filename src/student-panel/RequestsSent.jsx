import React, { useMemo } from "react";
import { Search, ChevronDown, Trash2 } from "lucide-react";
// import "../styles.css";
import styles from "./StudentPanel.module.css";
import { useRequests } from "../contexts/RequestContext";

function RequestsSent({ onOpen }) {
  const { requests, getRequestById } = useRequests();
  function formatRequestDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);
    const currentYear = new Date().getFullYear();

    if (year === currentYear) {
      return new Intl.DateTimeFormat("es-BO", {
        day: "2-digit",
        month: "short",
      })
        .format(date)
        .replace("-", " ");
    }

    return dateString
      .split("-")
      .reverse()
      .map((v, i) => (i == 2 ? v.slice(-2) : v))
      .join("/");
  }
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
              <td className={styles["request-date"]}>
                {formatRequestDate(r.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { RequestsSent };
