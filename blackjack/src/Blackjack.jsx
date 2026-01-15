import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Deck } from './utils/Deck';
import { calculateScore, getWinnerResult } from './utils/GameRules';
import Card from './components/Card';
import BettingControls from './components/BettingControls';
import './App.css';

const Blackjack = () => {
  // --- Estados de Economía ---
  const [playerChips, setPlayerChips] = useState(1000);
  const [dealerChips, setDealerChips] = useState(2000);
  const [currentBet, setCurrentBet] = useState(100);
  const [gameResult, setGameResult] = useState(null); // 'player_victory', 'bankrupt'

  // --- Estados del Juego ---
  const [deckObj] = useState(new Deck()); // Instancia de la clase Deck
  const [deckCards, setDeckCards] = useState([]); // Array visual para React
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); // betting, playing, dealer_turn, finished
  const [message, setMessage] = useState('');

  // Reiniciar partida completa si alguien quiebra
  const resetFullGame = () => {
    setPlayerChips(1000);
    setDealerChips(2000);
    setCurrentBet(100);
    setGameResult(null);
    setGameState('betting');
    setMessage('');
  };

  // --- Iniciar Mano (Deal) ---
  const dealCards = () => {
    deckObj.reset(); // Usamos método de la CLASE
    const currentDeck = deckObj.getCards();
    setDeckCards(currentDeck);
    
    setPlayerHand([]);
    setDealerHand([]);
    setGameState('playing');
    setMessage('');

    // Animación de reparto (setTimeout)
    setTimeout(() => {
      setPlayerHand([deckObj.draw()]);
      setDeckCards(deckObj.getCards());
      setTimeout(() => {
        setDealerHand([deckObj.draw()]);
        setDeckCards(deckObj.getCards());
        setTimeout(() => {
          setPlayerHand(prev => [...prev, deckObj.draw()]);
          setDeckCards(deckObj.getCards());
          setTimeout(() => {
            setDealerHand(prev => [...prev, deckObj.draw()]);
            setDeckCards(deckObj.getCards());
            
            // Verificar Blackjack natural instantáneo
            // (Podrías agregar lógica aquí si quieres)
          }, 300);
        }, 300);
      }, 300);
    }, 100);
  };

  // --- Acciones de Juego ---
  const hit = () => {
    const card = deckObj.draw();
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    setDeckCards(deckObj.getCards());

    if (calculateScore(newHand) > 21) {
      endRound('dealer_wins');
    }
  };

  const stand = () => {
    setGameState('dealer_turn');
    let currentDealerHand = [...dealerHand];
    let score = calculateScore(currentDealerHand);

    const dealerLoop = setInterval(() => {
      if (score < 17) {
        const card = deckObj.draw();
        currentDealerHand.push(card);
        score = calculateScore(currentDealerHand);
        setDealerHand([...currentDealerHand]);
        setDeckCards(deckObj.getCards());
      } else {
        clearInterval(dealerLoop);
        const result = getWinnerResult(playerHand, currentDealerHand);
        endRound(result);
      }
    }, 800);
  };

  // --- Final de Ronda y Economía ---
  const endRound = (result) => {
    setGameState('finished');
    
    let msg = '';
    let pChips = playerChips;
    let dChips = dealerChips;

    if (result === 'player_wins') {
      msg = `¡Ganaste ${currentBet} Pokéfichas! 🎉`;
      pChips += currentBet;
      dChips -= currentBet;
    } else if (result === 'dealer_wins') {
      msg = `La casa gana. Pierdes ${currentBet} 🟡`;
      pChips -= currentBet;
      dChips += currentBet;
    } else {
      msg = 'Empate (Push). Nadie pierde fichas 🤝';
    }

    setPlayerChips(pChips);
    setDealerChips(dChips);
    setMessage(msg);

    // Verificar Game Over Global
    if (pChips <= 0) setGameResult('bankrupt');
    if (dChips <= 0) setGameResult('player_victory');
  };

  return (
    <div className="game-container">
      {/* HUD de Economía */}
      <div className="hud">
        <div className="chip-box player">
          <span>Alumno:</span> <strong>{playerChips} 🟡</strong>
        </div>
        <div className="chip-box dealer">
          <span>Profesor:</span> <strong>{dealerChips} 🟡</strong>
        </div>
      </div>

      <h1>♠️ Blackjack DAM2A ♦️</h1>

      {/* Pantallas de Fin de Juego Global */}
      {gameResult && (
        <div className="game-over-overlay">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="game-over-modal"
          >
            {gameResult === 'player_victory' ? (
              <>
                <h2>🏆 ¡Has quebrado a la Banca! 🏆</h2>
                <p>El dealer se quedó sin dinero. ¡Eres el maestro!</p>
              </>
            ) : (
              <>
                <h2>💀 GAME OVER 💀</h2>
                <p>Te has quedado sin fichas.</p>
              </>
            )}
            <button onClick={resetFullGame} className="btn-restart">Reiniciar Torneo</button>
          </motion.div>
        </div>
      )}

      {/* Mazo Decorativo */}
      {!gameResult && gameState !== 'betting' && <div className="deck-container"></div>}

      {/* Lógica de Vistas */}
      {!gameResult && (
        <>
          {gameState === 'betting' ? (
            <BettingControls 
              balance={playerChips}
              currentBet={currentBet} 
              setBet={setCurrentBet} 
              onDeal={dealCards}
              dealerBalance={dealerChips}
            />
          ) : (
            <div className="table">
              {/* Dealer Area */}
              <div className="hand-area">
                <h2>Dealer ({gameState === 'finished' ? calculateScore(dealerHand) : '?'})</h2>
                <div className="cards-row">
                  <AnimatePresence>
                    {dealerHand.map((card, index) => (
                      <Card 
                        key={index} 
                        index={index}
                        card={card}
                        isHidden={index === 0 && (gameState === 'playing' || gameState === 'dealer_turn')}
                        isRed={['♥','♦'].includes(card.suit)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <hr />

              {/* Player Area */}
              <div className="hand-area">
                <h2>Tú ({calculateScore(playerHand)})</h2>
                <div className="cards-row">
                  <AnimatePresence>
                    {playerHand.map((card, index) => (
                      <Card 
                        key={index}
                        index={index}
                        card={card}
                        isRed={['♥','♦'].includes(card.suit)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Controles */}
              <div className="controls">
                {gameState === 'playing' && (
                  <>
                    <button onClick={hit}>Pedir (Hit)</button>
                    <button onClick={stand}>Plantarse (Stand)</button>
                  </>
                )}
                {gameState === 'finished' && (
                  <motion.div 
                    className="result-area"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  >
                    <h3>{message}</h3>
                    <button onClick={() => setGameState('betting')} className="btn-restart">Siguiente Mano</button>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blackjack;