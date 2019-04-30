<template>
  <div class="Libros">
    <h1>Libros</h1>
    <div class="text-xs-center">
      <v-btn fab bottom right append fixed dark color="primary" to="/libros/agregar">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
    <div v-if="mostrar" class="text-xs-center">
      <v-progress-circular indeterminate="true"></v-progress-circular>
    </div>
    <div v-else>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <div v-for="libro in libros" v-bind:key="libro.id">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{libro.titulo}}</h3>
                  <h6>
                    Autor:
                    <strong v-for="autor in libro.autores" v-bind:key="autor.id">
                      {{autor.nombre}},
                    </strong>
                  </h6>
                  <p> {{ libro.descripcion }}</p>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="primary" :to="'/libros/editar/'+libro.id">
                  <v-icon left dark>edit</v-icon>
                  Editar
                </v-btn>

                <v-btn flat color="error" @click="dialog = true" v-on:click="seleccionarEliminarLibro(libro.id)">
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
            <v-card-title class="headline">Eliminar Libro</v-card-title>
            <v-card-text>No se podra recuperar la informacion del libro<br>ID: {{libroSeleccionado}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="dialog = false">Cancelar</v-btn>
              <v-btn color="success" flat @click="dialog = false" v-on:click="eliminarLibro">Eliminar</v-btn>
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
  data () {
    return {
      libroSeleccionado: 0,
      dialog: false,
      mostrar: false,
      libros: [],
      libro: {
        id: '',
        titulo: '',
        tipo: '',
        descripcion: '',
        fecha_publicacion: ''
      },
      autor: {
        nombre: '',
        nacionalidad: '',
        biografia: ''
      }
    }
  },
  created () {
    this.getLibros()
  },
  methods: {
    getLibros: function () {
      let data = {
        headers: {
          'Authorization': 'Bearer ' + this.$cookies.get('user').access_token
        }
      }
      this.mostrar = true
      axios.get('/libros', data).then(response => {
        this.mostrar = false
        this.libros = response.data
      }).catch(error => {
        console.log(error)
        this.mostrar = false
      })
    },
    seleccionarEliminarLibro: function (libroId) {
      this.libroSeleccionado = libroId
    },
    eliminarLibro: function () {
      var url = `/libros/${this.libroSeleccionado}`
      axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
        }
      }).then(response => {
        console.log(response)
        this.getLibros()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
