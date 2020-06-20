<template>
    <div class="Tabela">
        <h2>Tabela de Atividades</h2>
        <div class="tabela">
          <b-table hover striped :items="this.processos" :fields="campos"></b-table>
          <template slot="certificado" slot-scope="data" >
            <img :src="'./uploads'"/>
          </template>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  nome: "processos",
  data: function() {
    return {
      mode: "save",
      processo: {},
      processos: [],
      campos: [
        { key: "ID", label: "Processo" },
        { key: "atividade", label: "Atividade" },
        { key: "descricao", label: "Descrição" },
        { key: "horas", label: "Horas" },
        { key: "certificado", label: "Certificado" }
      ]
    };
  },
  methods: {
    carregarProcessos() {
      axios.get(`${baseApiUrl}/home`).then(res => {
        this.processos = res.data;
        this.$store.commit("setProcessos", this.processos)
      });
    }
  },

  mounted() {
    this.carregarProcessos();

  }
};
</script>
<style>
</style>