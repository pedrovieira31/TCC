 <template>
    <div class="cadastro" >
        <tituloPagina icon="fa fa-pencil" main=" Cadastro de Usuário"/>
            <b-form>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Nome:" label-for="usuario-nome">
                            <b-form-input id="usuario-nome" type="text"
                            v-model="usuario.nome" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Matricula:" label-for="usuario-matricula">
                            <b-form-input id="usuario-matricula" type="text"
                            v-model="usuario.matricula" required 
                            placeholder="Ex: ER00000"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Senha:" label-for="usuario-senha">
                            <b-form-input id="usuario-senha" type="password"
                            v-model="usuario.senha" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Confirmação de Senha:" label-for="usuario-confirm-senha">
                            <b-form-input id="usuario-confirm-senha" type="password"
                            v-model="usuario.confirmarsenha" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="E-mail:" label-for="usuario-email">
                            <b-form-input id="usuario-email" type="email"
                            v-model="usuario.email" required />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button variant="primary" v-if="mode === 'save'" @click="save">Cadastrar</b-button>
            </b-form>
    </div>
</template>

<script>
import tituloPagina from '@/components/template/tituloPagina'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'cadastro',
    components: { tituloPagina},
    data: function() {
        return {
            mode: 'save',
            usuario: {},
            usuarios: []
        }
    },
    methods: {
        save() {
            const method = this.usuario.matricula ? 'put' : 'post'
            const Matricula = this.usuario.matricula ? `/${this.usuario.matricula}` : ''
           axios[method](`${baseApiUrl}/cadastro${Matricula}`, this.usuario)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.usuario={}
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        }
    }
}
</script>

<style>

</style>