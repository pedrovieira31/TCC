<template>
    <div class="tabela-admin">
        <h1>Tabela de processos</h1>
        <div class="tabela-admin">
            <b-table hover striped :itens="usuarios" :fields="campos"></b-table>
        </div>
    </div>
</template>

<script>
import{baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    nome: 'tabelaAdmin',
    data: function(){
            return {
                mode:'save',
                processo:{},
                processos:[],
                campos:[
                    {key: 'id', label: 'Processo Atividade', sortable:true},
                    {key: 'data', label: 'Data', sortable:true},
                    {key: 'codigo', label: 'Atividade', sortable:true},
                    {key: 'descricao', label: 'Descrição', sortable:true},
                    {key: 'matricula', label: 'Matrícula', sortable:true},
                    {key: 'nome', label: 'Nome', sortable:true},
                    {key: 'email', label: 'E-mail', sortable:true},
                    {key: 'actions', label: 'Ações'}
                ]
            }
    },
    methods:{
        carregarUsuarios(){
            const url = `${baseApiUrl}/usuarios`
            axios.get(url).then(res=>{
                this.usuarios = res.data
            })
        }

    },
    mounted(){
        this.carregarUsuarios()
    }
};
</script>

<style>
</style>