import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        usuario: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.usuario) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUsuario(state, usuario){
            state.usuario = usuario
            if(usuario){
                axios.defaults.headers.common['Authorization'] = `bearer ${usuario.token}`
                state.isMenuVisible = false
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        },
        setProcessos(state, processos){
            state.processos = processos;
        },
        getProcessos(state, processos){
            return state.processos = processos;
        }
    }
})