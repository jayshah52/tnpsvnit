<template>
    <div class="columns is-multiline">
      <div class="column is-12">
<!--                      {{request.user}}-->
        <button @click="addJob()" v-if="user.is_coordinator" class="button is-info">
          Add Job
        </button>
        <button class="button is-success">
          <router-link to="/jobs/all-jobs" class="navbar-item">All Jobs</router-link>
        </button>
<!--                  {{jobs}}-->
        <div class="container" v-for="job in jobs">
<!--                          <div class="d-md-inline-flex row justify-content-center" >-->
          <div class="card mx-auto">
            <div class="row">
              <!--            <div class="logo ml-3 mb-3"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxDRpxI5gXgaVmnO-VgcVUNOkca91jIpS75Flbzkz5W_5g5_V5&usqp=CAU"></div>-->
              <div class="header right"><i class="fas fa-ellipsis-h"></i></div>
            </div>
            <div class="card-title">
              <p class="heading">{{ job.role }}&nbsp;<i class="far fa-compass"></i></p>
            </div>
            <p class="text-muted">{{ job.name }}</p>
            <div class="row btnrow my-4">
              <div class="col-4 col-md-3">
                <button type="button" class="btn btn-outline-success btn-sm" style="background: #00ff002b;">
                  {{ job.job_type }}
                </button>
              </div>
              <div class="col-4 col-md-3">
                <button type="button" class="btn btn-outline-primary btn-sm" style="background: #007bff33;">
                  {{ job.ctc }} LPA
                </button>
              </div>
              <!--            <div class="col-4 col-md-3"><button type="button" class="btn btn-outline-danger btn-sm" style="background: #dc35452e;">-->
              <!--              {{ job.for_departments }}</button></div>-->
            </div>
            <!--        <div class="mutual"><i class="fas fa-users"></i>&nbsp;&nbsp;<span>5 Friends work here</span></div>-->
            <div class="row btnsubmit mt-4">
              <div class="col-md-6 col-6">
                <button type="button" @click="viewJob(job.id)" class="btn btn-primary btn-lg"><span>View</span></button>
              </div>
              <!--            <div class="col-md-6 col-6">  </div>-->
              <div class="col-md-6 col-6">
                <button type="button" v-if="job.users.includes(user.id)" class="btn btn-dark btn-lg disabled"><span>Already Registered</span>
                </button>
                <button type="button" v-else @click="register(job.id)" class="btn btn-dark btn-lg"><span>Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!--        </div>-->
      </div>
    </div>
<!--  <b-container>-->
<!--    <b-row>-->
<!--    <b-card-group class="col-md-4 col-xs-12" v-for="job in jobs">-->
<!--        <b-card :title="job.role">-->
<!--            <p class="card-text">-->
<!--                {{job.name}}-->
<!--            </p>-->
<!--            <p class="card-text">-->
<!--                {{job.ctc}}-->
<!--            </p>-->
<!--            <div slot="footer" class="ml-4">-->
<!--                <b-btn variant="primary" block>Add</b-btn>-->
<!--            </div>-->
<!--          <div slot="footer" class="ml-4">-->
<!--                <b-btn variant="primary" block>Add</b-btn>-->
<!--            </div>-->
<!--        </b-card>-->
<!--    </b-card-group>-->
<!--  </b-row>-->
<!--  </b-container>-->
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "JobsHome",
  data() {
    return {
      // user: {},
      jobs: {},
      allusers: {},
    }
  },
  mounted() {
    // axios.get('/api/v1/students/student_info/').then(response => {
    //   this.user = response.data
    // })
    //     .catch(error => {
    //       alert(error)
    //     })
    axios.get('/api/v1/jobs/get_all_jobs/').then(response => {
      this.jobs = response.data
    })
        .catch(error => {
          alert(error)
        })

  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    addJob() {
      this.$router.push('/jobs/add-jobs')
    },
    viewJob(id) {
      this.$router.push({name: 'jobDetail', params: {id: id}})
    },
    register(id) {
      axios.post('/api/v1/jobs/register/', {id: id}).then(response => {

        // window.location.reload()
      })
    },
    // async registeredStudents(){
    //   await axios.get(`/api/v1/job_student/`,{params: {id: this.$route.params.id}}).then(response => {
    //     console.log(response.data)
    //     this.num_leads = response.data.count
    //   })
    // }
  }

}
</script>

<style scoped>
.card {
  display: block;
  padding: 3vh 2vh 7vh 5vh;
  border: none;
  border-radius: 15px;
  margin-top: 5%;
  margin-bottom: 5%;
  max-width: 500px
}

.header {
  margin-bottom: 5vh;
  margin-right: 2vh;
  float: right;
  margin-left: auto
}

.far {
  color: rgba(15, 198, 239, 0.97) !important;
  font-size: 16px !important
}

p.heading {
  font-weight: bold;
  font-size: 25px
}

p.text-muted {
  font-size: 17px;
  font-weight: bold;
  color: #a1a7ae !important
}

.btn-sm {
  border-radius: 8px
}

.fas.fa-users {
  color: rgba(15, 198, 239, 0.97) !important
}

.mutual span {
  font-size: 14px;
  color: #adb5bd;
  font-weight: bold
}

.btn-primary.btn-lg {
  border-radius: 30px;
  width: 90%;
  border: none;
  background: #8c02e3
}

.btn-dark.btn-lg {
  border-radius: 30px;
  width: 90%;
  border: none;
  background: #dee2e6
}

.btn-dark span {
  font-size: 14px;
  text-align: center;
  color: #0000008c;
  font-weight: bold
}

.btn-primary span {
  font-size: 14px;
  text-align: center;
  color: #fff;
  font-weight: bold
}
</style>