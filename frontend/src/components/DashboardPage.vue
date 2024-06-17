<template>
  <div class="container-fluid">
  <div class="row">
    <nav class="nav flex-column col-md-3" id="sidebar" style="background-color: beige;">
      <div class="row">
        
          <!-- <div class="navbar-brand" style="display: flex;"> -->
            <h4><router-link to="/dashboard" @click="reloadPage">Home</router-link></h4>
            <h4><router-link to="/logout" @click="logout">Logout</router-link></h4>
        <!-- </div> -->
        </div>
      <h3 style="margin-top: 20px;">Categories and Genres</h3>
      <button type="button" class="btn btn-link" v-for="section in sections" :key="section.id" @click="fetchBooks(section.id)" style="font-size:large">
        {{section.name}}
      </button>
    </nav>
    <div class="col-md-9" style="padding: 0px;">
      <div class="d-flex flex-wrap">
        <div class="row" style="width: 100%; padding: 0px;">
          <div class="mt-3">
              <form @submit.prevent="searchBooks" class="d-flex" align-items-center>
                <input class="form-control me-2" type="search" placeholder="Search" v-model="searchQuery" aria-label="Search" style="height: 40px;">
                  <select v-model="searchBy" style="width: 100px;margin-right: 15px;height: 38px;">
                    <option value="" disabled>Search By</option>
                    <option v-for="(option, index) in searchOptions" :key="index" :value="option">{{ option }}</option>
                  </select>
                <button class="btn btn-outline-primary" type="submit" style="margin-bottom: 10px;">Search</button>
              </form>
            </div>
            <div class="row">
    <div v-if="isSearching===true" class="search-section">  
      <div v-if="searchedBooks.length > 0" class="search-results">
        <h2>Search Results</h2>
        <button @click="closeSearchResults" type="button" class="close" aria-label="Close">Close Results</button>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Read/Request Access</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in searchedBooks" :key="book.id">
              <td>{{ book.name }}</td>
              <a v-if="book.status === 'issued'" :href="book.link" class="btn btn-primary" target="_blank">Read Book</a>
              <button @click="requestBook(book.id)" class="btn btn-primary" :disabled="book.status !== 'NA'">Request Access</button>
              <button @click="returnBook(book.id)" class="btn btn-primary" :disabled="book.status !== 'issued'">Return</button>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="no-results">No results found</p>
    </div>
          <p class="navbar-brand">My Books</p>
          <!-- <div v-if="mybooks.length>0"> -->
            <div class="card mx-2 mb-2" v-for="book in mybooks" :key="book.id" style="width: 18rem; height: 20rem;">
          <!-- <img src="..." class="card-img-top" alt="..."> -->
          <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class=card-title>Average Rating {{ averageratings[book.id]}}</p>
            <p>Return Date {{ book.return_date }}</p>
            <a v-if="book.status !== 'requested'" :href="book.book_link" class="btn btn-primary" target="_blank">Read Book</a>
            <!-- <button  class="btn btn-primary" :disabled="book.status === 'requested'">Download</button> -->
            <button v-if="book.status==='issued'"  class="btn btn-primary"  @click="returnBook(book.id)">Return</button>
            <p v-if="book.status==='requested'">Awaiting Approval</p>
            <div v-if="book.status==='issued'" class="mt-4">
              <label for="ratingInput">Enter Rating between 0 to 5:</label>
              <input type="number" id="ratingInput" v-model="ratings[book.id]" :disabled="book.status === 'requested'">
              <button class="btn btn-success mt-2" @click="submitRating(book.id)" :disabled="book.status === 'requested'">Submit Rating</button>
  </div>
  </div>
          </div>
          <div div v-if="mybooks.length===0">
            <h3> You dont have any book in your collection</h3>
          </div>
        </div>
      </div>
      
        <br>
        <div class="row" style="width: 100%;">
        <p class="navbar-brand">Available Books</p>
      </div>
        <div class="card mx-2 mb-2" v-for="book in availableBooks" :key="book.id" style="width: 18rem;">
          <!-- <img src="..." class="card-img-top" alt="..."> -->
          <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class=card-title>Average Rating {{ averageratings[book.id]}}</p>
            <button @click="requestBook(book.id)" class="btn btn-primary">Request Access</button>
          </div>
        </div>
      </div>
    </div>
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
    // access_token:localStorage.getItem('access_token'),
    sections:[],
    books:[],
    mybooks:[],
    requestedbookid:'',
    section_id:'',
    returnbookid:'',
    ratings:{},
    averageratings:{},
    ratingdetails:'',
    rated_by:{},
    searchBy:'',
    searchedBooks:[],
    searchQuery:'',
    isSearching:false,
    searchOptions:["Author Name","Book Name"]
  };
},
mounted(){
    this.fetchSections();
    this.fetchBooks();
    this.fetchMyBooks();
    this.getAverageRatings();
  },
