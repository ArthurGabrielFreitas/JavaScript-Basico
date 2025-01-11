document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons button');
  
    // Exemplo de funcionalidade (a ser implementada futuramente)
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const difficulty = event.target.id;
        alert(`Você escolheu: ${difficulty}`); // Substituir por lógica do jogo
      });
    });
  });
  