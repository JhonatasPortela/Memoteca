import ui from "./ui.js";
import api from "./api.js";

const regexConteudo = /^[A-Za-z\s]{10,}$/;
function verificarConteudo(conteudo) {
  return regexConteudo.test(conteudo);
}

const regexAutoria = /^[A-Za-z]{3,15}$/;
function verificarAutoria(autoria) {
  return regexAutoria.test(autoria);
}

function removerEspacos(string) {
  return string.replaceAll(/\s+/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos();

  const formularioPensamento = document.getElementById("pensamento-form");
  const botaoCancelar = document.getElementById("botao-cancelar");
  const inputBuscar = document.getElementById("campo-busca");

  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
  botaoCancelar.addEventListener("click", manipularCancelamento);
  inputBuscar.addEventListener("input", manipularBusca);
});

async function manipularSubmissaoFormulario(event) {
  event.preventDefault();
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;
  const data = document.getElementById("pensamento-data").value;

  const conteudoSemEspacos = removerEspacos(conteudo);

  if (!verificarAutoria(autoria)) {
    alert("A autoria deve ter entre 3 e 15 letras e não pode conter espaços.");
    return;
  }

  if (!verificarConteudo(conteudoSemEspacos)) {
    alert("O conteúdo deve ter apenas letras e espaços, e ter no mínimo 10 caracteres.");
    return;
  }

  if (!verificarData(data)) {
    alert("A data deve ser anterior ou igual à data atual.");
    return;
  }

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data });
    } else {
      await api.salvarPensamento({ conteudo, autoria, data });
    }
    ui.renderizarPensamentos();
  } catch {
    alert("Erro ao salvar pensamento");
  }
}

function manipularCancelamento() {
  ui.limparFormulario();
}

async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value;
  try {
    const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
    ui.renderizarPensamentos(pensamentosFiltrados);
  } catch {
    alert("Erro ao buscar pensamentos");
  }
}

function verificarData(data) {
  const dataAtual = new Date();
  const dataInserida = new Date(data);
  return dataInserida <= dataAtual;
}
