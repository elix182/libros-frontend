<template>
  <div class="logout">
    <v-progress-circular indeterminate="true"></v-progress-circular>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Logout',
  created () {
    let url = `/auth/logout`
    const data = {
      headers: {
        'Authorization': `Bearer ${this.$cookies.get('user').access_token}`
      }
    }
    axios.get(url, data).then(response => {
      this.$cookies.remove('user')
      this.$router.push('/')
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
