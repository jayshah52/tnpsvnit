import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from "../views/SignUp";
import Login from "../views/Login";
import store from '../store/index'
import dashboard from "../views/dashboard/dashboard";
import MyAccount from "../views/dashboard/MyAccount";
import MyInfo from "../views/dashboard/MyInfo";
import JobsHome from "../views/jobs/JobsHome";
import AddJob from "../views/jobs/AddJob";
import JobDetail from "../views/jobs/JobDetail";
import UserProfile from "../views/dashboard/UserProfile";
import Users from "../views/dashboard/Users";
import AllJobs from "../views/jobs/AllJobs";
import JobUsers from "../views/jobs/JobUsers";
import Shortlist from "../views/jobs/Shortlist";
import HistoryPage from "../views/jobs/HistoryPage";
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
    {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
    {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/my-account',
    name: 'my-account',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/dashboard/my-info',
    name: 'my-info',
    component: MyInfo,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/dashboard/users',
    name: 'users',
    component: Users,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/dashboard/user/:id',
    name: 'user-profile',
    component: UserProfile,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/jobs',
    name: 'jobs',
    component: JobsHome,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/jobs/all-jobs',
    name: 'alljobs',
    component: AllJobs,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/job/:id/users',
    name: 'job-users',
    component: JobUsers,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/job/:id/shortlist/:number',
    name: 'shortlist',
    component: Shortlist,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/history',
    name: 'history',
    component: HistoryPage,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/job/:id',
    name: 'jobDetail',
    component: JobDetail,
    meta: {
      requireLogin: true
    }
  },
    {
    path: '/jobs/add-jobs',
    name: 'add-jobs',
    component: AddJob,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next)=>{
//   if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
//     next('/login')
//   }
//   else{
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
  if (!(store.state.isAuthenticated) && to.matched.some(record => record.meta.requireLogin)) {
    // alert("Hello", this.$store.state.isAuthenticated)
    console.log("Hello", store.state.isAuthenticated)
    console.log("Bye bye", localStorage.getItem('token'))
  } else {
    next()
  }
})
export default router

