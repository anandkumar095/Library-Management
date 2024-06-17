<template>
  <div class="home-container">
    <h2>Welcome to your eLibrary</h2>
    <p>Please select an option:</p>
    <div class="options">
      <router-link to="/user-login">Login</router-link>
      <router-link to="/user-signup">Not a Member. Sign Up!!</router-link>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.home-container {
  text-align: center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
