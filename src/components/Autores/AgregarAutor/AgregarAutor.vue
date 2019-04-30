<template>
  <div class="AgregarAutor">
    <div v-if="mostrar" class="text-xs-center">
      <v-progress-circular indeterminate="true"></v-progress-circular>
    </div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <h3>Agregar un nuevo autor</h3>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field v-model="autor.nombre" name="name" label="Nombre Completo"></v-text-field>
              <v-text-field v-model="autor.nacionalidad" name="nationality" label="Nacionalidad"></v-text-field>
              <v-textarea v-model="autor.biografia" no-resize name="biography" label="Biografia"></v-textarea>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="green" v-on:click="agregarAutor">
              Agregar Autor
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
  name: 'AgregarAutor',
  data () {
    return {
      mostrar: false,
      autor: {}
    }
  },
  methods: {
    agregarAutor: function () {
      const data = {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
        }
      }
      this.mostrar = true
      axios.post('/autores', this.autor, data).then(response => {
        this.mostrar = false
        this.$router.push('/autores')
      }).catch(error => {
        this.mostrar = false
        console.log(error)
      })
    }
  }
}
</script>
