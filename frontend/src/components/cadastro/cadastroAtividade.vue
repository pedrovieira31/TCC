
 <template>
    <div class="cadastroAtividade" >
        <tituloPagina icon="fa fa-pencil" main=" Cadastro de Atividade"/>
        <div class= "cadastroAtividade-modal">
            <b-form >
                <b-row>
                    <b-col md="9" sm="12" >
                        <b-form-group label="Escolha a Atividade:" class="m-2">
                            <b-form-select atividade="atividade" v-model="atividade.atividade" required>
                                <option atividade.atividade = "AE001" value="AE001">AE001: Cursos e minicursos de extensão (presencial ou à distância) realizados</option>
                                <option atividade.atividade = "AE002" value="AE002">AE002: Curso, minicursos e palestras ministrados</option>
                                <option atividade.atividade = "AE003" value="AE003">AE003: Participação em congressos, seminários ou outros eventos, sem apresentação de trabalho ou outros eventos</option>
                                <option atividade.atividade = "AE004" value="AE004">AE004: Participação em congressos, seminários ou outros eventos, com apresentação de trabalho ou outros eventos</option>
                                <option atividade.atividade = "AE005" value="AE005">AE005: Participação na organização de eventos acadêmicos e científicos</option>
                                <option atividade.atividade = "AE006" value="AE006">AE006: Publicação de artigo completo</option>
                                <option atividade.atividade = "AE007" value="AE007">AE007: Publicação de artigo curto (shortpaper), resumo</option>
                                <option atividade.atividade = "AE008" value="AE008">AE008: Estágio não obrigatório</option>
                                <option atividade.atividade = "AE009" value="AE009">AE009: Monitoria</option>
                                <option atividade.atividade = "AE0010" value="AE010">AE010: Atividade de iniciação cientifica</option>
                                <option atividade.atividade = "AE0011" value="AE011">AE011: Atividade de iniciação à extensão</option>
                                <option atividade.atividade = "AE0012" value="AE012">AE012: Viagens de estudo/visita técnica</option>
                                <option atividade.atividade = "AE0013" value="AE013">AE013: Prestação de serviços relevantes à comunidade</option>
                                <option atividade.atividade = "AE0014" value="AE014">AE014: Casos Omissos</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Descrição:" class="ml-2" label-for="atividade-descricao">
                            <b-form-input id="atividade-descricao"  type="text"
                            v-model="atividade.descricao" required 
                            placeholder="Ex: Minicurso"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Formato de tempo:" class="ml-2" label-for="atividade-horas">
                          <b-form-select tempo="tempo" class="mb-2" label v-model="tempo" required>
                                <option tempo = "Horas" value="Horas">Horas</option>
                                <option tempo = "Minutos" value="Minutos">Minutos</option>
                            </b-form-select>
                          <b-form-input horas="atividade-horas" type="text" v-model="atividade.horas" required/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6" sm="12">
                      <b-form-group label="Certificado:" class="ml-2" label-for="atividade-certificados">
                        <b-form-file type="file" accept=".pdf" id="atividade-cert" placeholder="Escolher arquivo..." name="certificado_" @change="onFileSelected"/> 
                         
                        </b-form-group>
                    </b-col>
                  
                </b-row>
            </b-form>
                <button variant="primary" @click="cadastrar" >Cadastrar</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import tituloPagina from "@/components/template/tituloPagina";
import { chaveUsuario,baseApiUrl } from "@/global";
import axios from "axios";
import { FormFilePlugin } from "bootstrap-vue";

export default {
  name: "cadastroAtividade",
  components: { tituloPagina },
  data: function() {
    return {
      mode: "save",
      atividade: {},
      processo: [],
      selectedFile: null,
      tempo: null,
      processoId: null
    };
    Vue.use(FormFilePlugin);
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.atividade.certificado = this.selectedFile;
      console.log(this.selectedFile)
    },
    carregarID() {
      axios.get(`${baseApiUrl}/cadastroAtividade`).then(res => {
        this.processoId = res.data.max;
        this.processoId++;
      });
    },
    calculoHora(tempo, atividade, horas) {
      var temp;
      switch (tempo) {
        case "Horas":
          switch (atividade) {
            case "AE001":
              temp = horas;
              break;
            case "AE002":
              temp = horas;
              temp = temp * 2;
              break;
            case "AE003":
              temp = horas;
              if (temp >= 15) temp = 15;
              break;
            case "AE004":
              temp = horas;
              if (temp >= 20) temp = 20;
              break;
            case "AE005":
              temp = horas;
              if (temp >= 15) temp = 15;
              break;
            case "AE006":
              temp = horas;
              if (temp >= 30) temp = 30;
              break;
            case "AE007":
              temp = horas;
              if (temp >= 15) temp = 15;
              break;
            case "AE008":
              temp = horas;
              temp = temp / 6;
              if (temp >= 30) temp = 30;
              break;
            case "AE009":
              temp = horas;
              if (temp >= 30) temp = 30;
              break;
            case "AE010":
              temp = horas;
              if (temp >= 90) temp = 90;
              break;
            case "AE011":
              temp = horas;
              if (temp >= 90) temp = 90;
              break;
            case "AE012":
              temp = horas;
              break;
            case "AE013":
              temp = horas;
              break;
            case "AE014":
              temp = horas;
              break;
          }
          break;
        case "Minutos":
          switch (atividade) {
            case "AE001":
              temp = horas / 60;
              break;
            case "AE002":
              temp = horas / 60;
              temp = temp * 2;
              break;
            case "AE003":
              temp = horas / 60;
              if (temp >= 15) temp = 15;
              break;
            case "AE004":
              temp = horas / 60;
              if (temp >= 20) temp = 20;
              break;
            case "AE005":
              temp = horas / 60;
              if (temp >= 15) temp = 15;
              break;
            case "AE006":
              temp = horas / 60;
              if (temp >= 30) temp = 30;
              break;
            case "AE007":
              temp = horas / 60;
              if (temp >= 15) temp = 15;
              break;
            case "AE008":
              temp = horas / 60;
              temp = temp / 6;
              if (temp >= 30) temp = 30;
              break;
            case "AE009":
              temp = horas / 60;
              if (temp >= 30) temp = 30;
              break;
            case "AE010":
              temp = horas / 60;
              if (temp >= 90) temp = 90;
              break;
            case "AE011":
              temp = horas / 60;
              if (temp >= 90) temp = 90;
              break;
            case "AE012":
              temp = horas / 60;
              break;
            case "AE013":
              temp = horas / 60;
              break;
            case "AE014":
              temp = horas / 60;
              break;
          }
          break;
      }
      this.atividade.horas = temp;
    },
    cadastrar() {
      this.calculoHora(
        this.tempo,
        this.atividade.atividade,
        this.atividade.horas
      );
      let cert = new FormData();
      cert.append("atividade", this.atividade.atividade);
      cert.append("descricao", this.atividade.descricao);
      cert.append("horas", this.atividade.horas);
      cert.append("filename", `certificado_${this.processoId}.${this.selectedFile.name.split('.').pop()}`);
      cert.append("certificado", this.selectedFile);
      axios
        .post(`${baseApiUrl}/cadastroAtividade/${this.processoId}`, cert)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$router.push({ path: "/home" });
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    const usuario = localStorage.getItem(chaveUsuario) ? JSON.parse(localStorage.getItem(chaveUsuario)) : null;
    if(usuario){
      this.$store.commit("setUsuario", usuario);
    }
    this.carregarID();
  }
}
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
  margin-bottom: 5px;
}
.cadastroAtividade-modal button:hover {
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