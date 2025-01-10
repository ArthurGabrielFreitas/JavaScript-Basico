// Obtendo os convites do armazenamento local
const convites = JSON.parse(localStorage.getItem('convites')) || [];

const container = document.getElementById("invitation-container");

const renderConvites = () => {
  // Para cada convite, cria um card e o insere na página
  convites.forEach(({ titulo, frase, convidado, data, endereco }, index) => {
    const dataSplit = data.split("-");

    const card = document.createElement("div");
    card.classList.add("invitation-card");

    // Estrutura do texto e da imagem
    card.innerHTML = `
      <div class="text-content">
        <h1>${titulo}</h1>
        <p>${convidado}, ${frase}</p>
        <p><strong>Dia: ${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}</strong></p>
        <p class="address">${endereco}</p>
      </div>
      <img src="img/casados.jpg" alt="Imagem do convite">
    `;

    // Adiciona o card no DOM após 2 segundos multiplicados pelo índice
    setTimeout(() => {
      container.appendChild(card);
      setTimeout(() => {
        card.classList.add("visible");
      }, 100); // Pequeno atraso para garantir que o card foi adicionado ao DOM
    }, 2000 * index);
  });
};

if (convites.length === 0) {
  container.innerHTML =
    "<p>Nenhum convite disponível. Por favor, gere os convites novamente.</p>";
} else {
  renderConvites();
}
