<template>
    <v-app id="app">
      <v-toolbar app dark fixed color="primary">
        <v-toolbar-title>
          <v-btn flat to="/">
            <v-icon left dark>home</v-icon>
            Inicio
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="isLoggedIn()" flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn v-if="!isLoggedIn()" flat to="/login">
          <v-icon left dark>account_box</v-icon>
          Iniciar Sesión
        </v-btn>
        <v-btn v-else flat to="/logout">
          <v-icon left dark>account_box</v-icon>
          Cerrar Sesión
        </v-btn>
      </v-toolbar>
      <v-content transition="slide-x-transition">
        <router-view></router-view>
      </v-content>
      <v-footer color="primary" app>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sideNav: false,
      menuItems: [
        {icon: 'person', title: 'Autores', link: '/autores'},
        {icon: 'book', title: 'Libros', link: '/libros'}
      ]
    }
  },
  methods: {
    isLoggedIn: function () {
      return this.$cookies.isKey('user')
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
