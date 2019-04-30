<template>
  <div class="Login">
    <v-progress-circular v-if="mostrar" indeterminate="true"></v-progress-circular>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3>Ingresa tus datos</h3>
              <v-form>
                <v-container id="input-usage" grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="loginData.email" prepend-icon="email" name="email" label="E-mail"></v-text-field>
                      <v-text-field v-model="loginData.password" prepend-icon="security" name="password" label="Contraseña"
                                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="blue" v-on:click="login">Iniciar Sesion</v-btn>
            <v-btn flat color="green">
              <router-link to="/registro" tag="span">
                Registrar
              </router-link>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      mostrar: false,
      show1: false,
      loginData: {
        email: '',
        password: '',
        remember_me: true
      }
    }
  },
  methods: {
    login: function () {
      const url = '/auth/login'
      this.mostrar = true
      axios.post(url, this.loginData).then(response => {
        this.mostrar = false
        this.$cookies.set('user', response.data)
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
        this.mostrar = false
      })
    }
  }
}
</script>
