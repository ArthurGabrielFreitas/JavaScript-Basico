document.addEventListener("DOMContentLoaded", () => {

})

let dataInicio = new Date().getTime();

const cartasUrl = [
  "./img/aurora_energy.png",
  "./img/counter_energy.png",
  "./img/darkness_energy.png",
  "./img/double_aqua_energy.png",
  "./img/double_magma_energy.png",
  "./img/draw_energy.png",
  "./img/enriching_energy.png",
  "./img/fairy_energy.png",
  "./img/fighting_energy.png",
  "./img/fire_energy.png",
  "./img/grass_energy.png",
  "./img/lightning_energy.png",
  "./img/metal_energy.png",
  "./img/plasma_energy.png",
  "./img/psychic_energy.png",
  "./img/super_boost_energy.png",
  "./img/water_energy.png",
  "./img/weakness_guard_energy.png",
];

let firstCard = null;
let lockBoard = false;
let movimentos = 0;
let acertos = 0;
let timerInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  // Obter a dificuldade da query string
  const urlParams = new URLSearchParams(window.location.search);
  const difficulty = urlParams.get("dificuldade");

  document.getElementById("difficulty").textContent = difficulty;

  // Configurar tabuleiro baseado na dificuldade
  const board = document.getElementById("game-board");
  board.classList.add(difficulty);

  // Determinar quantidade de cartas
  let cardCount;
  switch (difficulty) {
    case "easy":
      cardCount = 12;
      break;
    case "medium":
      cardCount = 20;
      break;
    case "hard":
      cardCount = 36;
      break;
    default:
      alert("Dificuldade inválida");
      window.location.href = "index.html";
  }

  // Gerar cartas dinamicamente e adicionar eventos de clique
  const cards = generateCards(cardCount);
  cards.forEach((card) => board.appendChild(card));
});

// Função para gerar as cartas
function generateCards(count) {
  const cards = [];
  const cardSet = [...cartasUrl];
  let secondCard = false;
  let random;
  const pairs = [];
  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.cardIndex = i; // Identificador único para a carta
    card.style.backgroundImage = `url('./img/pokemon-back-card.webp')`;
    card.dataset.cardBackground = `./img/pokemon-back-card.webp`;
    card.dataset.totalCards = count;

    // Definir a frente da carta e o fundo da carta
    if (!secondCard) {
      random = Math.floor(Math.random() * cardSet.length);
      card.dataset.cardForeground = cardSet[random];
      secondCard = true;
    } else {
      card.dataset.cardForeground = cardSet[random];
      secondCard = false;
      cardSet.splice(random, 1); // Remover a carta do conjunto
    }

    // Adicionar evento de clique
    card.addEventListener("click", handleCardClick);

    pairs.push(card);
  }

  while (pairs.length) {
    const randomIndex = Math.floor(Math.random() * pairs.length);
    cards.push(pairs.splice(randomIndex, 1)[0]);
  }
  return cards;
}

// Função para lidar com o clique na carta
function handleCardClick(event) {
  if (lockBoard) return;

  const clickedCard = event.currentTarget;

  if (clickedCard === firstCard) return;

  clickedCard.style.backgroundImage = `url('${clickedCard.dataset.cardForeground}')`;

  playSound("card-flip-sound", 0, 0.25);
  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    lockBoard = true;

    movimentos++;
    const movimentosElement = document.getElementById("moves");
    movimentosElement.textContent = movimentos;

    if (
      firstCard.dataset.cardForeground === clickedCard.dataset.cardForeground
    ) {
      firstCard.removeEventListener("click", handleCardClick);
      clickedCard.removeEventListener("click", handleCardClick);

      firstCard.classList.remove("card");
      firstCard.classList.add("disabled-card");
      clickedCard.classList.remove("card");
      clickedCard.classList.add("disabled-card");

      acertos++;
      resetBoard();

      if (acertos === clickedCard.dataset.totalCards / 2) {
        gameOver();
        return;
      }

      playSound("correct-answer-sound", 400, 0, 0.8);
    } else {
      setTimeout(() => {
        firstCard.style.backgroundImage = `url('${clickedCard.dataset.cardBackground}')`;
        clickedCard.style.backgroundImage = `url('${clickedCard.dataset.cardBackground}')`;

        firstCard.addEventListener("click", handleCardClick);
        clickedCard.addEventListener("click", handleCardClick);

        playSound("wrong-answer-sound", 0, 0, 0.5);
        resetBoard();
      }, 1500);
    }
  }
}

function resetBoard() {
  firstCard = null;
  lockBoard = false;
}

function resetGame() {
  window.location.reload();
}

function gameOver() {
  clearInterval(timerInterval);

  const endTime = new Date().getTime();
  const gameTime = Math.floor((endTime - dataInicio) / 1000);
  const minutes = String(Math.floor(gameTime / 60)).padStart(2, "0");
  const seconds = String(gameTime % 60).padStart(2, "0");

  playSound("victory-fanfare-sound").then(() => {
    const playerName = prompt(
      `Parabéns! Você completou o jogo em ${movimentos} movimentos e ${minutes}:${seconds}. Digite seu nome para entrar na leaderboard:`
    );

    if (playerName) {
      saveBestScore(
        difficulty,
        `${minutes}:${seconds}`,
        movimentos,
        playerName
      );
    }
    window.location.href = "index.html";
  });
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor(
      (new Date().getTime() - dataInicio) / 1000
    );
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function saveBestScore(difficulty, time, moves, playerName) {
  const bestScores = JSON.parse(localStorage.getItem("bestScores")) || {};
  if (!bestScores[difficulty.textContent] || moves < bestScores[difficulty.textContent].moves) {
    bestScores[difficulty.textContent] = { time, moves, playerName };
    localStorage.setItem("bestScores", JSON.stringify(bestScores));
  }
}

function playSound(audioId, timeout = 0, currentTime = 0, volume = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const audioElemento = document.getElementById(audioId);
      audioElemento.currentTime = currentTime;
      audioElemento.volume = volume;
      audioElemento.play();
      audioElemento.onended = resolve;
    }, timeout);
  });
}

document.getElementById("reset-button").addEventListener("click", resetGame);

// Iniciar o cronômetro
startTimer();
