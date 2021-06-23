<template>
 <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Jobs</h1>
<!--                <router-link -->
<!--                    to="/dashboard/leads/add"-->
<!--                    v-if="$store.state.team.max_leads > num_leads"-->
<!--                >Add lead</router-link>-->

                <form @submit.prevent="getJobs">
                    <div class="field has-addons">
                        <div class="control">
                            <input type="text" class="input" v-model="query" @input="getJobs">
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
                            <th>Company Name</th>
                            <th>For Batch of</th>
                            <th>CTC</th>
                            <th>Number of Selections</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="job in jobs"
                            v-bind:key="job.id">
                                <td>{{ job.name }}</td>
                                <td>{{ job.grad_year }}</td>
<!--                                <td>-->
<!--                                    <template v-if="lead.assigned_to">{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</template>-->
<!--                                </td>-->
                                <td>{{ job.ctc }}</td>
                          <td>{{ job.count }}</td>
                          <td>
                            <router-link :to="{ name: 'shortlist', params: { id: job.id, number:4 }}">Selections</router-link>
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

export default {
  name: "HistoryPage",
  data() {
            return {
                jobs:{},
                showNextButton: false,
                showPreviousButton: false,
                currentPage: 1,
                query: '',
                num_leads: 0
            }
        },
  mounted() {
    this.getJobs()
  },
  methods:{
    goToNextPage() {
                this.currentPage += 1
                this.getJobs()
            },
            goToPreviousPage() {
                this.currentPage -= 1
                this.getJobs()
            },
    async getJobs(){
      this.showNextButton = false
      this.showPreviousButton = false
      await axios.get(`/api/v1/jobs/`).then(response => {
        // console.log(response.data)
        this.num_leads = response.data.count
      // console.log("NUMB", this.num_leads)
      })
      await axios.get(`/api/v1/jobs/?page=${this.currentPage}&search=${this.query}`)
          .then(response => {
            this.jobs = response.data.results
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

    }
  }
}
</script>

<style scoped>

</style>