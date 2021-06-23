<template>
<div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title"> Add a Job </h1>
        <form @submit.prevent="addJob" id="jobForm">
          <div class="field">
            <label> Role </label>
            <div class="control">
              <input type="text" placeholder="SDE" name="role" class="input">
            </div>
          </div>
          <div class="field">
            <label> Company Name </label>
            <div class="control">
              <input type="text" name="cname" class="input">
            </div>
          </div>
          <div class="field">
            <label> Company Description </label>
            <div class="control">
              <textarea rows="4" cols="50" name="cdesc" form="jobForm">
              </textarea>
            </div>
          </div>
          <div class="field">
            <label> Job Description </label>
            <div class="control">
              <textarea rows="4" cols="50" name="jdesc" form="jobForm">
              </textarea>
            </div>
          </div>
          <div class="field">
            <label> Eligibility Criteria </label>
            <div class="control">
              <textarea rows="4" cols="50" name="criteria" form="jobForm">
              </textarea>
            </div>
          </div>
          <div class="field">
            <label> CTC (in LPA or TPM) </label>
            <div class="control">
              <input type="text" name="ctc" class="input">
            </div>
          </div>
          <div class="field">
            <label> JOB TYPE </label>
            <div class="control">
              <select class="form-control" id="job_type">
                <option>PLACEMENT</option>
                <option>INTERNSHIP</option>
              </select>
            </div>
          </div>
          <div class="field">
          <select class="mdb-select md-form" multiple id="dept">
      <option value="" disabled selected>Select Departments</option>
      <option value="CO">Computer Engineering</option>
      <option value="EC">Electronics & Communication Engineering</option>
      <option value="EE">Electrical Engineering</option>
      <option value="CE">Civil Engineering</option>
      <option value="CH">Chemical Engineering</option>
            <option value="ME">Mechnical Engineering</option>
    </select>
    <label class="mdb-main-label">Select Department</label>
          </div>
          <div class="field">
            <label> For Batch of </label>
            <div class="control">
              <input type="text" name="gradyear" class="input">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success"> Create Job </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
import {toast} from "bulma-toast";

export default {
  name: "AddJob",
  data(){
    return{
      user:{},
    }
  },
  mounted() {
    // axios.get('/api/v1/students/student_info/').then(response => {
    //   this.user = response.data
    // })
    //     .catch(error => {
    //       alert(error)
    //     })
  },
  computed: {
      ...mapState(['user'])
    },
  methods:{
     getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  this.depts = result
},
    addJob(){
      const formData = {
        role: document.getElementsByName('role')[0].value,
        name: document.getElementsByName('cname')[0].value,
        company_desc: document.getElementsByName('cdesc')[0].value,
        job_desc:document.getElementsByName('jdesc')[0].value,
        ctc:document.getElementsByName('ctc')[0].value,
        grad_year:document.getElementsByName('gradyear')[0].value,
        criteria:document.getElementsByName('criteria')[0].value,
        for_departments: Array.from(document.getElementById("dept").options).filter(option => option.selected).map(option => option.value),
        job_type: document.getElementById('job_type').value,
        created_by: this.user.username,
      }
      axios.post('api/v1/jobs/create_job/', formData).then(response => {
        // console.log(response.data)
        // alert("Job Created Successfully!")
        toast({
                                message: 'Job Created Successfully',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'top-right',
                            })

        this.$router.push('/jobs')
      })
    }

  }
}
</script>

<style scoped>

</style>