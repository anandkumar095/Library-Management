<template>
  <div>
    <h1>Admin Reports</h1>
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
        <!-- Home and Pending Request Links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin-dashboard" style="margin-top: 15px;">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pending-requests" style="margin-top: 15px;">Pending Requests</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin-reports" style="margin-top: 15px;">Reports</router-link>
          </li>
          <li>
            <div class="mt-3">
              <form @submit.prevent="searchSections" class="d-flex" align-items-center>
                <input class="form-control me-2" type="search" placeholder="Search" v-model="searchQuery" aria-label="Search" style="height: 40px;">
                <button class="btn btn-outline-primary" type="submit" style="margin-bottom: 10px;">Search</button>
              </form>
            </div>
          </li>
        </ul>
        <!-- Logout Button -->
        <button class="btn btn-outline-danger" @click="logout">Logout</button>
      </div>
      </nav>
    </div>
  </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in bookwisedetail" :key="book.id">
            <td>{{ book.bookName }}</td>
            <td>{{ book.userName }}</td>
            <td>
              <button class="btn btn-danger" @click="revokeAccess(book)">Revoke Access</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';
export default{
data(){
  return {
    isauthenticated:JSON.parse(localStorage.getItem('isauthenticated'))|| false,
    userRole:localStorage.getItem('userRole')||'general',
    userId:localStorage.getItem('userid'),
    access_token:localStorage.getItem('access_token'),
    bookwisedetail:[]
  };
},
mounted(){
    this.getBookWiseDetails();
  },
methods: {
    async getBookWiseDetails(){
      const access_token=localStorage.getItem('access_token')
      let url = 'http://127.0.0.1:8000/admin-reports';
      try {
        const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  this.bookwisedetail=response.data;
  // this.fetchBooks();
} 
catch (error) {
  console.error('Error:', error);
}
},
async revokeAccess(book){
  const access_token=localStorage.getItem('access_token')
 
  try {
    
    const book_id=book.bookId;
    const user_id=book.userId;
  const response = await axios.delete(`http://127.0.0.1:8000/reject_request/${user_id}/${book_id}`, 
  {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  console.log(response.data);
  this.getBookWiseDetails();
} catch (error) {
  console.error('Error:', error);
}
},
logout(){
            const access_token = localStorage.getItem('access_token');
            this.$axios.post('http://127.0.0.1:8000/logout',null,{
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })

            .then(()=>{
                localStorage.removeItem('access_token');
                localStorage.removeItem('userRole');
                localStorage.setItem('isauthenticated',false);
                this.isauthenticated = false;
                this.$router.push('/logout')
            })
        }
}
}
</script>