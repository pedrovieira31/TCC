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
  props: ['processos'],
  data: function() {
    return {
      mode: "save",
      usuario: {matricula: "", nome: "", totalHoras:0, horasComputadas:0}
    };
  },
  methods: {
    infoAluno() {
      const user = localStorage.getItem(chaveUsuario) ? JSON.parse(localStorage.getItem(chaveUsuario)) : null;
      if(user){
        this.usuario.nome = user.nome;
        this.usuario.matricula = user.matricula;
      }
    },
    calculoHorasT(){
      this.processos.forEach(processo => this.usuario.totalHoras += processo.horas);
    },
    calculoHorasC(){
      let AE = new Array(15).fill(0);
      for (let i = 0; i < this.processos.length; i++) {
        let element = this.processos[i].atividade;
        switch (element) {
          case 'AE001':
            if(AE[1]<91){
              AE[1] += this.processos[i].horas;
              if(AE[1]> 90){
                AE[1] = 90;
              }
            }
            break;
          case 'AE002':
            if(AE[2]<91){
              AE[2] += this.processos[i].horas;
              if(AE[2]> 90){
                AE[2] = 90;
              }
            }
            break;
          case 'AE003':
            if(AE[2]<91){
              AE[2] += this.processos[i].horas;
              if(AE[2]> 90){
                AE[2] = 90;
              }
            }
            break;
          case 'AE004':
            if(AE[4]<61){
              AE[4] += this.processos[i].horas;
              if(AE[4]> 60){
                AE[4] = 60;
              }
            }
            break;
          case 'AE005':
            if(AE[5]<46){
              AE[5] += this.processos[i].horas;
              if(AE[5]> 45){
                AE[5] = 45;
              }
            }
            break;
          case 'AE006':
            if(AE[6]<91){
              AE[6] += this.processos[i].horas;
              if(AE[6]> 90){
                AE[6] = 90;
              }
            }
            break;
          case 'AE007':
            if(AE[7]<61){
              AE[7] += this.processos[i].horas;
              if(AE[7]> 60){
                AE[7] = 60;
              }
            }
            break;
          case 'AE008':
            if(AE[8]<91){
              AE[8] += this.processos[i].horas;
              if(AE[8]> 90){
                AE[8] = 90;
              }
            }
            break;
          case 'AE009':
            if(AE[9]<61){
              AE[9] += this.processos[i].horas;
              if(AE[9]> 60){
                AE[9] = 60;
              }
            }
            break;
          case 'AE010':
            if(AE[10]<91){
              AE[10] += this.processos[i].horas;
              if(AE[10]> 90){
                AE[10] = 90;
              }
            }
            break;
          case 'AE011':
            if(AE[11]<91){
              AE[11] += this.processos[i].horas;
              if(AE[11]> 90){
                AE[11] = 90;
              }
            }
            break;
          case 'AE012':
            if(AE[12]<31){
              AE[12] += this.processos[i].horas;
              if(AE[12]> 30){
                AE[12] = 30;
              }
            }
            break;
          case 'AE013':
            if(AE[13]<91){
              AE[13] += this.processos[i].horas;
              if(AE[13]> 90){
                AE[13] = 90;
              }
            }
            break;
          case 'AE014':
            if(AE[14]<91){
              AE[14] += this.processos[i].horas;
              if(AE[14]> 90){
                AE[14] = 90;
              }
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
  watch:{
    processos: function(){
      if( this.processos && this.processos.length){
        this.calculoHorasT();
        this.calculoHorasC();
      }
    }
  },
  mounted() {
    this.infoAluno();
    if( this.processos && this.processos.length){
      this.calculoHorasT();
      this.calculoHorasC();
    }
  }
};
</script>
<style>
.infoaluno{
  font-size: 20px;
  margin-bottom: 10px;
}
</style>