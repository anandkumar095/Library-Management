<template>
  <div class="doesnt-exist-container">
    <h2>User Doesn't Exist</h2>
    <p>{{ message }}</p>
    <router-link to="/user-signup">Sign Up</router-link>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'The username does not exist. Please sign up to create an account.',
    };
  },
};
</script>

<!-- <style scoped>
.doesnt-exist-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
}

router-link {
  display: block;
  margin-bottom: 10px;
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style> -->
