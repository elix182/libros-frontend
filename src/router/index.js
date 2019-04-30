import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import Registro from '@/components/Registro/Registro'
import Logout from '@/components/Logout/Logout'
import Autores from '@/components/Autores/Autores'
import AgregarAutor from '@/components/Autores/AgregarAutor/AgregarAutor'
import EditarAutor from '@/components/Autores/EditarAutor/EditarAutor'
import Libros from '@/components/Libros/Libros'
import AgregarLibro from '@/components/Libros/AgregarLibro/AgregarLibro'
import EditarLibro from '@/components/Libros/EditarLibro/EditarLibro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/autores',
      name: 'Autores',
      component: Autores
    },
    {
      path: '/autores/agregar',
      name: 'AgregarAutor',
      component: AgregarAutor
    },
    {
      path: '/autores/editar/:autorId',
      name: 'EditarAutor',
      component: EditarAutor,
      props: true
    },
    {
      path: '/libros',
      name: 'Libros',
      component: Libros
    },
    {
      path: '/libros/agregar',
      name: 'AgregarLibro',
      component: AgregarLibro
    },
    {
      path: '/libros/editar/:libroId',
      name: 'EditarLibro',
      component: EditarLibro,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
