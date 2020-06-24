<template>
        <div class= "infoaluno">
          <div>Nome: {{ aluno ? aluno.nome:""}} </div>
          <div>Matrícula: {{ aluno ? aluno.matricula:""}} </div>
          <div>Horas Computadas: {{calculoHorasC().toFixed(0)}} </div>
          <div>Horas Totais: {{calculoHorasT().toFixed(0)}} </div>
      </div>
</template>

<script>
/* eslint-disable */

import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  props: ["aluno", "processos"],

  methods: {
    calculoHorasT() {
      let result = 0;
      for (let i = 0; i < this.processos.length; i++) {
        result += this.processos[i].horas;
      }
      return result;
    },
    calculoHorasC() {
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
      return AE[0];
    }
  },
  mounted() {
    if(this.processos){
      this.calculoHorasT();
    this.calculoHorasC();
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