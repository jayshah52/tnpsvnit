<template>
  <div class="container">
    <div class="col-md-8">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Full Name</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.name }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Admission Number</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.roll_no }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Email</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.personal_mail }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Phone</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.phone_no }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Department</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.department }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Graduation Year</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.graduation_year }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Resume Link</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.resume_link }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Category</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.category }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Date of Birth</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.dob }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Percentage (10th)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.percentage_ten }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Percentage (12th)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.percentage_twelve }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem1)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s1 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem2)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s2 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem3)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s3 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem4)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s4 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem5)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s5 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem6)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s6 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem7)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s7 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">CGPA (Sem8)</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ user.cgpa_s8 }}
            </div>
          </div>
          <hr>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    axios.get('/api/v1/students/get_student', {params: {id: this.$route.params.id}}).then(response => {
      this.user = response.data
    })
  }
}
</script>

<style scoped>

</style>