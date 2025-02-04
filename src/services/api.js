import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7213/'
});

export default {
    criarContato: (contato) => api.post("contatos", contato),
    buscarContatos: () => api.get("contatos"),
    atualizarContato: (id, contato) => api.put(`contatos/${id}`, contato),
    buscarContatosPorNome: (nome) => api.get(`contatos/nome/${nome}`),
    deletarContato: (id) => api.delete(`contatos/${id}`),
    buscarCategorias: () => api.get("contatos/categorias"),
};
