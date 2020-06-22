<template>
    <div class="Tabela">
        <h2>Tabela de Atividades</h2>
        <div class="tabela" v-if="this.processos && this.processos.length">
          <b-table hover striped :items="this.processos" :fields="campos"></b-table>
          <template slot="certificado" slot-scope="data" >
            <img :src="'./uploads'"/>
          </template>
        </div>
    </div>
</template>

<script>

export default {
  nome: "processos",
  props: ['processos'],
  data: function() {
    return {
      mode: "save",
      processo: {},
      campos: [
        { key: "p_id", label: "Processo" },
        { key: "atividade", label: "Atividade" },
        { key: "descricao", label: "Descrição" },
        { key: "horas", label: "Horas" },
        { key: "certificado", label: "Certificado" }
      ]
    };
  }
};
</script>
<style>
.Tabela h2{
  margin-top: 5px;
  margin-left: 5px;
}
</style>