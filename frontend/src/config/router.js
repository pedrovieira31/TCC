import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import paginasAdmin from '@/components/admin/paginasAdmin'
import cadastro from '@/components/cadastro/cadastro'
import cadastroAtividade from '@/components/cadastro/cadastroAtividade'
import login from '@/components/login/login'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/${Matricula}',
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
    name: 'login',
    path: '/',
    component: login
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