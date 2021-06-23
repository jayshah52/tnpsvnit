<template>
<div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
<!--        {{nextusers}}-->
<!--        {{number}}-->
        <h1 class="title" v-if="number == 1">First Shortlist</h1>
        <h1 class="title" v-if="number == 2">Second Shortlist</h1>
        <h1 class="title" v-if="number == 3">Third Shortlist</h1>
        <h1 class="title" v-if="number == 4">Final Shortlist</h1>
<!--        <button class="button is-primary" v-if="number==1" @click="allStudents()">All Registered Students </button>-->
<!--        <button class="button is-primary ml-1" v-else @click="firstShortlist()">First Shortlist </button>-->
<!--        <button class="button is-primary ml-1" @click="secondShortlist()"> Second Shortlist </button>-->
<!--        <button class="button is-primary ml-1" @click="thirdShortlist()"> Third Shortlist </button>-->
<!--        <button class="button is-primary ml-1" @click="finalShortlist()"> Final Shortlist </button>-->
        <b-button-group size="sm">
        <b-btn class="button is-primary" v-if="number==1" @click="allStudents()">All Registered Students </b-btn>
        <b-btn class="button is-primary ml-1" v-else @click="firstShortlist()">First Shortlist </b-btn>
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

      <div class="column is-12">
        <table class="table is-fullwidth">
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
              :key="u.id">
            <td>{{ u.roll_no }}</td>
            <td>{{ u.name }}</td>
            <!--                                <td>-->
            <!--                                    <template v-if="lead.assigned_to">{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</template>-->
            <!--                                </td>-->
            <td>{{ u.department }}</td>
            <td>{{ u.graduation_year }}</td>
            <td v-if="user.is_coordinator && number != 4">
<!--              <router-link :to="{ name: 'user-profile', params: { id: user.id }}">Details</router-link>-->
              <label v-if="nextusers.includes(u.id)"> Already Added to next shortlist </label>
              <button class="button is-success" @click="addToShortlist(u.roll_no,number+1)" v-else >Add to Shortlist {{number+1}} </button>
              <button class="button is-danger ml-3" @click="removeFromShortlist(u.roll_no)">Remove</button>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="buttons">
          <button class="button is-light" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
          <button class="button is-light" @click="goToNextPage()" v-if="showNextButton">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";
import {mapState} from "vuex";

export default {
  name: "Shortlist",
  data(){
    return {
      users:{},
      nextusers:[],
      number:1,
      showNextButton: false,
      showPreviousButton: false,
      currentPage: 1,
      query: '',
      num_leads: 0
    }
  },
  // updated() {
  //   this.getStudents()
  // },
  watch: {
    '$route.params'(){
      this.number = this.$route.params.number
      // console.log("Hello",this.number)
      this.getStudents()
    }
  },
  mounted() {
    this.number = this.$route.params.number
    // console.log("Mounted", this.number)
    this.getStudents()
  },
  computed: {
      ...mapState(['user'])
    },
  methods: {

    allStudents(){
      this.$router.push({ name: 'job-users', params: { id:this.$route.params.id} })
    },
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
    async addToShortlist(username, num){
      await axios.post('/api/v1/shortlist/add_student/', {id: this.$route.params.id, username:username, number:num}).then(
          response => {
            toast({
            message: "Student moved to  Shortlist Successfully",
            type: "is-success",
            dismissible:true,
            pauseOnHover:true,
            duration: 2000,
            position: 'top-right',
          })
          })
      this.getStudents()
    },
    async removeFromShortlist(username){
      await axios.post('/api/v1/shortlist/remove_student/', {id: this.$route.params.id, username:username, number:this.number}).then(
          response => {
            toast({
            message: "Student removed from Shortlist Successfully",
            type: "is-success",
            dismissible:true,
            pauseOnHover:true,
            duration: 2000,
            position: 'top-right',
          })
          })
      this.getStudents()
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
      await axios.get(`/api/v1/shortlist/`,{params: {id: this.$route.params.id,number:this.$route.params.number}}).then(response => {
        console.log("HELloo", response.data)
        this.num_leads = response.data.count
      })
      await axios.get(`/api/v1/shortlist/?page=${this.currentPage}&search=${this.query}`,{params: {id: this.$route.params.id,number:this.$route.params.number}})
          .then(response => {
            this.users = response.data.results
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
      if(this.number<4){
        await axios.get(`/api/v1/shortlist/`,{params: {id: this.$route.params.id,number:this.$route.params.number+1}}).then(response => {
        console.log(response.data)
        let nu = response.data.results
          for(let i = 0;i < nu.length;i++){
            this.nextusers.push(nu[i].id)
          }
      })
      }


    }
  },
}
</script>

<style scoped>

</style>