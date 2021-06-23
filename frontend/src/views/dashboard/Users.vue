<template>
  <b-container>
    <!--  <div class="container">-->
    <!--    <div class="columns is-multiline">-->
    <div class="column is-12">
      <!--        <h1 class="title">Users</h1>-->

      <!--        &lt;!&ndash;                <router-link &ndash;&gt;-->
      <!--        &lt;!&ndash;                    to="/dashboard/leads/add"&ndash;&gt;-->
      <!--        &lt;!&ndash;                    v-if="$store.state.team.max_leads > num_leads"&ndash;&gt;-->
      <!--        &lt;!&ndash;                >Add lead</router-link>&ndash;&gt;-->

      <form @submit.prevent="getStudents">
        <div class="field has-addons">
          <div class="control">
            <input type="text" class="input" v-model="query" @input="getStudents">
          </div>
          <div class="control">
            <button class="button is-success">Search</button>
          </div>
          <div class="control ml-2">
            <b-form-select  v-model="selected" :options="options" @change="filterStudents"></b-form-select>
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
            v-bind:key="u.id">
          <td>{{ u.roll_no }}</td>
          <td>{{ u.name }}</td>
          <!--                                <td>-->
          <!--                                    <template v-if="lead.assigned_to">{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</template>-->
          <!--                                </td>-->
          <td>{{ u.department }}</td>
          <td>{{ u.graduation_year }}</td>
          <td v-if="user.is_coordinator">
            <router-link :to="{ name: 'user-profile', params: { id: u.id }}">Details</router-link>

          </td>
        </tr>
        </tbody>
      </table>

      <div class="buttons">
        <button class="button is-light" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
        <button class="button is-light" @click="goToNextPage()" v-if="showNextButton">Next</button>
      </div>
    </div>
<!--    </div>-->
<!--    </div>-->

    <!--  <b-table :items="users" :fields="fields" responsive="xs">-->

    <!--    </b-table>-->
  </b-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "Users",
  data() {
    return {
      users: {},
      all_users: {},
      fields: ['roll_no', 'name', 'department', 'graduation_year'],
      showNextButton: false,
      showPreviousButton: false,
      currentPage: 1,
      query: '',
      num_leads: 0,
      selected: null,
      options: [
        // {value: null, text: 'Please select an option'},
        // {value: 'a', text: 'This is First option'},
        // {value: 'b', text: 'Selected Option', disabled: true},
        // {
        //   label: 'Grouped options',
        //   options: [
        //     {value: {C: '3PO'}, text: 'Option with object value'},
        //     {value: {R: '2D2'}, text: 'Another option with object value'}
        //   ]
        // },
        {value: null, text: 'Filter by'},
        {
          label: 'Departments',
          options: [
            {value: 'all', text: 'All Departments'},
            {value: 'CO', text: 'Computer Engineering'},
            {value: 'EC', text: 'Electronics and Communication Engineering'},
            {value: 'CE', text: 'Civil Engineering'},
            {value: 'CH', text: 'Chemical Engineering'},
            {value: 'ME', text: 'Mechanical Engineering'},
          ]
        },
          {
          label: 'Graduation Year',
          options: [
            {value: 'all', text: 'All Years'},
            {value: '2022', text: '2022'},
            {value: '2023', text: '2023'},
            {value: 2024, text: '2024'},
            {value: '2025', text: '2025'},
            {value: '2026', text: '2027'},
            {value: '2027', text: '2028'},
          ]

        },
      ],


    }
  },
  mounted() {
    this.getStudents()
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    goToNextPage() {
      this.currentPage += 1
      this.getStudents()
    },
    goToPreviousPage() {
      this.currentPage -= 1
      this.getStudents()
    },
    filterStudents() {
      let val = this.selected;
      if (this.selected == 'all') {
        this.users = this.all_users
      } else {
        this.users = this.all_users.filter(
            function (e) {
              return e.department == val || e.graduation_year == val;
            }
        )
      }
    },
    async getStudents() {
      this.showNextButton = false
      this.showPreviousButton = false
      await axios.get(`/api/v1/students/`).then(response => {
        console.log(response.data)
        this.num_leads = response.data.count
      })
      await axios.get(`/api/v1/students/?page=${this.currentPage}&search=${this.query}`)
          .then(response => {
            this.users = response.data.results
            this.all_users = response.data.results
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