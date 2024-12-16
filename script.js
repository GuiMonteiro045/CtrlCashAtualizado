// URL da planilha exportada como CSV
const planilhaCSV = 'https://docs.google.com/spreadsheets/d/1KKIUVdIm92fmUYLCzX1ujMwhwS35JhAk1jewuHa4RsA/export?format=csv';

// Função para buscar e processar dados da planilha CSV
async function obterDadosDaPlanilha() {
    try {
        console.log("Buscando dados da planilha...");
        const response = await fetch(planilhaCSV);

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const csvData = await response.text();
        console.log("Dados recebidos da planilha:", csvData);

        const linhas = csvData.split('\n');
        const alunos = {};

        // Ignora a primeira linha (cabeçalho) e processa as demais
        for (let i = 1; i < linhas.length; i++) {
            const [nome, moedas] = linhas[i].split(',');

            if (nome && moedas) {
                alunos[nome.trim().toLowerCase()] = parseInt(moedas, 10);
            }
        }
        console.log("Dados processados:", alunos);
        return alunos;
    } catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
        return null;
    }
}

// Função para consultar moedas de um aluno
async function consultarMoedas() {
    const nome = document.getElementById('input-nome').value.trim().toLowerCase();
    const resultado = document.getElementById('resultado');

    resultado.textContent = "Consultando...";

    const alunos = await obterDadosDaPlanilha();

    if (alunos) {
        if (alunos[nome] !== undefined) {
            resultado.textContent = `O aluno ${nome} possui ${alunos[nome]} CtrlCash.`;
        } else {
            resultado.textContent = "Aluno não encontrado. Verifique o nome digitado.";
        }
    } else {
        resultado.textContent = "Erro ao carregar os dados. Tente novamente mais tarde.";
    }
}
