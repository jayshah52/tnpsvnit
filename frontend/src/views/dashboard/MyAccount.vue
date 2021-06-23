<template>
<div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My Account</h1>
<!--              {{request.user}}-->
              <h2>Make Sure you complete your profile correctly to see eligible jobs</h2>
              <button @click="myInfo()" class="button is-primary">
              Personal Info
            </button>
              <br>
              <br>
              <button @click="goToJob()" class="button is-success">
                Jobs
              </button>
<!--              {{this.$store.state.token}}-->
<!--              {{this.$store.state.isAuthenticated}}-->
<!--              {{this.$store.state.user}}-->

            </div>
          <div class="column is-12">
            <button @click="logout()" class="button is-danger">
              Logout
            </button>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyAccount",
  data(){
    return{
      user: {},
    }
  },
  // mounted() {
  //   axios.get('/api/v1/students/student_info/').then(response => {
  //     this.user = response.data
  //   })
  //       .catch(error => {
  //         alert(error)
  //       })
  // },
  methods:{
    goToJob(){
      this.$router.push('/jobs')
    },
    myInfo(){
      this.$router.push('/dashboard/my-info')
    },
    async logout(){
      await axios.post('/api/v1/token/logout/').then(response => {
        this.$router.push('/login')

      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
      // axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')
      localStorage.removeItem('is_coordinator')

      this.$store.commit('removeToken')
    }


  }
}
</script>

<style scoped>

</style>