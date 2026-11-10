import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";
const RequestsContext = createContext();
function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [received, setReceived] = useState([]);
  const [students, setStudents] = useState([]);
  //this one is for getting a request to show in request details
  const [currentRequest, setCurrentRequest] = useState({});

  useEffect(function () {
    async function fetchRequests() {
      try {
        const sentRes = await fetch(`${BASE_URL}/RequestsSent`);
        const sentData = await sentRes.json();

        const receivedRes = await fetch(`${BASE_URL}/requestsReceived`);
        const receivedData = await receivedRes.json();

        const studentsRes = await fetch(`${BASE_URL}/students`);
        const studentsData = await studentsRes.json();
        console.log(studentsData);
        setRequests(sentData.reverse());
        setReceived(receivedData);
        setStudents(studentsData);
        // console.log(received);
      } catch {
        alert("Hubo un error al intentar obtener las solicitudes");
      }
    }

    // async function fetchRequestsReceived() {}

    fetchRequests();
  }, []);

  const getRequestById = useCallback(async function getRequestById(id) {
    try {
      const res = await fetch(`${BASE_URL}/RequestsSent/${id}`);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch {
      alert("sHubo un error al intentar obtener los detalles de la solicitud");
    }
  }, []);
  const getStudentById = useCallback(async function getStudentById(id) {
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch {
      alert("sHubo un error al intentar obtener los detalles del estudiante");
    }
  }, []);

  //probably usefull later on...
  // const getReceivedById = useCallback(async function (id) {
  //   try {
  //     const res = await fetch(`${BASE_URL}/requestsReceived/${id}`);
  //     const data = await res.json();
  //     // console.log(data);
  //     return data;
  //   } catch {
  //     alert("something went worng when trying to get the request details");
  //   }
  // }, []);
  async function deleteReceived(id) {
    try {
      await fetch(`${BASE_URL}/requestsReceived/${id}`, { method: "DELETE" });
      setReceived((received) => received.filter((r) => r.id !== id));
    } catch {
      alert("Hubo un error al intentar eliminar la solicitud");
    }
  }

  async function createRequest(request) {
    try {
      const res = await fetch(`${BASE_URL}/RequestsSent`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setRequests((old) => [data, ...old]);
      console.log(requests);
    } catch {
      alert("Hubo un error al intentar crear la solicitud");
    }
  }

  return (
    <RequestsContext.Provider
      value={{
        requests,
        received,
        deleteReceived,
        createRequest,
        getRequestById,
        students,
        getStudentById,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
}

function useRequests() {
  const context = useContext(RequestsContext);
  if (!context)
    throw new Error(
      "requests context was attempt to be used ouside RequestProvider",
    );
  return context;
}

export { RequestProvider, useRequests };
