document.addEventListener('DOMContentLoaded', () => {
  // Obter a dificuldade da query string
  const urlParams = new URLSearchParams(window.location.search);
  const difficulty = urlParams.get('dificuldade');
  
  document.getElementById('difficulty').textContent = difficulty;
  
  // Configurar tabuleiro baseado na dificuldade
  const board = document.getElementById('game-board');
  board.classList.add(difficulty);

  // Determinar quantidade de cartas
  let cardCount;
  switch (difficulty) {
    case 'facil':
      cardCount = 12;
      break;
    case 'medio':
      cardCount = 20;
      break;
    case 'dificil':
      cardCount = 36;
      break;
    default:
      alert("Dificuldade inválida");
      window.location.href = 'index.html';
  }

  // Gerar cartas dinamicamente e adicionar eventos de clique
  const cards = generateCards(cardCount);
  cards.forEach(card => board.appendChild(card));
});

// Função para gerar as cartas
function generateCards(count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.cardIndex = i; // Identificador único para a carta

    // Adicionar evento de clique
    card.addEventListener('click', handleCardClick);

    cards.push(card);
  }
  return cards;
}

// Função para lidar com o clique na carta
function handleCardClick(event) {
  const clickedCard = event.currentTarget;
  const cardIndex = clickedCard.dataset.cardIndex;

  console.log(`Carta clicada: ${cardIndex}`);
  // Aqui você pode manipular a carta clicada, como verificações ou mudança de estado
}
