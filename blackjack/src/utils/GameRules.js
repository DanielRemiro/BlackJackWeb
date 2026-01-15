export const calculateScore = (hand) => {
  let score = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (["J", "Q", "K"].includes(card.value)) {
      score += 10;
    } else if (card.value === "A") {
      score += 11;
      aces += 1;
    } else {
      score += parseInt(card.value);
    }
  });

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }
  return score;
};

export const getWinnerResult = (playerHand, dealerHand) => {
  const pScore = calculateScore(playerHand);
  const dScore = calculateScore(dealerHand);

  if (pScore > 21) return 'dealer_wins'; // Jugador se pasa
  if (dScore > 21) return 'player_wins'; // Dealer se pasa
  if (pScore > dScore) return 'player_wins';
  if (pScore < dScore) return 'dealer_wins';
  return 'push'; // Empate
};