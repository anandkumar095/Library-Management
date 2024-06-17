import { createRouter, createWebHistory} from 'vue-router';
import DashboardPage from '../components/DashboardPage.vue';
import SignUp from '../components/SignUp.vue';
import UserLogin from '../components/UserLogin.vue';
import doesntExists from '../components/doesntExists.vue';
import UserExists from '../components/UserExists.vue';
import WrongPassword from '../components/WrongPassword.vue';
import AdminDashboardrevised from '../components/AdminDashboardrevised.vue';
import Logout from '../components/Logout.vue'
import PendingRequests from '../components/PendingRequests.vue'
import AdminReports  from '../components/AdminReports.vue'
const routes = [
  {
    path:'/dashboard',
    name:'DashboardPage',
    component: DashboardPage,
    meta:{isGeneral:true}
  },
  {
    path:'/',
    name:UserLogin,
    component:UserLogin,
  },
  {
    path:'/user-login',
    name:UserLogin,
    component:UserLogin
  },
  
  {
    path:'/user-signup',
    name:SignUp,
    component:SignUp
  },
  
  {path:'/doesntExists',
  name:doesntExists,
  component:doesntExists
  },
  {
  path:'/userExists',
  name:UserExists,
  component:UserExists
  },
  {
    path:'/WrongPassword',
    name:WrongPassword,
    component:WrongPassword
    },
    {
      path:'/admin-dashboard',
      name:'AdminDashboard',
      component: AdminDashboardrevised,
      meta:{isAdmin:true}
    },
    {
      path:'/logout',
      name:'Logout',
      component: Logout
    },
    {
      path:'/pending-requests',
      name:'Pending Requests',
      component:PendingRequests,
      meta:{isAdmin:true}
    },
    {
      path:'/admin-reports',
      name:'Admin Reports',
      component:AdminReports,
      meta:{isAdmin:true}
    }
  ]

const router=createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole') || 'general';
  if (to.meta.isAdmin && userRole !== 'Administrator') {
    next({ path: '/user-login', query: { unauthorized: true } });
  }
  else if (to.meta.isGeneral && userRole !== 'general') {
    next({ path: '/user-login', query: { unauthorized: true } });
  }
  else{
    next();
  }
});


export default router  // creating all routes
