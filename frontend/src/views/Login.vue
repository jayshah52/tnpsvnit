<template>

  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title"> Login </h1>
        <form @submit.prevent="Login">
<!--          <div class="field">-->
<!--            <label> Email </label>-->
<!--            <div class="control">-->
<!--            <input type="email" name="email" class="input">-->
<!--              </div>-->
<!--          </div>-->

          <div class="field">
            <label> Username(Admission Number) </label>
            <div class="control">
            <input type="text" name="username" class="input" v-model = "username">
              </div>
            {{this.$store.state.token}}
            {{this.$store.state.isAuthenticated}}
            {{this.$store.state.user}}
          </div>

          <div class="field">
            <label> Password </label>
            <div class="control">
            <input type="password" name="pwd" class="input" v-model = "pwd">
              </div>
          </div>
        <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key = "error"> {{error}}</p>
          </div>
          <div class="field">
            <div class="control">
            <button class="button is-success"> Submit </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from 'bulma-toast'
export default {
  name: "Login",
  data(){
    return {
      username:'',
      pwd:'',
      errors:[],
    }
  },
  methods: {
    async Login(){
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      const formData = {
          username: this.username,
          password: this.pwd,
        }

       await axios.post('/api/v1/token/login/', formData).then(response => {
          const token = response.data.auth_token
          this.$store.commit('setToken', token);
          axios.defaults.headers.common['Authorization'] = `Token ${token}`;
          localStorage.setItem('token',token)

        })
      .catch(error => {
          if(error.response){
            for(const property in error.response.data){
              this.errors.push(`${property}: ${error.response.data(property)}`)
            }
          }
          else if(error.messages){
            this.errors.push("Something went wrong. Please try again")
          }
        })
    await  axios.get('/api/v1/students/student_info').then(response => {
        this.$store.commit('setUser', {'id': response.data.id, 'username': response.data.roll_no, 'is_coordinator': response.data.is_coordinator})
        localStorage.setItem('userid', response.data.id)
      localStorage.setItem('username', response.data.roll_no)
      localStorage.setItem('is_coordinator', response.data.is_coordinator)
        this.$router.push('/dashboard/my-account')
      })
    }
  }
}
</script>

<style scoped>

</style>