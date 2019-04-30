<template>
  <div v-if="mostrar" class="text-xs-center">
    <v-progress-circular indeterminate="true"></v-progress-circular>
  </div>
  <v-layout v-else>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <h3>Editar datos del autor</h3>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="autor.nombre" v-value="autor.nombre" name="name" label="Nombre Completo"></v-text-field>
            <v-text-field v-model="autor.nacionalidad" v-value="autor.nacionalidad" name="nationality" label="Nacionalidad"></v-text-field>
            <v-textarea v-model="autor.biografia" v-value="autor.biografia" no-resize name="biography" label="Biografia"></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn flat color="green" v-on:click="editarAutor">
            Editar Autor
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditarAutor',
  props: ['autorId'],
  data () {
    return {
      mostrar: false,
      autor: {}
    }
  },
  created () {
    this.getAutor()
  },
  methods: {
    getAutor: function () {
      console.log(this.autorId)
      const data = {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
        }
      }
      this.mostrar = true
      axios.get(`/autores/${this.autorId}`, data).then(response => {
        this.mostrar = false
        this.autor = response.data
      }).catch(error => {
        this.mostrar = false
        console.log(error)
      })
    },
    editarAutor: function () {
      const data = {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
        }
      }
      this.mostrar = true
      axios.put(`/autores/${this.autor.id}`, this.autor, data).then(response => {
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
