<!--<template>-->
<!--  <nav class="navbar is-dark">-->
<!--    <div class="navbar-brand">-->
<!--      <router-link to = "/" class="navbar-item">-->
<!--        CRM App-->
<!--      </router-link>-->
<!--    </div>-->
<!--    <div class="navbar-menu">-->
<!--      <div class="navbar-end">-->
<!--        <div class="navbar-item">-->
<!--          <div class="buttons">-->
<!--            <router-link to="/sign-up" class="button is-success">Sign Up</router-link>-->
<!--            <router-link to="/login" class="button is-light">Log In</router-link>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="navbar-menu">-->
<!--            <div class="navbar-end">-->
<!--                <template v-if="$store.state.isAuthenticated">-->
<!--                  <router-link to="/dashboard/users" class="navbar-item">Students</router-link>-->
<!--                  <router-link to="/jobs/all-jobs" class="navbar-item">All Jobs</router-link>-->
<!--                    <router-link to="/dashboard/my-info" class="navbar-item">My Profile</router-link>-->
<!--                    <router-link to="/jobs/" class="navbar-item">Jobs Home</router-link>-->

<!--                    <router-link to="/dashboard/team" class="navbar-item">Team</router-link>-->
<!--                </template>-->

<!--                <div class="navbar-item">-->
<!--                    <div class="buttons">-->
<!--                        <template v-if="!$store.state.isAuthenticated">-->
<!--                            <router-link to="/sign-up" class="button is-success"><strong>Sign up</strong></router-link>-->
<!--                            <router-link to="/login" class="button is-light">Log in</router-link>-->
<!--                        </template>-->

<!--                        <template v-else>-->
<!--                            <router-link to="/dashboard/my-account" class="button is-info">My account</router-link>-->
<!--                        </template>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--  </nav>-->

<!--</template>-->
<template>
  <b-container>

    <!--      -->

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
<!--        <router-link to="/">-->
<!--          TnP SVNIT-->
<!--        </router-link>-->
        TnP SVNIT
      </b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="!$store.state.isAuthenticated">
            <b-nav-item>
              <router-link to="/sign-up" class="button is-success">Sign Up</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/login" class="button is-light">Log In</router-link>
            </b-nav-item>
          </template>

          <!--            <b-nav-item>Disabled</b-nav-item>-->
          <template v-if="$store.state.isAuthenticated">
            <b-nav-item> <router-link to="/dashboard/users" class="button is-light">Students</router-link> </b-nav-item>
            <b-nav-item> <router-link to="/history" class="button is-light">History</router-link> </b-nav-item>
            <b-nav-item> <router-link to="/jobs/all-jobs" class="button is-light">All Jobs</router-link> </b-nav-item>
            <b-nav-item> <router-link to="/dashboard/my-info" class="button is-light">My Profile</router-link> </b-nav-item>
            <b-nav-item> <router-link to="/jobs/" class="button is-light">Jobs Home</router-link> </b-nav-item>
           <b-nav-item> <router-link to="/dashboard/my-account" class="button is-info">My account</router-link> </b-nav-item>
            <b-nav-item> <button class="button is-danger" @click="logout()"> Logout </button> </b-nav-item>
<!--            <router-link to="/dashboard/team" class="navbar-item">Team</router-link>-->
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </b-container>
</template>
<script>
import axios from "axios";

export default {
  name: "Navbar",
  methods:{
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