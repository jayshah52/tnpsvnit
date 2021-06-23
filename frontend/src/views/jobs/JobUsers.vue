
<template>
  <b-container>
<!--    <div class="columns is-multiline">-->
<!--      <div class="column is-12">-->
    <div class="row">
        <h1 class="title">Students for this Job</h1>
      <b-button-group size="sm">
        <b-btn class="button is-primary" @click="firstShortlist()">First Shortlist </b-btn>
        <b-btn class="button is-primary ml-1" @click="secondShortlist()">Second Shortlist </b-btn>
        <b-btn class="button is-primary ml-1" @click="thirdShortlist()">Third Shortlist </b-btn>
        <b-btn class="button is-primary ml-1" @click="finalShortlist()">Final Shortlist </b-btn>
        </b-button-group>
        <form @submit.prevent="getStudents">
          <div class="field has-addons mt-3">
            <div class="control">
              <input type="text" class="input" v-model="query" @input="getStudents">
            </div>
            <div class="control">
              <button class="button is-success">Search</button>
            </div>
          </div>
        </form>
      </div>
<!--      </div>-->
    <div class="row">
      <div class="column col-md-12">
        <table class="table is-fullwidth" id="users-table">
          <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Department</th>
            <th>Grad Year</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="u in users"
              v-bind:key="u.id">
            <td>{{ u.roll_no }}</td>
            <td>{{ u.name }}</td>
            <!--                                <td>-->
            <!--                                    <template v-if="lead.assigned_to">{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</template>-->
            <!--                                </td>-->
            <td>{{ u.department }}</td>
            <td>{{ u.graduation_year }}</td>
            <td v-if="user.is_coordinator">
<!--              <router-link :to="{ name: 'user-profile', params: { id: user.id }}">Details</router-link>-->
              <label v-if="nextusers.includes(u.id)"> Already Added to first shortlist </label>
              <button class="button is-success" @click="addToShortlist(u.roll_no)" v-else >Add to First Shortlist </button>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="buttons">
          <button class="button is-info" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
          <button class="button is-info" @click="goToNextPage()" v-if="showNextButton">Next</button>
        </div>

      </div>
<!--    <b-pagination-->
<!--      v-model="currentPage"-->
<!--      :total-rows="num_leads"-->
<!--      :per-page="perPage"-->
<!--      first-text="First"-->
<!--      prev-text="Prev"-->
<!--      next-text="Next"-->
<!--      last-text="Last"-->
<!--      aria-controls="users-table"-->
<!--    ></b-pagination>-->
      </div>

<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <b-table :items="users" :fields="fields" responsive="xs">-->

<!--    </b-table>-->
  </b-container>

</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";
import {mapState} from "vuex";

export default {
  name: "JobUsers",
  data() {
    return {
      users: {},
      nextusers:[],
      perPage:2,
      showNextButton: false,
      showPreviousButton: false,
      currentPage: 1,
      query: '',
      num_leads: 0,
      table_users:[],
      fields: ['roll_no','name', 'department', 'graduation_year']
    }
  },
  mounted() {
    this.getStudents()
  },
  computed: {
      ...mapState(['user']),
    },
  methods: {
    firstShortlist(){
      this.$router.push({ name: 'shortlist', params: { id:this.$route.params.id,number:1} })
    },
    secondShortlist(){
      this.$router.push({ name: 'shortlist', params: { id:this.$route.params.id,number:2} })
    },
    thirdShortlist(){
      this.$router.push({ name: 'shortlist', params: { id:this.$route.params.id,number:3} })
    },
    finalShortlist(){
      this.$router.push({ name: 'shortlist', params: { id:this.$route.params.id,number:4} })
    },
    async addToShortlist(username){
      await axios.post('/api/v1/shortlist/add_student/', {id: this.$route.params.id, username:username, number: 1}).then(
          response => {
            toast({
            message: "Student moved to First Shortlist Successfully",
            type: "is-success",
            dismissible:true,
            pauseOnHover:true,
            duration: 2000,
            position: 'top-right',
          })
          })
    },
    goToNextPage() {
      this.currentPage += 1
      this.getStudents()
    },
    goToPreviousPage() {
      this.currentPage -= 1
      this.getStudents()
    },
    async getStudents() {
      this.showNextButton = false
      this.showPreviousButton = false
      this.nextusers = []
      await axios.get(`/api/v1/job_student/`,{params: {id: this.$route.params.id}}).then(response => {
        console.log(response.data)
        this.num_leads = response.data.count
      })
      await axios.get(`/api/v1/job_student/?page=${this.currentPage}&search=${this.query}`,{params: {id: this.$route.params.id}})
          .then(response => {
            this.users = response.data.results
            this.table_users = Object.entries(this.users)
            if (response.data.next) {
              this.showNextButton = true
            }
            if (response.data.previous) {
              this.showPreviousButton = true
            }
          })
          .catch(error => {
            console.log(error)
          })
      await axios.get(`/api/v1/shortlist/`,{params: {id: this.$route.params.id,number:1}}).then(response => {
        console.log(response.data)
        let nu = response.data.results
          for(let i = 0;i < nu.length;i++){
            this.nextusers.push(nu[i].id)
          }
      })
    }
  }
}
</script>

<style scoped>

</style>