<template>
    <div class="home">
        <tituloPagina icon="fa fa-home" main=" Página do Aluno"/>
        <div title="Tabela de Informações">
            <infoAluno/>
        </div>
        <div title="Tabela de Atividades">
        <div class= "Home-modal">
            <Tabela/>
            <button href @click.prevent="$router.push({path:'/cadastroAtividade'})">Cadastrar Atividade</button>
        </div>
      </div>
    </div>
</template>

<script>
import tituloPagina from "../template/tituloPagina";
import infoAluno from "./infoAluno";
import Tabela from "./Tabela";
import {chaveUsuario } from "@/global";

export default {
  nome: "home",
  components: { tituloPagina,infoAluno,Tabela},
  data: function() {
    return {
      mode: "save",
      usuarios: {},
      processos: {},
    };
  },
  created(){
    const usuario = localStorage.getItem(chaveUsuario) ? JSON.parse(localStorage.getItem(chaveUsuario)) : null;
    if(usuario){
      this.$store.commit("setUsuario", usuario);
    }
  }
};
</script>

<style>
.Home-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Home-modal {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.infoAluno {
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;

  font-size: smaller;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 15px;
}

.Home-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.Home-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.Home-modal button {
  align-self: center;
  background-color: #2460ae;
  border-radius: 10px;
  color: #fff;
  padding: 5px 15px 5px;
}
.Home-modal button:hover {
  background-color: #246;
} 

.Home-modal a {
  margin-top: 35px;
}

.Home-modal hr {
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