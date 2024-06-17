<template>
  <div class="wrong-password-container">
    <h2>Incorrect Password</h2>
    <p>The password entered is incorrect. Please try again.</p>
    <div class="links">
      <router-link to="/user-login">Go Back to Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.wrong-password-container {
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
  display: inline-block;
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
