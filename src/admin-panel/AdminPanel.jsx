import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Received from "./Received.jsx";
import AllRequests from "./AllRequests.jsx";
import ChangePassword from "./ChangePassword.jsx";
import CreatedPrograms from "./CreatedPrograms.jsx";
import RequestDetails from "./RequestDetails.jsx";
import { initialRequests, initialPrograms } from "./data.js";
import style from "./AdminPanel.module.css";

export default function AdminPanel({ setCode }) {
  const [section, setSection] = useState("received");
  const [requests, setRequests] = useState(initialRequests);
  const [programs, setPrograms] = useState(initialPrograms);
  const [detail, setDetail] = useState(null);

  const markAnswered = (id) => {
    setRequests((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: "answered" } : r)),
    );
    setDetail(null);
  };

  return (
    <div className={style["app"]}>
      <Sidebar
        section={section}
        onChange={setSection}
        onLogout={() => setCode("")}
      />

      <main className={style["main"]}>
        <header className={style["top"]}>
          <div>
            <div className={style["eyebrow"]}>Panel de administración</div>
            <h1>Bienvenido, Robert.</h1>
            <p className={style["muted"]}>
              Gestiona las solicitudes y los programas académicos.
            </p>
          </div>

          <div className={style["chip"]}>
            <span className={style["av-lg"]}>R</span>
            <div>
              <b>Robert</b>
              <div className={`${style["muted"]} ${style["small"]}`}>
                Administrador
              </div>
            </div>
          </div>
        </header>

        <div className={style["content"]}>
          {section === "received" && (
            <Received
              requests={requests}
              setRequests={setRequests}
              onOpen={setDetail}
            />
          )}

          {section === "all" && (
            <AllRequests
              requests={requests}
              programs={programs}
              onOpen={setDetail}
            />
          )}

          {section === "password" && <ChangePassword />}

          {section === "programs" && (
            <CreatedPrograms programs={programs} setPrograms={setPrograms} />
          )}
        </div>
      </main>

      {detail && (
        <RequestDetails
          request={detail}
          onClose={() => setDetail(null)}
          onReply={markAnswered}
        />
      )}
    </div>
  );
}
