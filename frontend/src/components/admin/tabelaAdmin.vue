<template>
    <div class="tabela-modal">
        <h1>Tabela de processos</h1>
            <b-table hover striped :fields="campos" :items="this.processos" >
                <template v-slot:cell(excluir)="data">
                    <b-button variant="danger" size="sm" @click="aviso(data.item.ID)" >
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
                <template v-slot:cell(certificado)="cert">

                  <b-button v-b-modal.modal-{{cert.item.certificado}}>{{cert.item.certificado}}</b-button>

                  <b-modal id="modal-1" title="BootstrapVue">
                    <p class="my-4">Hello from modal!</p>
                  </b-modal>
                </template>
            </b-table>

              <!-- <v-dialog v-model="confirmarDeletarProcesso" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline">Excluir</v-card-title>
                  <v-card-text>Tem certeza que deseja excluir o processo ?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="confirmarDeletarProcesso = false">Cancelar</v-btn>
                    <v-btn color="error" text @click="excluirProcesso(data.item.ID)">Deletar</v-btn>
                  </v-card-actions>
                </v-card> -->
            <!-- </v-dialog> -->
            <div>
            </div>
    </div>

</template>

<script>
/* eslint-disable */
import { baseApiUrl } from "@/global";
import axios from "axios";
import Vue from "vue";
import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'

export default {
  nome: "processos",
  props: ["aluno", "processos"],
  data() {
    Vue.use(SlimDialog);
    return {
      mode: "remove",
      confirmarDeletarProcesso: false,
      campos: [
        { key: "ID", label: "Processo" },
        { key: "atividade", label: "Atividade", sortable: true },
        { key: "descricao", label: "Descrição" },
        { key: "horas", label: "Horas" },
        { key: "certificado", label: "Certificado" },
        { key: "excluir", label: "Excluir" }
      ]
    };
  },
  methods: {
    reset() {
      this.mode = "save";
      this.processos = {};
      this.carregarProcessos();
    },
    excluirProcesso(ativ) {
      axios.delete(`${baseApiUrl}/admin/aluno/${ativ}`).then(res => {
        this.processos = res.data;
        this.$toasted.global.defaultSuccess();
        this.reset();
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
          console.log(res); // {ok: true|false|undefined}
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
</style>