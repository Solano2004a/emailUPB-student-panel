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
  //this one is for getting a request to show in request details
  const [currentRequest, setCurrentRequest] = useState({});

  useEffect(function () {
    async function fetchRequests() {
      try {
        const sentRes = await fetch(`${BASE_URL}/RequestsSent`);
        const sentData = await sentRes.json();

        const receivedRes = await fetch(`${BASE_URL}/requestsReceived`);
        const receivedData = await receivedRes.json();
        // console.log(data);
        setRequests(sentData);
        setReceived(receivedData);
        // console.log(received);
      } catch {
        alert("There was an error while trying to fetch the requests");
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
      alert("something went worng when trying to get the request details");
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
      alert("Something went wrong while trying to delete request");
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
      setRequests((old) => [...old, data]);
    } catch {
      alert("something went wrong while trying to create a new request");
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
