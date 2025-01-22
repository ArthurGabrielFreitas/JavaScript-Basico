// Função para iniciar o jogo com dificuldade selecionada
function startGame(difficulty) {
  // Salvar dificuldade na URL como query string
  window.location.href = `jogo.html?dificuldade=${difficulty}`;
}

// Exibir melhores resultados ao carregar a página inicial
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-easy").addEventListener("click", () => startGame("easy"));
  document.getElementById("btn-medium").addEventListener("click", () => startGame("medium"));
  document.getElementById("btn-hard").addEventListener("click", () => startGame("hard"));

  ["easy", "medium", "hard"].forEach((difficulty) => {
    const bestScores = JSON.parse(localStorage.getItem("bestScores")) || {};
    if (bestScores[difficulty]) {
      document.getElementById(`${difficulty}-time`).textContent = bestScores[difficulty].time;
      document.getElementById(`${difficulty}-attempts`).textContent = bestScores[difficulty].moves;
      document.getElementById(`${difficulty}-player`).textContent = bestScores[difficulty].playerName;
    }
  });
});