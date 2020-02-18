 <template>
    <div class="cadastro" >
        <tituloPagina main="Login"/>
             <b-form>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Matricula:" label-for="usuario-id">
                            <b-form-input id="usuario-id" type="text"
                            v-model="usuario.matricula" required 
                            placeholder="Ex: ER00000"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Senha:" label-for="usuario-senha">
                            <b-form-input senha="usuario-senha" type="password"
                            v-model="usuario.senha" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button variant="primary" href="cadastro">Cadastrar</b-button>
                <b-button variant="primary" >Entrar</b-button>
             </b-form>
    </div>
</template>

<script>
import tituloPagina from '@/components/template/tituloPagina'
import axios from 'axios'
import {baseApiUrl, showError, chaveUsuario} from '@/global'

export default {
    name: 'usuarioAdmin',
    components: { tituloPagina},
    data: function() {
        return {
            usuario: {}
        }
    },
    methods:{
        logar(){
            axios.post(`${baseApiUrl}/`,this.usuario)
            .then(res=>{
                this.store.commit('setUsuario', res.data)
                localStorage.setItem(chaveUsuario, JSON.stringify(res.data))
                this.$router.push({path: '/'})
            })
            .catch(showError)
        }
    }
}
</script>

<style>

</style>