computed:{
  isAdmin(){
  return this.userRole=='admin';
  },
  availableBooks() {
  return this.books.filter(book => !this.mybooks.some(mybook => mybook.id === book.id));
  }
  },

  methods: {
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
                localStorage.removeItem('userid');
                localStorage.setItem('isauthenticated',false);
                this.isauthenticated = false;
                this.$router.push('/logout')
            }).catch(error=>{
              if (error.response && error.response.status === 422) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userid');
            localStorage.setItem('isauthenticated', false);
            this.isauthenticated = false;
            this.$router.push('/logout');
            } else {
      console.error('Error logging out:', error);
    }

            })
        },
        async fetchSections(){
      const access_token=localStorage.getItem('access_token')
      try{
        const response=await axios.get('http://127.0.0.1:8000/sections',{
          headers:{
            Authorization:`Bearer ${access_token}`
          }
        });
        this.sections=response.data;
      }catch(error){
        console.error(error.response.data)
      }
    },
    async fetchBooks(section_id=null){
      const access_token=localStorage.getItem('access_token')
      this.section_id=section_id
      let url = 'http://127.0.0.1:8000/book';
      if (section_id !== null) {
        url += `/${section_id}`;
      }
      try{
        const response=await axios.get(url,{
          headers:{
            Authorization:`Bearer ${access_token}`
          }
        });
        this.books=response.data;
        this.fetchMyBooks(section_id);
      }catch(error){
        console.error('error:',error)
        
      }
     
},
async fetchMyBooks(section_id=null){
      const access_token=localStorage.getItem('access_token')
      let url = `http://127.0.0.1:8000/access_book/${this.userId}`;
      if (section_id !== null) {
        url += `/${section_id}`;
      }
      try {
        const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  this.mybooks=response.data;
  // this.fetchBooks();
} 
catch (error) {
  console.error('Error:', error);
}
},
async requestBook(id){
  const access_token=localStorage.getItem('access_token')
  try {
    this.requestedbookid=id;
  const response = await axios.post(`http://127.0.0.1:8000/access_book`, {
    userId: this.userId,
    book_id: this.requestedbookid
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  if (response.status===201){
    console.log(response.data);
  // this.fetchBooks();
  this.fetchMyBooks();
  }
  if(response.status===210){
    alert("Book Limit Reached! You have reached the limit for borrowing books.");
  }
  
} catch (error) {
  console.error('Error:', error);
}
},
reloadPage(){
  window.location.reload();
},

async returnBook(book_id){
const access_token=localStorage.getItem('access_token')
 
try {
    
    this.returnbookid=book_id;
  const response = await axios.delete(`http://127.0.0.1:8000/delete_transaction/${this.userId}/${this.returnbookid}`, 
  {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  console.log(response.data);
  // this.fetchBooks();
  this.fetchMyBooks();
  
} catch (error) {
  console.error('Error:', error);
}
},
async submitRating(book_id){
  const access_token=localStorage.getItem('access_token')
  try {
  const response = await axios.post(`http://127.0.0.1:8000/rate-book`, {
    bookId:book_id,
    rating: this.ratings[book_id],
    userId:this.userId
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  if (response.status===201){
    console.log(response.data);
    this.getAverageRatings();
  // this.fetchBooks();
  }
  if(response.status===210){
    alert("You have already rated the book once. You cant rate again");
  }
  
} catch (error) {
  console.error('Error:', error);
}
},

async getAverageRatings(){
  const access_token=localStorage.getItem('access_token')
  try {
  const response = await axios.get(`http://127.0.0.1:8000/rate-book`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  
    this.ratingdetails=response.data;
    console.log(this.ratingdetails)
    

for (const [bookId, data] of Object.entries(this.ratingdetails)) {
 
  const { average_rating, rated_by } = data;
  this.averageratings[bookId] = average_rating;
  this.rated_by[bookId] = rated_by;
}
console.log(this.averageratings)
console.log(this.rated_by)
  
} catch (error) {
  console.error('Error:', error);
}
},
searchBooks(){
          const access_token = localStorage.getItem('access_token')
          console.log("Searching")
          axios.post('/search',
          {search_query:this.searchQuery,
            user_id:this.userId,
            search_by:this.searchBy},
          {
            headers:{
                    Authorization: `Bearer ${access_token}`
                }
        })
        .then(response =>{
          this.isSearching=true;
          this.searchedBooks=response.data;

        })
        .catch(error=>{
          console.log(error);
        })
  },
  closeSearchResults(){
    this.searchedBooks=[]
    this.searchQuery=''
    this.isSearching=false
  }
}



}


</script>
