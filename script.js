// Carrega os dados do Local Storage ou usa os dados padrão
let alunos = JSON.parse(localStorage.getItem('alunos')) || {
    "João Silva": 50,
    "Maria Souza": 100,
    "Pedro Oliveira": 75
};

// Salva os dados no Local Storage
function salvarDados() {
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

// Consulta de moedas (Área do Aluno)
function consultarMoedas() {
    const nome = document.getElementById('input-nome').value.trim();
    const resultado = document.getElementById('resultado');

    if (nome in alunos) {
        resultado.textContent = `${nome} possui ${alunos[nome]} CtrlCash.`;
    } else {
        resultado.textContent = "Aluno não encontrado.";
    }
}

// Mostra a Área do Professor com senha
function mostrarProfessor() {
    const senha = prompt("Digite a senha para acessar a área do professor:");

    if (senha === "admin123") { // Senha simples
        document.getElementById('area-professor').style.display = 'block';
    } else {
        alert("Senha incorreta!");
    }
}

// Atualiza as moedas do aluno (Área do Professor)
function atualizarMoedas() {
    const nome = document.getElementById('nome-aluno').value.trim();
    const moedas = document.getElementById('moedas').value;

    if (nome && moedas) {
        alunos[nome] = parseInt(moedas);
        salvarDados(); // Salva os dados no Local Storage
        alert(`CtrlCash de ${nome} foi atualizado para ${moedas} moedas.`);
    } else {
        alert("Preencha todos os campos corretamente.");
    }
}
