import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import paginasAdmin from '@/components/admin/paginasAdmin'
import cadastro from '@/components/cadastro/cadastro'
import cadastroAtividade from '@/components/cadastro/cadastroAtividade'
import autentificacao from '@/components/autentificacao/autentificacao'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/home',
    component: Home
}, {
    name: 'cadastro',
    path: '/cadastro',
    component: cadastro
},{
    name: 'cadastroAtividade',
    path: '/cadastroAtividade',
    component: cadastroAtividade
},{
    name: 'autentificacao',
    path: '',
    component: autentificacao
},{
    name: 'paginasAdmin',
    path: '/admin',
    component: paginasAdmin,
    meta: { requiresAdmin: true }
}]

export default new VueRouter({
    mode: 'history',
    routes
})