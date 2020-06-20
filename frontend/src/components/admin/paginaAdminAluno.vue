<template>
    <div class="paginasAdmin">
        <tituloPagina icon="fa fa-cogs" main=" Administração do Sistema"/>
        <div class="infoaluno">
          <infoAlunoAdmin :aluno='alunoObj' :processos='processos' />
        </div>
        <div class= "tabela-modal">
          <tabelaAdmin :aluno='alunoObj' :processos='processos' />
        </div>
    </div>
</template>

<script>
import tituloPagina from "@/components/template/tituloPagina";
import tabelaAdmin from "./tabelaAdmin";
import infoAlunoAdmin from "./infoAlunoAdmin";
import { baseApiUrl, chaveUsuario } from "@/global";
import axios from "axios";

export default {
  nome: "paginasAdmin",
  props: ["aluno"],
  components: { tituloPagina, infoAlunoAdmin, tabelaAdmin },
  data: function() {
    return {
      usuario: {},
      processos: [],
      usuarios: [],
      alunoObj: {}
    };
  },
  methods: {
    carregarProcessos() {
      if (this.alunoObj) {
        axios
          .get(`${baseApiUrl}/admin/aluno/${this.alunoObj.matricula}`)
          .then(res => {
            this.processos = res.data;
          });
      }
    },
    carregarInfo() {
      const matricula = this.$route.params.matricula;
      if (matricula) {
        axios.get(`${baseApiUrl}/aluno/${matricula}`).then(res => {
          this.alunoObj = res.data;
          this.carregarProcessos();
        });
      }
    }
  },
  created() {
    this.alunoObj = this.aluno;
    const usuario = localStorage.getItem(chaveUsuario)
      ? JSON.parse(localStorage.getItem(chaveUsuario))
      : null;
    if (usuario) {
      this.$store.commit("setUsuario", usuario);
    }
    if (!this.aluno) {
      this.carregarInfo();
    }
    this.carregarProcessos();
  }
};
</script>

<style>
.paginasAdmin-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paginasAdmin-modal {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.paginasAdmin-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.paginasAdmin-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.tabela-modal {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.paginasAdmin-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  border-radius: 10px;
  color: #fff;
  padding: 5px 15px;
}

.paginasAdmin-modal a {
  margin-top: 35px;
}

.paginasAdmin-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>