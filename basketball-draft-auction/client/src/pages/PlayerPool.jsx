import React, { useEffect, useState } from "react";
import "../styles/PlayerPool.css";

const PlayerPool = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/players?auctioned=false");
        if (!response.ok) throw new Error("Failed to fetch players.");
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="player-pool-container">
      <h1>Player Pool</h1>
      {loading ? (
        <p>Loading players...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : players.length === 0 ? (
        <p>No players in the pool.</p>
      ) : (
        <div className="player-grid">
          {players.map((player) => (
            <div key={player._id} className="player-card">
              <h2>{player.name}</h2>
              <p>Position: {player.position}</p>
              <p>Contact: {player.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerPool;
