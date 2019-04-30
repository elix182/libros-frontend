<template>
    <div class="Home">
      <Bienvenida v-if="!isLoggedIn()"></Bienvenida>
      <v-progress-circular v-else-if="mostrar" indeterminate="true"></v-progress-circular>
      <div v-else>
        <h1>Hola <strong>{{usuario.name}}</strong></h1>
        <h3>Iniciaste sesion con el correo <strong>"{{usuario.email}}"</strong></h3>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Bienvenida from '@/components/Bienvenida/Bienvenida'
export default {
  components: {
    Bienvenida
  },
  data () {
    return {
      mostrar: false,
      usuario: {
        name: '',
        email: ''
      }
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    isLoggedIn: function () {
      return this.$cookies.isKey('user')
    },
    getUserData: function () {
      this.mostrar = true
      let data = {
        headers: {
          'Authorization': 'Bearer '+this.$cookies.get('user').access_token
        }
      }
      axios.get('/auth/user', data).then(response => {
        this.mostrar = false
        this.usuario = response.data
      }).catch(error => {
        this.mostrar = false
        console.log(error)
      })
    }
  }
}
</script>
