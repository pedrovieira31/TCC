<template>
    <div class="tabela-admin">
        <h1>Tabela de processos</h1>
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
                    {key: 'matricula', label: 'Matrícula', sortable:true},
                    {key: 'atividade', label: 'Atividade', sortable:true},
                    {key: 'descricao', label: 'Descrição', sortable:true},
                    {key: 'horas', label: 'Horas'},
                    {key: 'certificado', label: 'Certificado'},
                    {key: 'validacao', label: 'Validação', sortable:true}
                ]
            }
    },
    methods:{
        carregarProcessos(){
            const url = `${baseApiUrl}/admin`
            axios.get(url).then(res=>{this.processos = res.data})
        }
    },
    mounted(){
        this.carregarProcessos()
    }
};
</script>

<style>
</style>