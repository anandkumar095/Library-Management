<template>
  <div class="user-exists-container">
    <h2>User Already Exists</h2>
    <p>The username already exists. Please try logging in or sign up with a different username.</p>
    <div class="links">
      <router-link to="/">Home</router-link>
      <br>
      <router-link to="/user-signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.user-exists-container {
  text-align: center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.links {
  margin-top: 20px;
}

.router-link {
  /* display: inline-block; */
  margin-right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

.router-link:hover {
  background-color: #0056b3;
}
</style>
