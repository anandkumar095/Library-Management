<template>
  <div class="container-fluid">
    <h2>Admin Dashboard</h2>
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin-dashboard" style="margin-top: 15px;" @click="refreshPage">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pending-requests" style="margin-top: 15px;">Pending Requests</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin-reports" style="margin-top: 15px;">Reports</router-link>
          </li>
          <li>
            <div class="mt-3">
              <form @submit.prevent="searchBooks" class="d-flex" align-items-center>
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
      <div v-if="isSearching===true" >  
      <div v-if="searchedBooks.length > 0">
        <h2>Search Results</h2>
        <button @click="closeSearchResults" type="button" class="btn btn-info" aria-label="Close">Close Results</button>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Edit Book</th>
              <th>Delete Book</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in searchedBooks" :key="book.id">
              <td>{{ book.name }}</td>
              <td><button @click="editBook(book.id, book.name, book.author,book.link,book.section )" class="btn btn-warning" style="width: 100px;">Edit</button></td>
              <td><button  @click="confirmDeleteBook(book.id)" class="btn btn-danger" style="margin-left: 5px; width: 100px;">Delete</button></td>
              
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="no-results">No results found</p>
    </div>
      <nav class="nav flex-column col-md-3" id="sidebar" style="background-color: beige;">
      <h3 style="margin-top: 20px;">Categories and Genres</h3>
      <div v-for="section in sections" :key="section.id">
      <button type="button" class="btn btn-link"  @click="fetchBooks(section.id)" style="font-size:x-large;width:250px;text-align: center;">
        {{section.name}}
      </button>
        <div class="row">
          <div class="col">
            <button @click="editSection(section.id, section.name, section.description)" class="btn btn-link" style="width: 15%;font-size: large;">Edit</button>
          </div>
          <div class="col">
            <button @click="confirmdelete(section.id)" class="btn btn-link" style="width: 15%;font-size: large;">Delete</button>
          </div>  
          <div class="col">
            <button @click="toggleAddingBook(section.id)" class="btn btn-link" style="width: 15%;font-size: large;">Add Book</button>
          </div>  
        </div>
      
      </div>

      <button type="button" class="btn btn-link" @click="createnewsection()" style="font-size:x-large">Create New Category</button>
    </nav>
    <div class="col-md-9" style="align-items: center;">
      <div class="row">
        <div v-if="editingSection" style="align-items: center;">
      <h3>Edit Category</h3>
      <div class="row" style="align-self:center; margin-top: 5%;margin-bottom: 5%;">
          <div class="col-auto">
            <label for="editedSectionName" class="col-form-label" style="font-size: larger;font-weight: bolder;">Category Name</label>
          </div>
          <div class="col-auto">
            <input type="text"  class="form-control" v-model="editedSectionName" placeholder="Category Name">
          </div>
          <div class="col-auto">
            <label for="editedSectionDescription" class="col-form-label" style="font-size: larger;font-weight: bolder;">Category Description</label>
          </div>
          <div class="col-auto">
            <input type="text"  class="form-control" v-model="editedSectionDescription" placeholder="Description">
          </div>
          <div class="row">
          <div class="col">
            <button @click="saveEdit" type="submit" class="btn btn-primary" style="width: 25%;margin-left: 50%;">Save Edit</button>
          </div>
          <div class="col">
            <button @click="cancelEdit" class="btn btn-secondary" style="width: 25%;margin-right: 50%;">Cancel</button>
          </div>
          </div>
      </div>
    </div>
        <div v-if="confirmingBookDelete" style="align-items: center;">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this book?</p>
        <div class="delete-buttons">
          <button @click="deleteBook" class="btn btn-danger" style="width: 15%;margin: 30px;">Yes, Delete</button>
          <button @click="cancelBookDelete" class="btn btn-secondary" style="width: 15%;margin: 30px;">No, Cancel</button>
        </div>
      </div>
      <div v-if="confirmingDelete" style="align-items: center;">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this category?</p>
        <div class="delete-buttons">
          <button @click="deleteSection" class="btn btn-danger" style="width: 15%;margin: 30px;">Yes, Delete</button>
          <button @click="cancelDelete" class="btn btn-secondary" style="width: 15%;margin: 30px;">No, Cancel</button>
        </div>
      </div>
      <div v-if="addingBook">
          <h3>Add Book</h3>
          <form> 
            <div class="row ">
              <div class="col-md-4" style="align-items: center;">
                <label for="newBookName" class="col-form-label" style="font-size: larger;font-weight: bolder;">Book Title</label>
                <input type="text"  class="form-control" v-model="newBookName" placeholder="Book Name">
              </div>
            </div>
    
            <div class="row">
              <div class="col-md-4" style="align-items: center;">
                <label for="newBookAuthor" class="col-form-label" style="font-size: larger;font-weight: bolder;">Book Author</label>
                <input type="text"  class="form-control" v-model="newBookAuthor" placeholder="Book Author">
              </div>
            </div>
        
            <div class="row">
            <div class="col-md-4">
              <label for="newBookLink" class="col-form-label" style="font-size: larger;font-weight: bolder;">File Name(abc.pdf)</label>
              <input type="text"  class="form-control" v-model="newBookLink" placeholder="File Name">
            </div>
          </div>
          <div class="row">  
          <div class="col-md-4">
                <button @click="addBook" class="btn btn-success" style="width: 25%;margin: 15px;">Save</button>
                <button @click="cancelAddBook" class="btn btn-secondary" style="width: 25%;margin: 15px;">Cancel</button>
          </div>
          </div>
      </form>
              </div>
        <div v-if="creatingNewSection===true" style="align-items: center;">
        <form  @submit.prevent="createSection" class="create-section-form"> 
        <div class="row" style="align-self:center; margin-top: 15%;">
          <div class="col-auto">
            <label for="newSectionName" class="col-form-label" style="font-size: larger;font-weight: bolder;">Category Name</label>
          </div>
          <div class="col-auto">
            <input type="text"  class="form-control" v-model="newSectionName" placeholder="Category Name">
          </div>
          <div class="col-auto">
            <label for="newSectionDescription" class="col-form-label" style="font-size: larger;font-weight: bolder;">Category Description</label>
          </div>
          <div class="col-auto">
            <input type="text"  class="form-control" v-model="newSectionDescription" placeholder="Description">
          </div>
          <button type="submit" class="btn btn-primary" style="width: auto;">Create Section</button>
        </div>
      </form>
    </div>
        <div v-if="editingBook">
          <h3>Edit Book</h3>
          <form> 
            <div class="row ">
              <div class="col-md-4" style="align-items: center;">
                <label for="editedBookName" class="col-form-label" style="font-size: larger;font-weight: bolder;">Book Title</label>
                <input type="text"  class="form-control" v-model="editedBookName" placeholder="Book Name">
              </div>
            </div>
    
            <div class="row">
              <div class="col-md-4" style="align-items: center;">
                <label for="editedBookAuthor" class="col-form-label" style="font-size: larger;font-weight: bolder;">Book Author</label>
                <input type="text"  class="form-control" v-model="editedBookAuthor" placeholder="Book Author">
              </div>
            </div>
        
            <div class="row">
            <div class="col-md-4">
              <label for="editedBookLink" class="col-form-label" style="font-size: larger;font-weight: bolder;">File Name(abc.pdf)</label>
              <input type="text"  class="form-control" v-model="editedBookLink" placeholder="File Name">
            </div>
          </div>
          <div class="row">
          <div class="col-md-4">
            <label for="editedBookSection" class="col-form-label" style="font-size: larger;font-weight: bolder;">Category Name</label>
            <select v-model="editedBookSection" style="width: 100%;height: 40px;">
                  <option value="" disabled>Select a Section</option>
                  <option v-for="section in sections" v-bind:key="section.id" :value="section.id">{{ section.name }}</option>
            </select>
          </div>
          </div>
          <div class="row">  
          <div class="col-md-4">
                <button @click="saveBookEdit" class="btn btn-success" style="width: 25%;margin: 15px;">Save</button>
                <button @click="cancelBookEdit" class="btn btn-secondary" style="width: 25%;margin: 15px;">Cancel</button>
          </div>
          </div>
      </form>
              </div>
        <div class="card mx-2 mb-2" v-for="book in books" :key="book.id" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <button @click="editBook(book.id, book.name, book.authors,book.pdf_link,book.section_id )" class="btn btn-warning" style="width: 100px;">Edit</button>
            <button  @click="confirmDeleteBook(book.id)" class="btn btn-danger" style="margin-left: 5px; width: 100px;">Delete</button>
          </div>    
        </div>
      </div>
  </div>
