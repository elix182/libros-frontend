<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="Autores">
    <h1>Autores</h1>
    <div class="text-xs-center">
      <v-btn fab bottom right append fixed dark color="primary" to="/autores/agregar">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
    <div v-if="mostrar" class="text-xs-center">
      <v-progress-circular indeterminate="true"></v-progress-circular>
    </div>
    <div v-else>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <div v-for="autor in autores" v-bind:key="autor.id">
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline mb-0">{{autor.nombre}}</h3>
              </v-card-title>
              <v-card-text>
                <h6>Nacionalidad: {{autor.nacionalidad}}</h6>
                <p> {{ autor.biografia }}</p>
              </v-card-text>

              <v-card-actions>
                <v-btn flat color="primary" :to="'/autores/editar/'+autor.id">
                  <v-icon left dark>edit</v-icon>
                  Editar
                </v-btn>

                  <v-btn flat color="error" @click="dialog = true" v-on:click="seleccionarEliminarAutor(autor.id)">
                    <v-icon left dark>delete</v-icon>
                    Eliminar
                  </v-btn>
              </v-card-actions>
            </v-card>
            <br>
          </div>
        </v-flex>
      </v-layout>
    </div>

    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Eliminar Autor</v-card-title>
            <v-card-text>No se podra recuperar la informacion del autor<br>ID: {{autorSeleccionado}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="dialog = false">Cancelar</v-btn>
              <v-btn color="success" flat @click="dialog = false" v-on:click="eliminarAutor">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Autores',
  created () {
    this.getAutores()
  },
  data () {
    return {
      autorSeleccionado: 0,
      dialog: false,
      mostrar: true,
      autores: [],
      autor: {
        biografia: '',
        id: '',
        nacionalidad: '',
        nombre: ''
      }
    }
  },
  methods: {
    getAutores: function () {
      this.mostrar = true
      axios.get('/autores', {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
        }
      }).then(response => {
        this.autores = response.data
        this.mostrar = false
      }).catch(error => {
        console.log(error)
        this.mostrar = false
      })
    },
    seleccionarEliminarAutor: function (autorId) {
      this.autorSeleccionado = autorId
    },
    eliminarAutor: function () {
      var url = `/autores/${this.autorSeleccionado}`
      axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
        }
      }).then(response => {
        console.log(response)
        this.getAutores()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
