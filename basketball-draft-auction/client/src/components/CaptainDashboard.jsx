import React from "react";
import PlayerCard from "../components/PlayerCard";
import '../styles/Captain.css';


const CaptainDashboard = ({ team, budget }) => {
  return (
    <div className="captain-container">
      <h1 className="captain-header">Your Team</h1>
      <p className="budget-info">Remaining Budget: ${budget}</p>
      <div className="team-list">
        {team.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default CaptainDashboard;
