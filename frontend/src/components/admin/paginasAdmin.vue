<template>
    <div class="paginasAdmin">
        <tituloPagina icon="fa fa-cogs" main=" Administração do Sistema"/>
            <div title="Tabela de Processos">
            <div class= "Home-modal">
                <tabelaAdmin/>
            </div>
            </div>
    </div>
</template>

<script>

import tituloPagina from '@/components/template/tituloPagina'
import tabelaAdmin from './tabelaAdmin'


export default {
  nome: 'paginasAdmin',
  components: { tituloPagina, tabelaAdmin},
    data: function(){
        return {
            processos:{}
        }    
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