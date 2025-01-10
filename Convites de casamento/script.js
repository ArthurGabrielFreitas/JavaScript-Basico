document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    // Captura os valores dos inputs
    const titulo = document.getElementById("titulo").value.trim();
    const frase = document.getElementById("frase").value.trim();
    const convidadosInput = document.getElementById("convidados").value.trim();
    const data = document.getElementById("data").value.trim();
    const endereco = document.getElementById("endereco").value.trim();

    // Validação básica de campos vazios
    if (!titulo || !frase || !convidadosInput || !data || !endereco) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Transforma os convidados em uma lista
    const convidados = convidadosInput.split(",").map((nome) => nome.trim());

    // Gera a lista de convites
    const convites = convidados.map(nome => ({
      titulo,
      frase,
      convidado: nome,
      data,
      endereco,
    }));

    // Armazena os convites no localStorage
      localStorage.setItem("convites", JSON.stringify(convites));

      // Redireciona para a página de convites
      window.location.href = "convites.html";
  });
