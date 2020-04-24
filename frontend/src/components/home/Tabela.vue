<template>
    <div class="Tabela">
        <h1>Tabela de Atividades</h1>
        <div class="tabela-admin">
            <b-table hover striped :items="this.processos" :fields="campos"></b-table>
        </div>
    </div>
</template>

<script>
import{baseApiUrl} from '@/global'
import axios from 'axios'


export default {
    nome: 'processos',
    data: function(){
            return {
                mode:'save',
                processo:{},
                processos:[],
                campos:[
                    {key: 'id', label: 'Processo'},
                    {key: 'atividade', label: 'Atividade'},
                    {key: 'descricao', label: 'Descrição'},
                    {key: 'horas', label: 'Horas'},
                    {key: 'certificado', label: 'Certificado'}
                ]
            }
    },
    methods:{
        carregarProcessos(){
            axios.get(`${baseApiUrl}/home`).then(res=>{this.processos = res.data})
        }
    },

    mounted(){
        this.carregarProcessos()
    }
};
</script>

<style>
</style>