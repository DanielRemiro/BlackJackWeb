import React from 'react';

const BettingControls = ({ balance, currentBet, setBet, onDeal, dealerBalance }) => {
  const adjustBet = (amount) => {
    const newBet = currentBet + amount;
    // No puedes apostar más de lo que tienes ni más de lo que tiene el dealer
    const maxBet = Math.min(balance, dealerBalance);
    if (newBet > 0 && newBet <= maxBet) {
      setBet(newBet);
    }
  };

  return (
    <div className="betting-controls">
      <h3>Haz tu apuesta</h3>
      <div className="bet-adjuster">
        <button onClick={() => adjustBet(-50)} disabled={currentBet <= 50}>-50</button>
        <span className="bet-amount">{currentBet} 🟡</span>
        <button onClick={() => adjustBet(50)} disabled={currentBet >= balance || currentBet >= dealerBalance}>+50</button>
      </div>
      <button className="btn-start" onClick={onDeal}>REPARTIR</button>
      <p className="info-text">Máxima apuesta posible: {Math.min(balance, dealerBalance)}</p>
    </div>
  );
};

export default BettingControls;