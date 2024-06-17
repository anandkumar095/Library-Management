<template>
  <div class="login-container">
    <h2 style="margin-top: 10%;">User Login</h2>
    <form @submit.prevent="login">
  <div class="mb-3">
    <label for="username" class="form-label">User Name</label>
    <input type="" class="form-control" v-model="username"  style="width: 25%;margin-left: 37%;">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" v-model="password" style="width: 25%;margin-left: 37%;">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    <br>
    <router-link to="/user-signup">Sign Up</router-link>
    <br>
    <!-- <router-link to="/">Go to Home</router-link> -->
  </div>
</template>

<script>

import router from '@/router';
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try{
        const response=await axios.post('http://127.0.0.1:8000/user-login',
        {
          username:this.username,
          password:this.password,
        });

        localStorage.setItem('access_token',response.data.access_token);
        localStorage.setItem('userRole',response.data.userRole);
        localStorage.setItem('isauthenticated',true)
        localStorage.setItem('userid',response.data.userId)

        // console.log(response.data);
        if (response.status===200 && response.data.userRole==='general'){
          router.push('/dashboard')
        }
        if (response.status===200 && response.data.userRole==='Administrator'){
          router.push('/admin-dashboard')
        }
      }
      catch(error){
        if (error.response && error.response.status === 404) {
        router.push('/doesntExists');
        }
        else if (error.response && error.response.status === 401) {
        router.push('/wrongPassword');
        }
        else{
        console.error("Error while login:", error)
        }

      }
    }
  }
};
</script>

<!-- <style>
.login-container {
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 18px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.router-link {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  text-decoration: none;
  color: #333;
}
</style> -->