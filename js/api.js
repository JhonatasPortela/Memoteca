const URL_BASE = "http://localhost:3000";

const api = {
  async buscarPensamentos() {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos`);
      return await response.json();
    } catch {
      alert("Erro ao buscar pensamentos");
    }
  },

  async salvarPensamento(pensamento) {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos`, {
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
      const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar pensamento");
    }
  },

  async editarPensamento(pensamento) {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
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
      const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
        method: "DELETE",
      });
    } catch {
      alert("Erro ao excluir pensamentos");
    }
  },
};

export default api;
