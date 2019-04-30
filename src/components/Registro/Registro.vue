<template>
    <div class="Registro">
      <v-progress-circular v-if="mostrar" indeterminate="true"></v-progress-circular>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3>Registrate ingresando los siguientes datos</h3>
                <v-form>
                  <v-container id="input-usage" grid-list-xl fluid>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field prepend-icon="person" name="name" label="Nombre Completo" v-model="usuario.name"></v-text-field>
                        <v-text-field prepend-icon="email" name="email" label="E-mail" v-model="usuario.email"></v-text-field>
                        <v-text-field prepend-icon="security" name="password" label="Contraseña" v-model="usuario.password"
                                      :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                      :type="show1 ? 'text' : 'password'" hint="Minimo 7 caracteres"
                                      counter @click:append="show1 = !show1"></v-text-field>
                        <v-text-field name="password_confirmation" label="Repetir contraseña" v-model="usuario.password_confirmation"
                                      :append-icon="show2 ? 'visibility_off' : 'visibility'"
                                      :type="show2 ? 'text' : 'password'" hint="Repite la misma contraseña que escribiste arriba"
                                      counter @click:append="show2 = !show2"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="green" v-on:click="registrar">
                Registrar
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
  data: function () {
    return {
      mostrar: false,
      show1: false,
      show2: false,
      usuario: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    registrar: function () {
      const url = '/auth/signup'
      this.mostrar = true
      axios.post(url, this.usuario).then(response => {
        this.mostrar = false
        this.$router.push('/login')
      }).catch(error => {
        console.log(error)
        this.mostrar = false
      })
    }
  }
}
</script>