</div>
</div>
</template>


<script>
// import router from '@router';
import axios from 'axios';
export default {
  data() {
    return {
      addingBook:false,
      newBookName:'',
      newBookAuthor:'',
      newBookLink:'',
      newBookSection:'',
      searchQuery:'',
      searchedBooks:[],
      isSearching:false,
      newSectionName:'',
      newSectionDescription:'',
      sections:[],
      section_id:'',
      books:[],
      creatingNewSection:false,
      editingSection:false,
      editedSectionName:'',
      editedSectionId:'',
      editedSectionDescription:'',
      confirmingDelete:false,
      deletedSection:'',
      editingBook:false,
      editingBookId:'',
      editedBookName:'',
      editedBookAuthor:'',
      editedBookLink:'',
      editedBookSection:'',
      confirmingBookDelete:false,
      deletingBookId:'',
      isauthenticated:JSON.parse(localStorage.getItem('isauthenticated'))|| false,
      userRole:localStorage.getItem('userRole'),
    };
  },
  mounted(){
    this.fetchSections();
    this.fetchBooks();
  },
  methods: {
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
    createnewsection(){
      this.creatingNewSection=true;
    },
    async createSection(){
      const access_token=localStorage.getItem('access_token')
      try{
        
        const response= await axios.post('http://127.0.0.1:8000/sections',{
          
          section_name:this.newSectionName,
          section_description:this.newSectionDescription
        },{
          headers:{
            Authorization:`Bearer ${access_token}`
          }
        });
        console.log(response.data);
        this.fetchSections();
        this.creatingNewSection=false;
        this.newSectionName='';
        this.newSectionDescription='';
      }
      catch(error){
        console.error(error.response.data)
      }
    },
    editSection(id,name,description){
      
      this.editingSection=true;
      this.editedSectionId=id;
      this.editedSectionName=name;
      this.editedSectionDescription=description;
    },
    saveEdit(){
      const access_token=localStorage.getItem('access_token')
      axios.put(`http://127.0.0.1:8000/sections/${this.editedSectionId}`,{
        name:this.editedSectionName,
        description:this.editedSectionDescription
      },{
          headers:{
            Authorization:`Bearer ${access_token}`
          }
        })
      .then(response=>{
        console.log(response.data);
        this.fetchSections();
        this.cancelEdit();
        this.isSearching=false;
        this.searchQuery='';
      })
      .catch(error=>{console.error(error.response.data)}
      );
    },
    cancelEdit(){
      this.editingSection=false;
      this.editedSectionName='';
      this.editedSectionDescription='';
    },
    confirmdelete(id){
      this.confirmingDelete=true;
      this.deletedSection=id;
    },
    deleteSection(){
      const access_token=localStorage.getItem('access_token')
      axios.delete(`http://127.0.0.1:8000/sections/${this.deletedSection}`,
      { headers:{
            Authorization:`Bearer ${access_token}`
          }})
        .then(response=>{
        console.log(response.data);
        this.fetchSections();
        this.confirmingDelete=false;
        this.fetchBooks();
      })
      .catch(error=>{
        console.error(error.response.data)
      });
    },
      cancelDelete(){
        this.confirmdelete=false;
        this.deletedSection='';
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
        searchBooks(){
          const access_token = localStorage.getItem('access_token')
          console.log("Searching")
          axios.post('/search',
          {search_query:this.searchQuery,
            },
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
        searchSections(){
          const access_token = localStorage.getItem('access_token')
          console.log("Searching")
          axios.post('/search',
          {search_query:this.searchQuery},
          {
            headers:{
                    Authorization: `Bearer ${access_token}`
                }
        })
        .then(response =>{
          this.searchedSections=response.data;

        })
        .catch(error=>{
          console.log(error);
        })
  },
  toggleAddingBook(sectionID){
    this.addingBook=true;
    this.newBookSection=sectionID;
  },
  async addBook(){
    const access_token = localStorage.getItem('access_token')
    try{
      const response= await axios.post(`http://127.0.0.1:8000/book`,{
          book_name:this.newBookName,
          book_author:this.newBookAuthor,
          section_id:this.newBookSection,
          book_link:this.newBookLink
        },{
          headers:{
            Authorization: `Bearer ${access_token}`
          }
        }
      );
        console.log(response.data);
        this.fetchSections();
      }
      catch(error){
        console.error(error.response.data)
      }
      this.fetchBooks()

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
      }catch(error){
        console.error('error:',error)
        
      }
     
},
    getBooksForSection(sectionId) {
    // Filter the books array to get only the books belonging to the specified sectionId
    return this.books.filter(book => book.section_id === sectionId);
},
    editBook(id,name,author,link,section){
      this.editingBookId=id
      this.editingBook=true;
      this.editedBookName=name;
      this.editedBookAuthor=author;
      this.editedBookLink=link;
      this.editedBookSection=section;
    },
    saveBookEdit(){
      const access_token=localStorage.getItem('access_token')
      axios.put(`http://127.0.0.1:8000/edit_book/${this.editingBookId}`,{
        name:this.editedBookName,
        author:this.editedBookAuthor,
        link:this.editedBookLink,
        section:this.editedBookSection
      },{
          headers:{
            Authorization:`Bearer ${access_token}`
          }
        })
      .then(response=>{
        console.log(response.data);
        this.fetchSections();
        this.cancelBookEdit();
      })
      .catch(error=>{console.error(error.response.data)}
      );
},
cancelBookEdit(){
    this.editingBookId=''
      this.editingBook=false;
      this.editedBookName='';
      this.editedBookAuthor='';
      this.editedBookLink='';
      this.editedBookSection='';
    },
    cancelAddBook(){
    
      this.addingBook=false;
      this.newBookNameBookName='';
      this.newBookAuthor='';
      this.newBookLink='';
      this.newBookSection='';
    },
  confirmDeleteBook(bookId){
    this.confirmingBookDelete=true;
    this.deletingBookId=bookId
  },
  async deleteBook(){
    const access_token=localStorage.getItem('access_token')
      axios.delete(`http://127.0.0.1:8000/delete_book/${this.deletingBookId}`,
      { headers:{
            Authorization:`Bearer ${access_token}`
          }})
        .then(response=>{
        console.log(response.data);
        this.fetchSections();
        this.fetchBooks();
        this.confirmingBookDelete=false;
      })
      .catch(error=>{
        console.error(error.response.data)
      });
    },
      cancelBookDelete(){
        this.confirmingBookDelete=false;
        this.deletingBookId='';
      },
      closeSearchResults(){
    this.searchedBooks=[]
    this.searchQuery=''
    this.isSearching=false
  },
  refreshPage() {
    location.reload();
  }
  }
}

</script>
