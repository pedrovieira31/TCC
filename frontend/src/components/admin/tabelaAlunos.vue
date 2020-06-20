<template>
    <div class="tabela-alunos">
        <h1>Tabela de Alunos</h1>
        <b-table hover striped :items="usuarios" :fields="fields" @row-clicked="link($event)">
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
    nome: "usuarios",
    data: function() {
        return {
            mode: "save",
            show: false,
            usuario: {},
            usuarios: [],
            fields: [
                { key: "matricula", label: "Matrícula" , sortable: true },
                { key: "nome", label: "Nome" },
                { key: "email", label: "E-mail" }
            ]
        };
    },
    methods: {
        carregarUsuarios() {
            axios.get(`${baseApiUrl}/admin`).then(res => {
                this.usuarios = res.data;
            });
        },
        link(aluno) {
            console.log(aluno)
            this.$router.push({ name: `paginasAdminAluno`, params: {aluno:aluno, matricula:aluno.matricula}});
        }
    },
    mounted() {
        this.carregarUsuarios();
    }
};
</script>

<style>
.b-table:hover{
    cursor: pointer;
}
</style>