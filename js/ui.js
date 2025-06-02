import api from "./api.js";

const ui = {
  async preencherFormulario(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId);
    document.getElementById("pensamento-id").value = pensamento.id;
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
    document.getElementById("pensamento-autoria").value = pensamento.autoria;
  },

  limparFormulario() {
    document.getElementById("pensamento-form").reset();
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    listaPensamentos.innerHTML = ""; // Limpa a lista antes de renderizar

    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach(ui.adicionarPensamentoNaLista);
    } catch {
      alert("Erro ao renderizar pensamentos");
    }

    if (listaPensamentos.children.length === 0) {
      const muralVazio = document.createElement("div");
      muralVazio.classList.add("mural-vazio");

      const mensagem = document.createElement("p");
      mensagem.textContent = "Nada por aqui ainda, que tal compartilhar alguma ideia?";
      mensagem.classList.add("mensagem-vazia");
      muralVazio.appendChild(mensagem);

      const imagemListaVazia = document.createElement("img");
      imagemListaVazia.src = "assets/imagens/lista-vazia.png";
      imagemListaVazia.alt = "Lista vazia";
      imagemListaVazia.classList.add("imagem-lista-vazia");
      muralVazio.appendChild(imagemListaVazia);

      listaPensamentos.appendChild(muralVazio);
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

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Ícone de editar";
    botaoEditar.appendChild(iconeEditar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id);
        ui.renderizarPensamentos();
      } catch (error) {
        alert("Erro ao excluir pensamento");
      }
    };

    const iconeExcluir = document.createElement("img");
    iconeExcluir.src = "assets/imagens/icone-excluir.png";
    iconeExcluir.alt = "Ícone de excluir";
    botaoExcluir.appendChild(iconeExcluir);

    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);

    li.appendChild(iconeAspas);
    li.appendChild(conteudoPensamento);
    li.appendChild(conteudoAutoria);
    li.appendChild(icones);
    listaPensamentos.appendChild(li);
  },
};

export default ui;
