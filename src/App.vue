<template>
  <div class="container">

    <h2>Agenda de Contatos</h2>

    <AddContactButton :abrirModal="abrirModal" />

    <ListaContatos :contatos="contatos" :editando="editando" @atualizar-lista="carregarContatos"
      :categorias="categorias" @editar="editarContato" />

    <ModalAddContato :mostrarModal="mostrarModal" :editando="editando" :valueContato="contatoSelecionado"
      :categorias="categorias" @fechar="mostrarModal = false" @atualizar-lista="carregarContatos" />
  </div>
</template>

<script>

import api from "./services/api";
import ModalAddContato from "./components/ModalAddContato.vue";
import ListaContatos from "./components/ListaContatos.vue";
import AddContactButton from "./components/AddContactButton.vue";

export default {
  components: {
    ModalAddContato,
    ListaContatos,
    AddContactButton
  },
  data() {
    return {
      mostrarModal: false,
      editando: false,
      contatoSelecionado: null,
      contatos: [],
      categorias: {}
    };
  },
  mounted() {
    this.buscarCategorias();
  },
  created() {
    this.carregarContatos();
  },
  methods: {
    async carregarContatos() {
      try {
        const response = await api.buscarContatos();
        this.contatos = response.data;
      } catch (error) {
        console.error("Erro ao carregar contatos", error);
      }
    },
    abrirModal(editando, contato) {
      this.editando = editando;
      this.contatoSelecionado = contato || {};
      this.mostrarModal = true;
    },
    async buscarCategorias() {
      try {
        const response = await api.buscarCategorias();
        this.categorias = response.data;
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    },
    editarContato(contato) {
      this.abrirModal(true, contato);
    }
  }
};

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  color: #333;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
