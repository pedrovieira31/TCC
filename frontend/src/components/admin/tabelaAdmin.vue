<template>
  <div class="tabela-modal">
    <h1>Tabela de processos</h1>
    <b-table hover striped :fields="campos" :items="this.processos" >
      <template v-slot:cell(excluir)="data">
        <b-button variant="danger" class="botao2" size="sm" @click="aviso(data.item.p_id)">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
      <template v-slot:cell(certificado)="cert">
        <b-button class="botao" size="sm" @click="exibirPdf(cert.item.certificado)">{{cert.item.certificado}}</b-button>
          <!-- <b-img :src="'http://localhost:3000/static/' + cert.item.certificado" fluid alt="Responsive image"/> -->
      </template>
    </b-table>
  </div>
</template>

<script>
/* eslint-disable */
import { baseApiUrl } from "@/global";
import axios from "axios";
import Vue from "vue";
import "v-slim-dialog/dist/v-slim-dialog.css";
import SlimDialog from "v-slim-dialog";

export default {
  nome: "processos",
  props: ["aluno", "processos"],
  data() {
    Vue.use(SlimDialog);
    return {
      mode: "remove",
      confirmarDeletarProcesso: false,
      campos: [
        { key: "p_id", label: "Processo" },
        { key: "atividade", label: "Atividade", sortable: true },
        { key: "descricao", label: "Descrição" },
        { key: "horas", label: "Horas" },
        { key: "certificado", label: "Certificado" },
        { key: "excluir", label: "Excluir" }
      ]
    };
  },
  methods: {
    exibirPdf(certi){
      window.open('http://localhost:3000/certificado/' + certi);  
    },
    excluirProcesso(ativ) {
      axios.delete(`${baseApiUrl}/admin/aluno/${ativ}`).then(res => {
        this.$toasted.global.defaultSuccess();
      });
    },
    aviso(cod) {
      const options = {
        title: "Excluir Processo",
        size: "sm",
        response: { ok: true, cancel: false }
      };
      this.$dialogs
        .confirm("Deseja excluir este processo?", options)
        .then(res => {
          if (res.ok == true) {
            this.excluirProcesso(cod);
          }
        });
    }
  }
};
</script>

<style>
.infoaluno {
  font-size: 20px;
  margin-bottom: 10px;
}
.img-fluid{
  height: 50%;
}
.botao{
  align-self: center;
  background-color: #2460ae;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 7px;
}
.botao:hover {
  background-color: #246;
} 
.botao2{
  align-self: center;
  border-radius: 10px;
  margin-bottom: 7px;
}
</style>