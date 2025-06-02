const api = {
  async buscarPensamentos() {
    try {
      const response = await fetch("http://localhost:3000/pensamentos");
      return await response.json();
    } catch {
      alert("Erro ao buscar pensamentos");
    }
  },

  async salvarPensamento(pensamento) {
    try {
      const response = await fetch("http://localhost:3000/pensamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pensamento),
      });
      return await response.json();
    } catch {
      alert("Erro ao salvar pensamentos");
    }
  },

  async buscarPensamentoPorId(id) {
    try {
      const response = await fetch(`http://localhost:3000/pensamentos/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar pensamento");
    }
  },

  async editarPensamento(pensamento) {
    try {
      const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pensamento),
      });
      return await response.json();
    } catch {
      alert("Erro ao editar pensamentos");
    }
  },

  async excluirPensamento(id) {
    try {
      const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
        method: "DELETE",
      });
    } catch {
      alert("Erro ao excluir pensamentos");
    }
  },
};

export default api;
