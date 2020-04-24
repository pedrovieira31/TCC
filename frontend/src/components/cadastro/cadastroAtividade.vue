 <template>
    <div class="cadastroAtividade" >
        <tituloPagina icon="fa fa-pencil" main=" Cadastro de Atividade"/>
        <div class= "cadastroAtividade-modal">

            <b-form>
                <input id="processo-atividade" type="hidden" v-model="usuario.id" />
                <b-row>
                    <b-col md="9" sm="12">
                        <b-form-group label="Escolha a Atividade:" >
                            <b-form-select codigo="atividade" class="picker">
                                <option value="AE001">AE001: Cursos e minicursos de extensão (presencial ou à distância) realizados</option>
                                <option value="AE002">AE002: Curso, minicursos e palestras ministrados</option>
                                <option value="AE003">AE003: Participação em congressos, seminários ou outros eventos, sem apresentação de trabalho ou outros eventos</option>
                                <option value="AE004">AE004: Participação em congressos, seminários ou outros eventos, com apresentação de trabalho ou outros eventos</option>
                                <option value="AE005">AE005: Participação na organização de eventos acadêmicos e científicos</option>
                                <option value="AE006">AE006: Publicação de artigo completo</option>
                                <option value="AE007">AE007: Publicação de artigo curto (shortpaper), resumo</option>
                                <option value="AE008">AE008: Estágio não obrigatório</option>
                                <option value="AE009">AE009: Monitoria</option>
                                <option value="AE010">AE010: Atividade de iniciação cientifica</option>
                                <option value="AE011">AE011: Atividade de iniciação à extensão</option>
                                <option value="AE012">AE012: Viagens de estudo/visita técnica</option>
                                <option value="AE013">AE013: Prestação de serviços relevantes à comunidade</option>
                                <option value="AE014">AE014: Casos Omissos</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Descrição:" label-for="processo-descricao">
                            <b-form-input id="processo-descricao" type="text"
                            v-model="usuario.info" required 
                            placeholder="Ex: Minicurso"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Minutos:" label-for="processo-minutos">
                            <b-form-input senha="processo-minutos" type="text"
                            v-model="usuario.minutos" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="10" sm="12">
                        <b-form-group class="btn btn-outline-primary btn-lg" style="margin:0px 0px 10px 0px ">
                           <div class="fileUpload">
                                <span>Enviar Certificado</span>
                                <input type="file" class="upload" />
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
                <button variant="primary" @click="save" >Cadastrar</button>
        </div>
    </div>
</template>

<script>
import tituloPagina from "@/components/template/tituloPagina";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "cadastroAtividade",
  components: { tituloPagina },
  data: function() {
    return {
      mode: "save",
      usuario: {},
      usuarios: []
    };
  },
  methods: {
    save() {
      const method = this.usuario.matricula ? "put" : "post";
      const matricula = this.usuario.matricula ? `/${this.usuario.matricula}` : "";
      axios[method](`${baseApiUrl}/cadastroAtividade`, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    }
  }
};
</script>

<style>
.cadastroAtividade-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cadastroAtividade-modal {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.cadastroAtividade-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.cadastroAtividade-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.cadastroAtividade-modal button {
  align-self: center;
  background-color: #2460ae;
  border-radius: 10px;
  color: #fff;
  padding: 5px 15px;
}
.cadastroAtividade-modal button:hover  {
  background-color: #246;
}


.cadastroAtividade-modal a {
  margin-top: 35px;
}

.cadastroAtividade-modal hr {
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