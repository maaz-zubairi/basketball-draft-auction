import React, { useState, useEffect } from "react";
import "../styles/LogPage.css";

const LogPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch("/api/logs");
      const data = await response.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div className="log-container">
      <h1>Auction Log</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogPage;
