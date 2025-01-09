document.getElementById('generateButton').addEventListener('click', function () {
    // Captura os valores dos inputs
    const titulo = document.getElementById('titulo').value.trim();
    const frase = document.getElementById('frase').value.trim();
    const convidadosInput = document.getElementById('convidados').value.trim();
    const data = document.getElementById('data').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
  
    // Logs para depurar os valores capturados
    console.log("Título:", titulo);
    console.log("Frase:", frase);
    console.log("Convidados:", convidadosInput);
    console.log("Data:", data);
    console.log("Endereço:", endereco);
  
    // Validação básica de campos vazios
    if (!titulo || !frase || !convidadosInput || !data || !endereco) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    // Transforma os convidados em uma lista
    const convidados = convidadosInput.split(',').map(nome => nome.trim());
  
    // Gera a lista de convites
    const convites = convidados.map(nome => ({
      titulo,
      frase,
      convidado: nome,
      data,
      endereco,
    }));

    console.log('Convites gerados:', convites);
  
    // Armazena os convites no localStorage
    try {
      localStorage.setItem('convites', JSON.stringify(convites));
      console.log('Convites armazenados:', convites);
  
      // Redireciona para a página de convites
      window.location.href = 'convites.html';
    } catch (error) {
      console.error('Erro ao armazenar convites no localStorage:', error);
      alert('Houve um problema ao salvar os convites. Tente novamente.');
    }
  });
  