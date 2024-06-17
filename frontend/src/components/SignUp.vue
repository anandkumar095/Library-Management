<template>
  <div class="login-container">
    <h2 style="margin-top: 10%;">Sign Up</h2>
    <form @submit.prevent="signup">
  <div class="mb-3">
    <label for="username" class="form-label">User Name</label>
    <input type="" class="form-control" v-model="username"  style="width: 25%;margin-left: 37%;">
  </div>
  <div class="mb-3">
    <label for="emailId" class="form-label">Email ID</label>
    <input type="email" class="form-control" v-model="emailId"  style="width: 25%;margin-left: 37%;">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" v-model="password" style="width: 25%;margin-left: 37%;">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    
    <router-link to="/">Login Instead</router-link>
  </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            role: 'general',
            emailId: '',
            errorMessage: ''
        };
    },

    methods: {
        async signup() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/signup', {
                    username: this.username,
                    password: this.password,
                    role: this.role,
                    email: this.emailId
                });
                
                console.log('Signup Successful', response.data);
                this.$router.push("/");
            } catch (error) {
                console.error(error.response.data);
                if (error.response.status === 400) {
                    this.errorMessage = "Username already in use!!";
                } else {
                    this.errorMessage = error.message || 'Failed to sign up';
                }
            }
        }
    }
}
</script>


<style >
</style>