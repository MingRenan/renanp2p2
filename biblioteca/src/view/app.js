const API_URL = "http://localhost:3000/api";

// Elementos HTML
const formCadastro = document.getElementById("formCadastro");
const camposForm = document.getElementById("camposForm");
const lista = document.getElementById("lista");
const modalEdicao = document.getElementById("modalEdicao");
const formEdicao = document.getElementById("formEdicao");
const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");

// Estado
let dadosCadastrados = [];
let tipoAtual = "funcionario";
let dadoEditando = null;

// Atualiza os campos do formulário com base no tipo selecionado
document.getElementById("tipo").addEventListener("change", function () {
  tipoAtual = this.value;
  atualizarFormulario(tipoAtual);
});

// Atualiza os campos do formulário de cadastro
function atualizarFormulario(tipo) {
  camposForm.innerHTML = "";

  switch (tipo) {
    case "funcionario":
      camposForm.innerHTML = `
        <input type="text" id="nome" placeholder="Nome" required>
        <input type="number" id="idade" placeholder="Idade" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="text" id="fone" placeholder="Telefone" required>
      `;
      break;
    case "mensalista":
      camposForm.innerHTML = `
        <input type="text" id="matricula" placeholder="Matrícula" required>
        <input type="number" id="salario" placeholder="Salário" required>
        <input type="text" id="funcionario" placeholder="ID do Funcionário" required>
      `;
      break;
    case "cargo":
      camposForm.innerHTML = `
        <input type="text" id="cbo" placeholder="CBO" required>
        <input type="text" id="descricao" placeholder="Descrição" required>
      `;
      break;
  }
}

// Adiciona um novo dado
formCadastro.addEventListener("submit", async function (event) {
  event.preventDefault();

  const data = new FormData(formCadastro);
  const body = Object.fromEntries(data.entries());

  try {
    const response = await fetch(`${API_URL}/${tipoAtual}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      carregarDados();
    }
  } catch (error) {
    console.error("Erro ao adicionar:", error);
  }
});

// Carrega os dados cadastrados
async function carregarDados() {
  try {
    const response = await fetch(`${API_URL}/${tipoAtual}`);
    dadosCadastrados = await response.json();

    lista.innerHTML = "";
    dadosCadastrados.forEach((dado, index) => {
      const item = document.createElement("div");
      item.innerHTML = `
        <div>${JSON.stringify(dado)}</div>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="deletar('${dado._id}')">Deletar</button>
      `;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

// Deleta um dado
async function deletar(id) {
  try {
    await fetch(`${API_URL}/${tipoAtual}/${id}`, { method: "DELETE" });
    carregarDados();
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
}

// Edita um dado
function editar(index) {
  dadoEditando = dadosCadastrados[index];
  modalEdicao.style.display = "block";

  // Preenche o formulário de edição
  formEdicao.innerHTML = Object.keys(dadoEditando)
    .map(
      (key) => `
      <label>${key}:</label>
      <input type="text" name="${key}" value="${dadoEditando[key]}">
    `
    )
    .join("");
}

// Salva as alterações no dado editado
btnSalvarEdicao.addEventListener("click", async function () {
  const data = new FormData(formEdicao);
  const body = Object.fromEntries(data.entries());

  try {
    await fetch(`${API_URL}/${tipoAtual}/${dadoEditando._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    modalEdicao.style.display = "none";
    carregarDados();
  } catch (error) {
    console.error("Erro ao editar:", error);
  }
});

// Inicialização
window.onload = function () {
  atualizarFormulario(tipoAtual);
  carregarDados();
};
