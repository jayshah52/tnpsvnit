<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title"> Personal Information </h1>
        <form @submit.prevent="UpdateInfo">
          <div class="field">
            <label> Name </label>
            <div class="control">
              <input type="text" name="pname" class="input" :value="user.name">
            </div>
          </div>
          <div class="field">
            <label> Personal Email </label>
            <div class="control">
              <input type="email" name="pmail" :value="user.personal_mail" class="input">
            </div>
          </div>
          <div class="field">
            <label> Phone Number </label>
            <div class="control">
              <input type="text" name="phone" class="input" :value="user.phone_no">
            </div>
          </div>
          <div class="field">
            <label> Admission Number </label>
            <div class="control">
              <input type="text" name="roll_no" class="input" :value="user.roll_no" readonly>
            </div>
          </div>
          <div class="field">
            <label> Gender </label>
            <div class="control">
              <p>Your Gender: {{user.gender}}</p>
              <select class="form-control" id="gender">
                <option>MALE</option>
                <option>FEMALE</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label> Category </label>
            <p>Your Category: {{user.category}}</p>
            <div class="control">
              <select class="form-control" id = "category" >
                <option>GENERAL</option>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>
                <option>OTHERS</option>
              </select>

            </div>
          </div>
          <div class="field">
            <label> Department </label>
            <div class="control">
              <input type="text" name="department" class="input" :value="user.department" readonly>
            </div>
          </div>
          <div class="field">
            <label> Home Town </label>
            <div class="control">
              <input type="text" name="hometown" class="input" :value="user.hometown">
            </div>
          </div>
          <div class="field">
            <label> Date of Birth (dd/mm/yyyy) </label>
            <div class="control">
              <input type="date" name="dob" class="input" :value="user.dob">
            </div>
          </div>
          <div class="field">
            <label> Percentage(10th) </label>
            <div class="control">
              <input type="text" name="p_ten" class="input" :value="user.percentage_ten">
            </div>
          </div>
          <div class="field">
            <label> Percentage(12th) </label>
            <div class="control">
              <input type="text" name="p_twelve" class="input" :value="user.percentage_twelve">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem1) </label>
            <div class="control">
              <input type="text" name="cgpas1" class="input" :value="user.cgpa_s1">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem2) </label>
            <div class="control">
              <input type="text" name="cgpas2" class="input" :value="user.cgpa_s2">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem3) </label>
            <div class="control">
              <input type="text" name="cgpas3" class="input" :value="user.cgpa_s3">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem4) </label>
            <div class="control">
              <input type="text" name="cgpas4" class="input" :value="user.cgpa_s4">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem5) </label>
            <div class="control">
              <input type="text" name="cgpas5" class="input" :value="user.cgpa_s5">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem6) </label>
            <div class="control">
              <input type="text" name="cgpas6" class="input" :value="user.cgpa_s6">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem7) </label>
            <div class="control">
              <input type="text" name="cgpas7" class="input" :value="user.cgpa_s7">
            </div>
          </div>
          <div class="field">
            <label> CGPA (Sem8) </label>
            <div class="control">
              <input type="text" name="cgpas8" class="input" :value="user.cgpa_s8">
            </div>
          </div>
          <div class="field">
            <label> Graduation Year </label>
            <div class="control">
              <input type="text" name="gradyear" class="input" :value="user.graduation_year">
            </div>
          </div>
          <div class="field">
            <label> Resume Link  </label>
            <p> (Don't forget to make the access public)</p>
            <div class="control">
              <input type="text" name="resume_link" class="input" :value="user.resume_link">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success"> Update </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "MyInfo",
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    axios.get('/api/v1/students/student_info').then(response => {
      this.user = response.data
    })
        .catch(error => {
          alert(error)
        })
  },
  methods: {
    editInfo() {
      alert("Editing Info")
    },
    UpdateInfo() {
      // alert("Updated Info")
      const formData = {
        name: document.getElementsByName('pname')[0].value,
      personal_mail: document.getElementsByName('pmail')[0].value,
      phone_no: document.getElementsByName('phone')[0].value,
      hometown:document.getElementsByName('hometown')[0].value,
      percentage_ten:document.getElementsByName('p_ten')[0].value ? document.getElementsByName('p_ten')[0].value : 0,
      percentage_twelve:document.getElementsByName('p_twelve')[0].value ? document.getElementsByName('p_twelve')[0].value : 0,
      cgpa_s1:document.getElementsByName('cgpas1')[0].value ? document.getElementsByName('cgpas1')[0].value:0,
      cgpa_s2:document.getElementsByName('cgpas2')[0].value ? document.getElementsByName('cgpas2')[0].value:0,
      cgpa_s3:document.getElementsByName('cgpas3')[0].value ? document.getElementsByName('cgpas3')[0].value:0,
      cgpa_s4:document.getElementsByName('cgpas4')[0].value ? document.getElementsByName('cgpas4')[0].value:0,
      cgpa_s5:document.getElementsByName('cgpas5')[0].value ? document.getElementsByName('cgpas5')[0].value:0,
      cgpa_s6:document.getElementsByName('cgpas6')[0].value ? document.getElementsByName('cgpas6')[0].value:0,
      cgpa_s7:document.getElementsByName('cgpas7')[0].value ? document.getElementsByName('cgpas7')[0].value:0,
      cgpa_s8:document.getElementsByName('cgpas8')[0].value ? document.getElementsByName('cgpas8')[0].value:0,
      graduation_year:document.getElementsByName('gradyear')[0].value,
      resume_link:document.getElementsByName('resume_link')[0].value,
      dob:document.getElementsByName('dob')[0].value,
        gender:document.getElementById('gender').value,
        category:document.getElementById('category').value,
      }
      axios.post('api/v1/students/update_info/', formData).then(response => {
        // console.log(response.data)
        // alert("Information Updated Successfully")
        toast({
                                message: 'Information Updated Successfully',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'top-right',
                            })
        this.$router.push('/dashboard/my-account')
      })
    }

  }
}
</script>

<style scoped>

</style>