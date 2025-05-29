import api from "./api.js";

const ui = {
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos");

    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach(ui.adicionarPensamentoNaLista);
    } catch {
      alert("Erro ao renderizar pensamentos");
    }
  },

  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos");

    const li = document.createElement("li");
    li.setAttribute("data-id", pensamento.id);
    li.classList.add("li-pensamento");

    const iconeAspas = document.createElement("img");
    iconeAspas.src = "assets/imagens/aspas-azuis.png";
    iconeAspas.alt = "Aspas azuis";
    iconeAspas.classList.add("icone-aspas");

    const conteudoPensamento = document.createElement("div");
    conteudoPensamento.textContent = pensamento.conteudo;
    conteudoPensamento.classList.add("pensamento-conteudo");

    const conteudoAutoria = document.createElement("div");
    conteudoAutoria.textContent = pensamento.autoria;
    conteudoAutoria.classList.add("pensamento-autoria");

    li.appendChild(iconeAspas);
    li.appendChild(conteudoPensamento);
    li.appendChild(conteudoAutoria);
    listaPensamentos.appendChild(li);
  },
};

export default ui;
