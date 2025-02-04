<template>

    <div v-if="mostrarModal" class="modal-overlay">

        <div class="modal contact-card">

            <h3>{{ editando ? 'Editar Contato' : 'Novo Contato' }}</h3>

            <form class="form" @submit.prevent="salvarContato">
                <input v-model="contato.nome" type="text" placeholder="Nome" required class="input" />
                <input v-model="contato.email" type="email" placeholder="Email" required class="input" />
                <input v-model="contato.telefone" @input="mascaraTelefone" type="text" placeholder="Telefone" required
                    class="input" />
                <input v-model="contato.imagem" type="text" placeholder="URL da Foto" class="input" />

                <div class="address-group">
                    <input v-model="contato.rua" type="text" placeholder="Rua" required class="input" />
                    <input v-model="contato.numero" type="text" placeholder="Número" required class="input" />
                    <input v-model="contato.bairro" type="text" placeholder="Bairro" required class="input" />
                    <input v-model="contato.cidade" type="text" placeholder="Cidade" required class="input" />
                </div>

                <div class="container-select">
                    <select v-model="contato.categoria" class="custom-select ">
                        <option value="" disabled selected class="placeholder">Selecione uma categoria:</option>
                        <option v-for="(label, index) in categorias" :key="index" :value="index">
                            {{ label }}
                        </option>
                    </select>

                    <select v-model="contato.uf" class="custom-select">
                        <option value="" disabled selected>Selecione o Estado:</option>
                        <option v-for="(sigla, index) in siglasUf" :key="index" :value="sigla">
                            {{ sigla }}
                        </option>
                    </select>
                </div>

                <div class="btn-group">
                    <button @click="salvarContato" type="submit" class="btn">
                        <i class="fas fa-floppy-disk"></i>
                    </button>
                    <button @click="$emit('fechar')" class="btn close">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>

            </form>

        </div>
    </div>

</template>

<script>
import api from '../services/api';

export default {
    name: 'ModalAddContato',
    props: {
        mostrarModal: Boolean,
        editando: Boolean,
        categorias: Object,
        valueContato: Object,
    },
    data() {
        return {
            siglasUf: [
                'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
                'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
                'SP', 'SE', 'TO'
            ]
        };
    },

    computed: {
        contato: {
            get() {
                return this.valueContato;
            },
        }
    },

    methods: {
        async salvarContato(event) {
            event.preventDefault();
            try {
                if (this.editando) {
                    // Atualizar contato
                    await api.atualizarContato(this.contato.id, this.contato);
                } else {
                    // Criar novo contato
                    await api.criarContato(this.contato);
                }
                this.$emit("fechar");
                this.$emit("atualizarLista");
            } catch (error) {
                console.error("Erro ao salvar contato", error);
            }
        }
    },
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

h3 {
    font-size: 1.5rem;

    margin-bottom: 10px;
}

.input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus {
    border-color: var(--focus-border-color);
    box-shadow: var(--focus-box-shadow);
    outline: none;
}

.address-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.container-select {
    display: flex;
    gap: 10px;
}

.btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
}

.btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    font-size: 24px;
    color: var(--btnblue);
}

.btn:hover {

    color: var(--btnbluehover);
}

.btn i {
    font-size: var(--btn-font-size);
}

.btn.close {
    color: var(--btnred);
}

.btn.close:hover {
    color: var(--btnredhover);
}

.custom-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    color: #333333b9;
}

.custom-select:focus {
    border-color: var(--focus-border-color);
    box-shadow: var(--focus-box-shadow);
    ;
}

.custom-select option {
    padding: 8px;
}

@media (max-width: 480px) {
    .modal {
        width: 95%;
    }

    .address-group {
        grid-template-columns: 1fr;
    }
}
</style>