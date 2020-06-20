<template>
        <div class= "infoaluno">
            <div>Matrícula: {{usuario.matricula}}</div>
            <div>Nome: {{usuario.nome}}</div>
            <div>Horas Computadas: {{usuario.horasComputadas.toFixed(0)}} </div>
            <div>Horas Totais: {{usuario.totalHoras.toFixed(0)}}</div>
        </div>
</template>

<script>
/* eslint-disable */

import {chaveUsuario } from "@/global";

export default {
  nome: "usuario",
  data: function() {
    return {
      mode: "save",
      usuario: {matricula: "", nome: "", totalHoras:0, horasComputadas:0},
      processos:[]
    };
  },
  // watch: {
  //   processos: function(val){
  //     console.log(val);
  //   }
  // },
  methods: {
    infoAluno() {
      const user = localStorage.getItem(chaveUsuario) ? JSON.parse(localStorage.getItem(chaveUsuario)) : null;
      if(user){
        this.usuario.nome = user.nome;
        this.usuario.matricula = user.matricula;
      }
    },
    getProcessos(){
      this.processos = this.$store.state.processos;
    },
    calculoHorasT(){
      if(this.processos){
        this.processos.forEach(processo => this.usuario.totalHoras += processo.horas);
      }
    },
    calculoHorasC(){
      let AE = new Array(15).fill(0);
      for (let i = 0; i < this.processos.length; i++) {
        let element = this.processos[i].atividade;
        switch (element) {
          case 'AE001':
            if(AE[1] < 91){
              AE[1] += this.processos[i].horas;
            }
            break;
          case 'AE002':
            if(AE[2] < 91){
              AE[2] += this.processos[i].horas;
            }
            break;
          case 'AE003':
            if(AE[3] < 91){
              AE[3] += this.processos[i].horas;
            }
            break;
          case 'AE004':
            if(AE[4] < 61){
              AE[4] += this.processos[i].horas;
            }
            break;
          case 'AE005':
            if(AE[5] < 46){
              AE[5] += this.processos[i].horas;
            }
            break;
          case 'AE006':
            if(AE[6] < 91){
              AE[6] += this.processos[i].horas;
            }
            break;
          case 'AE007':
            if(AE[7] < 61){
              AE[7] += this.processos[i].horas;
            }
            break;
          case 'AE008':
            if(AE[8] < 91){
              AE[8] += this.processos[i].horas;
            }
            break;
          case 'AE009':
            if(AE[9] < 61){
              AE[9] += this.processos[i].horas;
            }
            break;
          case 'AE010':
            if(AE[10] < 91){
              AE[10] += this.processos[i].horas;
            }
            break;
          case 'AE011':
            if(AE[11] < 91){
              AE[11] += this.processos[i].horas;
            }
            break;
          case 'AE012':
            if(AE[12] < 31){
              AE[12] += this.processos[i].horas;
            }
            break;
          case 'AE013':
            if(AE[13] < 91){
              AE[13] += this.processos[i].horas;
            }
            break;
          case 'AE014':
            if(AE[14] < 91){
              AE[14] += this.processos[i].horas;
            }
            break;
        }
      }
      for (let k = 1; k < AE.length; k++) {
        AE[0] += AE[k];
      }
      this.usuario.horasComputadas = AE[0];
    }
  },
  mounted() {
    this.getProcessos();
    this.calculoHorasT();
    this.calculoHorasC();
    this.infoAluno();
  }
};
</script>
<style>
.infoaluno{
  font-size: 20px;
  margin-bottom: 10px;
}
</style>