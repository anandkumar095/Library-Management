<template>
  <div class="container">
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
    <h1 class="mt-3 mb-4">Pending Requests</h1>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Book ID</th>
              <th scope="col">Book Name</th>
              <th scope="col">User ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(request, index) in pendingRequests" :key="index">
              <td>{{ request.bookId }}</td>
              <td>{{ request.bookName }}</td>
              <td>{{ request.userId }}</td>
              <td>{{ request.userName }}</td>
              <td>
                <button class="btn btn-success me-2" @click="approveRequest(request)">Approve</button>
                <button class="btn btn-danger" @click="rejectRequest(request)">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
    pendingRequests:[]
  };
},
mounted(){
    this.getPendingRequests();
  },
methods: {
    async getPendingRequests(){
      const access_token=localStorage.getItem('access_token')
      let url = 'http://127.0.0.1:8000/approve_request';
      try {
        const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  this.pendingRequests=response.data;
  // this.fetchBooks();
} 
catch (error) {
  console.error('Error:', error);
}
},
  async approveRequest(request){
    const access_token=localStorage.getItem('access_token')
    try{
    const response=await axios.put('http://127.0.0.1:8000/approve_request',{
      'book_id':request.bookId,
      'user_id':request.userId},
      {
        'headers':{ Authorization: `Bearer ${access_token}`}
      }
      )
      console.log(response.data)
      this.getPendingRequests()
      }
      catch(error){
        console.error('Error:',error);

      }
  },

  async rejectRequest(request){
  const access_token=localStorage.getItem('access_token')
 
  try {
    
    const book_id=request.bookId;
    const user_id=request.userId;
  const response = await axios.delete(`http://127.0.0.1:8000/reject_request/${user_id}/${book_id}`, 
  {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  console.log(response.data);
  this.getPendingRequests();
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