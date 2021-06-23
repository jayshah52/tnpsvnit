<template>
  <div class="container">
    <div class="container">
      <div class="col-md-8">
        <div class="card mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Role</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.role }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Company Name</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.name }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Company Description</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.company_desc }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Job Description</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.job_desc }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">CTC </h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.ctc }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Graduation Year</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.grad_year }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">For Departments</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.for_departments }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Eligiblity Criteria</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.criteria }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Job Type</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.job_type }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Created at: </h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.created_at }}
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Is active:</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ job.status }}
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>

    <button class="button is-success" @click="download()"> Download Excel</button>
    <button class="button is-success ml-3">
      <router-link :to="{ name: 'job-users', params: { id: job.id }}">Registered Users</router-link>
    </button>
    <button class="button is-primary ml-3" @click="firstShortlist()"> View First Shortlist </button>
    <button class="button is-primary ml-3" @click="secondShortlist()"> View Second Shortlist </button>
    <button class="button is-primary ml-3" @click="thirdShortlist()"> View Third Shortlist </button>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "JobDetail",
  data() {
    return {
      job: {},
      allusers: {},
    }
  },
  mounted() {
    axios.get('/api/v1/jobs/job_detail/', {params: {id: this.$route.params.id}}).then(response => {
      this.job = response.data
    })

    axios.get('/api/v1/jobs/get_all_users/', {params: {id: this.$route.params.id}}).then(response => {
      this.allusers = response.data
    })
  },
  computed: {
    ...mapState(['user'])
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
    download() {
      axios.get('/api/v1/jobs/download_excel/', {
        // If you forget this, your download will be corrupt.
        params: {id: this.$route.params.id},
        responseType: 'blob'
      }).then((response) => {
        // Let's create a link in the document that we'll
        // programmatically 'click'.
        console.log("FIR", response)
        const link = document.createElement('a');

        // Tell the browser to associate the response data to
        // the URL of the link we created above.
        link.href = window.URL.createObjectURL(
            new Blob([response.data])
        );

        // Tell the browser to download, not render, the file.
        link.setAttribute('download', 'consent.xlsx');

        // Place the link in the DOM.
        document.body.appendChild(link);

        // Make the magic happen!
        link.click();
      }); // Please catch me!
    }
  }

}

</script>

<style scoped>

</style>