import React, { useState, useEffect } from "react";
import "../styles/DraftMaster.css";

const DraftMaster = () => {
  const [players, setPlayers] = useState([]);
  const [captains, setCaptains] = useState([]);
  const [playerAssignments, setPlayerAssignments] = useState({}); // Track selected captain per player

  const fetchData = async () => {
    try {
      const playerResponse = await fetch("http://localhost:5000/api/players?auctioned=false");
      const playerData = await playerResponse.json();
      setPlayers(playerData);

      const captainResponse = await fetch("http://localhost:5000/api/captains");
      const captainData = await captainResponse.json();
      setCaptains(captainData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const assignPlayer = async (playerId, captainId) => {
    if (!captainId) {
      alert("Please select a captain before assigning a player.");
      return;
    }
    try {
      await fetch(`http://localhost:5000/api/players/${playerId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captainId }),
      });
      fetchData(); // Refresh data after assignment
    } catch (error) {
      console.error("Error assigning player:", error);
    }
  };

  const removePlayer = async (playerId) => {
    try {
      await fetch(`http://localhost:5000/api/players/${playerId}`, { method: "DELETE" });
      fetchData(); // Refresh data after removal
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  const handleSelectCaptain = (playerId, captainId) => {
    setPlayerAssignments((prevAssignments) => ({
      ...prevAssignments,
      [playerId]: captainId,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="draftmaster-container">
      <h1>Draft Master</h1>
      <div className="player-pool">
        <h2>Player Pool</h2>
        <ul>
          {players.map((player) => (
            <li key={player._id} className="player-item">
              <div>
                <span className="player-info">
                  {player.name} ({player.position}) - ${player.startingPrice}
                </span>
                <button
                  className="remove-button"
                  onClick={() => removePlayer(player._id)}
                >
                  Remove
                </button>
              </div>
              <div className="assign-controls">
                <select
                  value={playerAssignments[player._id] || ""}
                  onChange={(e) =>
                    handleSelectCaptain(player._id, e.target.value)
                  }
                >
                  <option value="">Assign to Captain</option>
                  {captains.map((captain) => (
                    <option key={captain._id} value={captain._id}>
                      {captain.name}
                    </option>
                  ))}
                </select>
                <button
                  className="assign-button"
                  onClick={() =>
                    assignPlayer(player._id, playerAssignments[player._id])
                  }
                >
                  Assign
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DraftMaster;
