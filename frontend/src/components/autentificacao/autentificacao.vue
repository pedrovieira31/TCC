 <template>
    <div class="autentificacao" >
        <div class= "autentificacao-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo" />
            <hr>
            <div class="autentificacao-title">{{showcadastrar ? 'Cadastro' : 'Login'}}</div>
             <b-form>
                        <b-form-group v-if="showcadastrar" label="Nome:" label-for="usuario-nome">
                            <b-form-input id="usuario-nome" type="text"
                            v-model="usuario.nome" required/>
                        </b-form-group>
                        <b-form-group label="Matricula:" label-for="usuario-id">
                            <b-form-input id="usuario-id" type="text"
                            v-model="usuario.matricula" required 
                            placeholder="Ex: ER00000"/>
                        </b-form-group>
                        <b-form-group label="Senha:" label-for="usuario-senha">
                            <b-form-input id="usuario-senha" type="password"
                            v-model="usuario.senha" required />
                        </b-form-group>
                        <b-form-group v-if="showcadastrar" label="Confirmação da Senha:" label-for="usuario-confirmsenha">
                            <b-form-input id="usuario-confirmsenha" type="password"
                            v-model="usuario.confirmarsenha" required />
                        </b-form-group>
                        <b-form-group v-if="showcadastrar" label="Email:" label-for="usuario-email">
                            <b-form-input id="usuario-email" type="text"
                            v-model="usuario.email" required />
                        </b-form-group>
            </b-form>        
            <button v-if="!showcadastrar" href @click.prevent="showcadastrar = !showcadastrar">Cadastrar</button>
            <button v-if="!showcadastrar" @click="logar">Entrar</button>
            <button v-if="showcadastrar" @click="cadastrar">Cadastrar</button>
            <button v-if="showcadastrar" href @click.prevent="showcadastrar = !showcadastrar">Login</button>
        </div>
    </div>
</template>

<script>
import tituloPagina from "@/components/template/tituloPagina";
import axios from "axios";
import { baseApiUrl, showError, chaveUsuario } from "@/global";

export default {
  name: "autentificacao",
  components: { tituloPagina },
  data: function() {
    return {
      showcadastrar: false,
      usuario: {}
    };
  },
  methods: {
    logar() {
      axios.post(`${baseApiUrl}/login`, this.usuario)
        .then(res => {
          this.$store.commit('setUsuario', res.data);
          localStorage.setItem(chaveUsuario, JSON.stringify(res.data));
          this.$router.push({path:'/home'})
        })
        .catch((err) => console.log(err));
    },
    cadastrar() {
      axios.post(`${baseApiUrl}/cadastro`, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.usuario = {};
          this.showcadastrar = false;
        })
        .catch((err) => console.log(err));
    }
  }
};
</script>

<style>
.autentificacao-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.autentificacao-modal {
  background-color: #fff;
  border-radius: 10px;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.autentificacao-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.autentificacao-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.autentificacao-modal button {
  display: flex;
  align-items: center;
  background-color: #2460ae;
  border-radius: 10px;
  color: #fff;
  padding: 5px 15px;
}
.autentificacao-modal button:hover  {
  background-color: #246;
}

.autentificacao-modal a {
  margin-top: 35px;
}

.autentificacao-modal hr {
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