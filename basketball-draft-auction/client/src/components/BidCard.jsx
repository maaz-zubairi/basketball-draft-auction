import React from "react";
import '../styles/BidCard.css';

const BidCard = ({ captainName, bid, isWinning }) => {
  return (
    <div className={`bid-card ${isWinning ? "winning-bid" : ""}`}>
      <p>Captain: {captainName}</p>
      <p>Bid: ${bid}</p>
    </div>
  );
};

export default BidCard;
