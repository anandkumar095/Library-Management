(function(){"use strict";var e={4856:function(e,t,o){var s=o(5130),n=o(6768);function a(e,t){const o=(0,n.g2)("router-link"),s=(0,n.g2)("router-view");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.Lk)("nav",null,[(0,n.bF)(o,{to:"/user-login"},{default:(0,n.k6)((()=>[(0,n.eW)("User Login")])),_:1}),(0,n.eW)(" | ")]),(0,n.bF)(s)],64)}var r=o(1241);const i={},l=(0,r.A)(i,[["render",a]]);var c=l,d=o(1387),u=o(4232);const k={class:"container-fluid"},h={class:"row"},g={class:"nav flex-column col-md-3",id:"sidebar",style:{"background-color":"beige"}},p={class:"row"},m=(0,n.Lk)("h3",{style:{"margin-top":"20px"}},"Categories and Genres",-1),b=["onClick"],L={class:"col-md-9"},v={class:"d-flex flex-wrap"},f={class:"row",style:{width:"100%"}},y={class:"mt-3"},S=(0,n.Lk)("button",{class:"btn btn-outline-primary",type:"submit",style:{"margin-bottom":"10px"}},"Search",-1),w={class:"row"},_={class:"search-section"},I={key:0,class:"search-results"},A=(0,n.Lk)("h2",null,"Search Results",-1),B=(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",null,"Book Name")])],-1),C=["disabled"],E=["onClick"],R={key:1,class:"no-results"},q=(0,n.Lk)("p",{class:"navbar-brand"},"My Books",-1),x={class:"card-body"},D={class:"card-title"},N={class:"card-title"},$=["href"],X=["disabled","onClick"],U={class:"mt-4"},F=(0,n.Lk)("label",{for:"ratingInput"},"Enter Rating between 0 to 5:",-1),P=["onUpdate:modelValue","disabled"],z=["onClick","disabled"],W=(0,n.Lk)("br",null,null,-1),j=(0,n.Lk)("div",{class:"row",style:{width:"100%"}},[(0,n.Lk)("p",{class:"navbar-brand"},"Available Books")],-1),J={class:"card-body"},O={class:"card-title"},Q={class:"card-title"},V=["onClick"];function K(e,t,o,a,r,i){const l=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",k,[(0,n.Lk)("div",h,[(0,n.Lk)("nav",g,[(0,n.Lk)("div",p,[(0,n.Lk)("h4",null,[(0,n.bF)(l,{to:"/dashboard",onClick:i.reloadPage},{default:(0,n.k6)((()=>[(0,n.eW)("Home")])),_:1},8,["onClick"])]),(0,n.Lk)("h4",null,[(0,n.bF)(l,{to:"/logout",onClick:i.logout},{default:(0,n.k6)((()=>[(0,n.eW)("Logout")])),_:1},8,["onClick"])])]),m,((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.sections,(e=>((0,n.uX)(),(0,n.CE)("button",{type:"button",class:"btn btn-link",key:e.id,onClick:t=>i.fetchBooks(e.id),style:{"font-size":"large"}},(0,u.v_)(e.name),9,b)))),128))]),(0,n.Lk)("div",L,[(0,n.Lk)("div",v,[(0,n.Lk)("div",f,[(0,n.Lk)("div",y,[(0,n.Lk)("form",{onSubmit:t[1]||(t[1]=(0,s.D$)(((...e)=>i.searchBooks&&i.searchBooks(...e)),["prevent"])),class:"d-flex","align-items-center":""},[(0,n.bo)((0,n.Lk)("input",{class:"form-control me-2",type:"search",placeholder:"Search","onUpdate:modelValue":t[0]||(t[0]=t=>e.searchQuery=t),"aria-label":"Search",style:{height:"40px"}},null,512),[[s.Jo,e.searchQuery]]),S],32)]),(0,n.Lk)("div",w,[(0,n.Lk)("div",_,[r.searchedBooks.length>0?((0,n.uX)(),(0,n.CE)("div",I,[A,(0,n.Lk)("table",null,[B,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.searchedBooks,(e=>((0,n.uX)(),(0,n.CE)("tr",{key:e.id},[(0,n.Lk)("td",null,(0,u.v_)(e.name),1),(0,n.Lk)("button",{class:"btn btn-primary",disabled:"requested"===e.status},"Download",8,C),(0,n.Lk)("button",{onClick:t=>i.requestBook(e.id),class:"btn btn-primary"},"Request Access",8,E)])))),128))])])])):((0,n.uX)(),(0,n.CE)("p",R,"No results found"))]),q,((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.mybooks,(e=>((0,n.uX)(),(0,n.CE)("div",{class:"card mx-2 mb-2",key:e.id,style:{width:"18rem"}},[(0,n.Lk)("div",x,[(0,n.Lk)("h5",D,(0,u.v_)(e.name),1),(0,n.Lk)("p",N,"Average Rating "+(0,u.v_)(r.averageratings[e.id]),1),"requested"!==e.status?((0,n.uX)(),(0,n.CE)("a",{key:0,href:e.book_link,class:"btn btn-primary",target:"_blank"},"Download",8,$)):(0,n.Q3)("",!0),(0,n.Lk)("button",{class:"btn btn-primary",disabled:"requested"===e.status,onClick:t=>i.returnBook(e.id)},"Return",8,X),(0,n.Lk)("div",U,[F,(0,n.bo)((0,n.Lk)("input",{type:"number",id:"ratingInput","onUpdate:modelValue":t=>r.ratings[e.id]=t,disabled:"requested"===e.status},null,8,P),[[s.Jo,r.ratings[e.id]]]),(0,n.Lk)("button",{class:"btn btn-success mt-2",onClick:t=>i.submitRating(e.id),disabled:"requested"===e.status},"Submit Rating",8,z)])])])))),128))])]),W,j,((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(i.availableBooks,(e=>((0,n.uX)(),(0,n.CE)("div",{class:"card mx-2 mb-2",key:e.id,style:{width:"18rem"}},[(0,n.Lk)("div",J,[(0,n.Lk)("h5",O,(0,u.v_)(e.name),1),(0,n.Lk)("h3",Q,(0,u.v_)(r.averageratings[e.id]),1),(0,n.Lk)("button",{onClick:t=>i.requestBook(e.id),class:"btn btn-primary"},"Request Access",8,V)])])))),128))])])])])}o(4114);var M=o(8355),T={data(){return{isauthenticated:JSON.parse(localStorage.getItem("isauthenticated"))||!1,userRole:localStorage.getItem("userRole")||"general",userId:localStorage.getItem("userid"),sections:[],books:[],mybooks:[],requestedbookid:"",section_id:"",returnbookid:"",ratings:{},averageratings:{},ratingdetails:"",rated_by:{},searchedBooks:[]}},mounted(){this.fetchSections(),this.fetchBooks(),this.fetchMyBooks(),this.getAverageRatings()},computed:{isAdmin(){return"admin"==this.userRole},availableBooks(){return this.books.filter((e=>!this.mybooks.some((t=>t.id===e.id))))}},methods:{logout(){const e=localStorage.getItem("access_token");this.$axios.post("http://127.0.0.1:8000/logout",null,{headers:{Authorization:`Bearer ${e}`}}).then((()=>{localStorage.removeItem("access_token"),localStorage.removeItem("userRole"),localStorage.removeItem("userid"),localStorage.setItem("isauthenticated",!1),this.isauthenticated=!1,this.$router.push("/logout")}))},async fetchSections(){const e=localStorage.getItem("access_token");try{const t=await M.A.get("http://127.0.0.1:8000/sections",{headers:{Authorization:`Bearer ${e}`}});this.sections=t.data}catch(t){console.error(t.response.data)}},async fetchBooks(e=null){const t=localStorage.getItem("access_token");this.section_id=e;let o="http://127.0.0.1:8000/book";null!==e&&(o+=`/${e}`);try{const s=await M.A.get(o,{headers:{Authorization:`Bearer ${t}`}});this.books=s.data,this.fetchMyBooks(e)}catch(s){console.error("error:",s)}},async fetchMyBooks(e=null){const t=localStorage.getItem("access_token");let o=`http://127.0.0.1:8000/access_book/${this.userId}`;null!==e&&(o+=`/${e}`);try{const e=await M.A.get(o,{headers:{Authorization:`Bearer ${t}`}});this.mybooks=e.data}catch(s){console.error("Error:",s)}},async requestBook(e){const t=localStorage.getItem("access_token");try{this.requestedbookid=e;const o=await M.A.post("http://127.0.0.1:8000/access_book",{userId:this.userId,book_id:this.requestedbookid},{headers:{Authorization:`Bearer ${t}`}});201===o.status&&(console.log(o.data),this.fetchMyBooks()),210===o.status&&alert("Book Limit Reached! You have reached the limit for borrowing books.")}catch(o){console.error("Error:",o)}},reloadPage(){window.location.reload()},async returnBook(e){const t=localStorage.getItem("access_token");try{this.returnbookid=e;const o=await M.A.delete(`http://127.0.0.1:8000/delete_transaction/${this.userId}/${this.returnbookid}`,{headers:{Authorization:`Bearer ${t}`}});console.log(o.data),this.fetchMyBooks()}catch(o){console.error("Error:",o)}},async submitRating(e){const t=localStorage.getItem("access_token");try{const o=await M.A.post("http://127.0.0.1:8000/rate-book",{bookId:e,rating:this.ratings[e],userId:this.userId},{headers:{Authorization:`Bearer ${t}`}});201===o.status&&(console.log(o.data),this.getAverageRatings()),210===o.status&&alert("You have already rated the book once. You cant rate again")}catch(o){console.error("Error:",o)}},async getAverageRatings(){const e=localStorage.getItem("access_token");try{const t=await M.A.get("http://127.0.0.1:8000/rate-book",{headers:{Authorization:`Bearer ${e}`}});this.ratingdetails=t.data,console.log(this.ratingdetails);for(const[e,o]of Object.entries(this.ratingdetails)){const{average_rating:t,rated_by:s}=o;this.averageratings[e]=t,this.rated_by[e]=s}console.log(this.averageratings),console.log(this.rated_by)}catch(t){console.error("Error:",t)}},searchBooks(){const e=localStorage.getItem("access_token");console.log("Searching"),M.A.post("/search",{search_query:this.searchQuery},{headers:{Authorization:`Bearer ${e}`}}).then((e=>{this.searchedBooks=e.data})).catch((e=>{console.log(e)}))}}};const Y=(0,r.A)(T,[["render",K]]);var H=Y;const G=(0,n.Lk)("h2",null,"Signup",-1),Z=(0,n.Lk)("label",{for:"username"},"Username",-1),ee=(0,n.Lk)("label",{for:"email"},"Email",-1),te=(0,n.Lk)("label",{for:"password"},"password",-1),oe=(0,n.Lk)("button",{type:"submit"},"Signup",-1);function se(e,t,o,a,r,i){return(0,n.uX)(),(0,n.CE)("div",null,[G,(0,n.Lk)("form",{onSubmit:t[3]||(t[3]=(0,s.D$)(((...e)=>i.signup&&i.signup(...e)),["prevent"]))},[Z,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"name","onUpdate:modelValue":t[0]||(t[0]=e=>r.username=e),required:""},null,512),[[s.Jo,r.username]]),ee,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"emailId","onUpdate:modelValue":t[1]||(t[1]=e=>r.emailId=e),required:""},null,512),[[s.Jo,r.emailId]]),te,(0,n.bo)((0,n.Lk)("input",{type:"password",id:"password","onUpdate:modelValue":t[2]||(t[2]=e=>r.password=e),required:""},null,512),[[s.Jo,r.password]]),oe],32)])}var ne={data(){return{username:"",password:"",role:"general",emailId:""}},methods:{async signup(){try{const e=await M.A.post("http://127.0.0.1:8000/signup",{username:this.username,password:this.password,role:this.role,email:this.emailId});console.log("Singup Succesful",e.data),this.$router.push("/")}catch(e){console.error(e.response.data)}}}};const ae=(0,r.A)(ne,[["render",se]]);var re=ae;const ie={class:"login-container"},le=(0,n.Lk)("h2",null,"User Login",-1),ce={class:"form-group"},de=(0,n.Lk)("label",{for:"username"},"Username:",-1),ue={class:"form-group"},ke=(0,n.Lk)("label",{for:"password"},"Password:",-1),he=(0,n.Lk)("button",{type:"submit"},"Login",-1),ge=(0,n.Lk)("br",null,null,-1),pe=(0,n.Lk)("br",null,null,-1);function me(e,t,o,a,r,i){const l=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",ie,[le,(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,s.D$)(((...e)=>i.login&&i.login(...e)),["prevent"]))},[(0,n.Lk)("div",ce,[de,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"username","onUpdate:modelValue":t[0]||(t[0]=e=>r.username=e),required:""},null,512),[[s.Jo,r.username]])]),(0,n.Lk)("div",ue,[ke,(0,n.bo)((0,n.Lk)("input",{type:"password",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>r.password=e),required:""},null,512),[[s.Jo,r.password]])]),he],32),ge,(0,n.bF)(l,{to:"/user-signup"},{default:(0,n.k6)((()=>[(0,n.eW)("Sign Up")])),_:1}),pe])}var be={data(){return{username:"",password:""}},methods:{async login(){try{const e=await M.A.post("http://127.0.0.1:8000/user-login",{username:this.username,password:this.password});localStorage.setItem("access_token",e.data.access_token),localStorage.setItem("userRole",e.data.userRole),localStorage.setItem("isauthenticated",!0),localStorage.setItem("userid",e.data.userId),200===e.status&&"general"===e.data.userRole&&Ao.push("/dashboard"),200===e.status&&"Administrator"===e.data.userRole&&Ao.push("/admin-dashboard")}catch(e){e.response&&404===e.response.status?Ao.push("/doesntExists"):e.response&&401===e.response.status?Ao.push("/wrongPassword"):console.error("Error while login:",e)}}}};const Le=(0,r.A)(be,[["render",me]]);var ve=Le;const fe={class:"doesnt-exist-container"},ye=(0,n.Lk)("h2",null,"User Doesn't Exist",-1);function Se(e,t,o,s,a,r){const i=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",fe,[ye,(0,n.Lk)("p",null,(0,u.v_)(a.message),1),(0,n.bF)(i,{to:"/user-signup"},{default:(0,n.k6)((()=>[(0,n.eW)("Sign Up")])),_:1}),(0,n.bF)(i,{to:"/"},{default:(0,n.k6)((()=>[(0,n.eW)("Go to Home")])),_:1})])}var we={data(){return{message:"The username does not exist. Please sign up to create an account."}}};const _e=(0,r.A)(we,[["render",Se]]);var Ie=_e;const Ae=e=>((0,n.Qi)("data-v-3cecfde9"),e=e(),(0,n.jt)(),e),Be={class:"home-container"},Ce=Ae((()=>(0,n.Lk)("h2",null,"Welcome to your eLibrary",-1))),Ee=Ae((()=>(0,n.Lk)("p",null,"Please select an option:",-1))),Re={class:"options"};function qe(e,t,o,s,a,r){const i=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",Be,[Ce,Ee,(0,n.Lk)("div",Re,[(0,n.bF)(i,{to:"/user-login"},{default:(0,n.k6)((()=>[(0,n.eW)("Login")])),_:1}),(0,n.bF)(i,{to:"/user-signup"},{default:(0,n.k6)((()=>[(0,n.eW)("Not a Member. Sign Up!!")])),_:1})])])}var xe={};const De=(0,r.A)(xe,[["render",qe],["__scopeId","data-v-3cecfde9"]]);var Ne=De;const $e=e=>((0,n.Qi)("data-v-c30810c6"),e=e(),(0,n.jt)(),e),Xe={class:"user-exists-container"},Ue=$e((()=>(0,n.Lk)("h2",null,"User Already Exists",-1))),Fe=$e((()=>(0,n.Lk)("p",null,"The username already exists. Please try logging in or sign up with a different username.",-1))),Pe={class:"links"},ze=$e((()=>(0,n.Lk)("br",null,null,-1)));function We(e,t,o,s,a,r){const i=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",Xe,[Ue,Fe,(0,n.Lk)("div",Pe,[(0,n.bF)(i,{to:"/"},{default:(0,n.k6)((()=>[(0,n.eW)("Home")])),_:1}),ze,(0,n.bF)(i,{to:"/user-signup"},{default:(0,n.k6)((()=>[(0,n.eW)("Sign Up")])),_:1})])])}var je={};const Je=(0,r.A)(je,[["render",We],["__scopeId","data-v-c30810c6"]]);var Oe=Je;const Qe=e=>((0,n.Qi)("data-v-609d55d2"),e=e(),(0,n.jt)(),e),Ve={class:"wrong-password-container"},Ke=Qe((()=>(0,n.Lk)("h2",null,"Incorrect Password",-1))),Me=Qe((()=>(0,n.Lk)("p",null,"The password entered is incorrect. Please try again.",-1))),Te={class:"links"};function Ye(e,t,o,s,a,r){const i=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",Ve,[Ke,Me,(0,n.Lk)("div",Te,[(0,n.bF)(i,{to:"/user-login"},{default:(0,n.k6)((()=>[(0,n.eW)("Go Back to Login")])),_:1})])])}var He={};const Ge=(0,r.A)(He,[["render",Ye],["__scopeId","data-v-609d55d2"]]);var Ze=Ge;const et=e=>((0,n.Qi)("data-v-7500fa48"),e=e(),(0,n.jt)(),e),tt={class:"container-fluid"},ot=et((()=>(0,n.Lk)("h2",null,"Admin Dashboard",-1))),st={class:"row"},nt={class:"navbar navbar-expand-lg navbar-light bg-light"},at={class:"container-fluid"},rt={class:"navbar-nav me-auto mb-2 mb-lg-0"},it={class:"nav-item"},lt={class:"nav-item"},ct={class:"nav-item"},dt={class:"mt-3"},ut=et((()=>(0,n.Lk)("button",{class:"btn btn-outline-primary",type:"submit",style:{"margin-bottom":"10px"}},"Search",-1))),kt={class:"row"},ht={class:"search-section"},gt={key:0,class:"search-results"},pt=et((()=>(0,n.Lk)("h2",null,"Search Results",-1))),mt=et((()=>(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",null,"Category Name"),(0,n.Lk)("th",null,"Category Description")])],-1))),bt={key:1,class:"no-results"},Lt=et((()=>(0,n.Lk)("div",{clas:"row"},"Pending Request",-1))),vt={class:"create-section"},ft=et((()=>(0,n.Lk)("h3",null,"Create Category",-1))),yt=et((()=>(0,n.Lk)("label",{for:"newSectionName"},"Section Name:",-1))),St=et((()=>(0,n.Lk)("label",{for:"newSectionDescription"},"Section Description:",-1))),wt=et((()=>(0,n.Lk)("button",{type:"submit",class:"create-button"},"Create Section",-1))),_t={class:"existing-sections"},It=et((()=>(0,n.Lk)("h3",null,"Existing Sections",-1))),At={class:"section-details"},Bt={class:"section-name"},Ct={class:"section-actions"},Et=["onClick"],Rt=["onClick"],qt=["onClick"],xt={class:"book-list"},Dt={key:0,class:"add-book-section"},Nt=et((()=>(0,n.Lk)("label",{for:"newBookName"}," Enter Book Name",-1))),$t=et((()=>(0,n.Lk)("label",{for:"newBookAuthorName"},"Enter Author Name",-1))),Xt=et((()=>(0,n.Lk)("label",{for:"newBookLink"},"Provide Link for the pdf",-1))),Ut={key:0,class:"edit-section"},Ft=et((()=>(0,n.Lk)("h3",null,"Edit Category",-1))),Pt=et((()=>(0,n.Lk)("label",{for:"editedSectionName"},"New Section Name:",-1))),zt=et((()=>(0,n.Lk)("label",{for:"editedSectionDescription"},"New Section Description:",-1))),Wt={class:"edit-buttons"},jt={key:1,class:"confirm-delete"},Jt=et((()=>(0,n.Lk)("h3",null,"Confirm Delete",-1))),Ot=et((()=>(0,n.Lk)("p",null,"Are you sure you want to delete this section?",-1))),Qt={class:"delete-buttons"};function Vt(e,t,o,a,r,i){const l=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.Lk)("div",tt,[ot,(0,n.Lk)("div",st,[(0,n.Lk)("nav",nt,[(0,n.Lk)("div",at,[(0,n.Lk)("ul",rt,[(0,n.Lk)("li",it,[(0,n.bF)(l,{class:"nav-link",to:"/dashboard",style:{"margin-top":"15px"}},{default:(0,n.k6)((()=>[(0,n.eW)("Home")])),_:1})]),(0,n.Lk)("li",lt,[(0,n.bF)(l,{class:"nav-link",to:"/pending-requests",style:{"margin-top":"15px"}},{default:(0,n.k6)((()=>[(0,n.eW)("Pending Requests")])),_:1})]),(0,n.Lk)("li",ct,[(0,n.bF)(l,{class:"nav-link",to:"/admin-reports",style:{"margin-top":"15px"}},{default:(0,n.k6)((()=>[(0,n.eW)("Reports")])),_:1})]),(0,n.Lk)("li",null,[(0,n.Lk)("div",dt,[(0,n.Lk)("form",{onSubmit:t[1]||(t[1]=(0,s.D$)(((...e)=>i.searchSections&&i.searchSections(...e)),["prevent"])),class:"d-flex","align-items-center":""},[(0,n.bo)((0,n.Lk)("input",{class:"form-control me-2",type:"search",placeholder:"Search","onUpdate:modelValue":t[0]||(t[0]=e=>r.searchQuery=e),"aria-label":"Search",style:{height:"40px"}},null,512),[[s.Jo,r.searchQuery]]),ut],32)])])]),(0,n.Lk)("button",{class:"btn btn-outline-danger",onClick:t[2]||(t[2]=(...e)=>i.logout&&i.logout(...e))},"Logout")])])])]),(0,n.Lk)("div",kt,[(0,n.Lk)("div",ht,[r.searchedSections.length>0?((0,n.uX)(),(0,n.CE)("div",gt,[pt,(0,n.Lk)("table",null,[mt,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.searchedSections,(e=>((0,n.uX)(),(0,n.CE)("tr",{key:e.id},[(0,n.Lk)("td",null,(0,u.v_)(e.name),1),(0,n.Lk)("td",null,(0,u.v_)(e.description),1)])))),128))])])])):((0,n.uX)(),(0,n.CE)("p",bt,"No results found"))]),Lt,(0,n.Lk)("div",vt,[ft,(0,n.Lk)("form",{onSubmit:t[5]||(t[5]=(0,s.D$)(((...e)=>i.createSection&&i.createSection(...e)),["prevent"])),class:"create-section-form"},[yt,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"newSection","onUpdate:modelValue":t[3]||(t[3]=e=>r.newSectionName=e),required:"",class:"create-input"},null,512),[[s.Jo,r.newSectionName]]),St,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"newSectionDescription","onUpdate:modelValue":t[4]||(t[4]=e=>r.newSectionDescription=e),class:"create-input"},null,512),[[s.Jo,r.newSectionDescription]]),wt],32)]),(0,n.Lk)("div",_t,[It,(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.sections,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e.id,class:"section-item"},[(0,n.Lk)("div",At,[(0,n.Lk)("span",Bt,(0,u.v_)(e.name),1)]),(0,n.Lk)("div",Ct,[(0,n.Lk)("button",{onClick:t=>i.editSection(e.id,e.name,e.description),class:"edit-button"},"Edit",8,Et),(0,n.Lk)("button",{onClick:t=>i.confirmdelete(e.id),class:"delete-button"},"Delete",8,Rt),(0,n.Lk)("button",{onClick:t=>i.toggleAddingBook(e.id),class:"add-book-button"},"Add Book",8,qt)]),(0,n.Lk)("ul",xt,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(i.getBooksForSection(e.id),(e=>((0,n.uX)(),(0,n.CE)("li",{key:e.id,class:"book-item"},(0,u.v_)(e.name),1)))),128))])])))),128)),r.addingBook?((0,n.uX)(),(0,n.CE)("div",Dt,[Nt,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[6]||(t[6]=e=>r.newBookName=e),required:"",class:"create-input"},null,512),[[s.Jo,r.newBookName]]),$t,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[7]||(t[7]=e=>r.newBookAuthorName=e),required:"",class:"create-input"},null,512),[[s.Jo,r.newBookAuthorName]]),Xt,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[8]||(t[8]=t=>e.newBookLink=t),required:"",class:"create-input"},null,512),[[s.Jo,e.newBookLink]]),(0,n.Lk)("button",{onClick:t[9]||(t[9]=e=>i.addBook()),class:"add-book-button"},"Add Book")])):(0,n.Q3)("",!0)])]),r.editingSection?((0,n.uX)(),(0,n.CE)("div",Ut,[Ft,(0,n.Lk)("form",null,[Pt,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[10]||(t[10]=e=>r.editedSectionName=e),required:"",class:"edit-input"},null,512),[[s.Jo,r.editedSectionName]]),zt,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[11]||(t[11]=e=>r.editedSectionDescription=e),class:"edit-input"},null,512),[[s.Jo,r.editedSectionDescription]]),(0,n.Lk)("div",Wt,[(0,n.Lk)("button",{onClick:t[12]||(t[12]=(...e)=>i.saveEdit&&i.saveEdit(...e)),class:"save-button"},"Save"),(0,n.Lk)("button",{onClick:t[13]||(t[13]=(...e)=>i.cancelEdit&&i.cancelEdit(...e)),class:"cancel-button"},"Cancel")])])])):(0,n.Q3)("",!0),r.confirmingDelete?((0,n.uX)(),(0,n.CE)("div",jt,[Jt,Ot,(0,n.Lk)("div",Qt,[(0,n.Lk)("button",{onClick:t[14]||(t[14]=(...e)=>i.deleteSection&&i.deleteSection(...e)),class:"confirm-delete-button"},"Yes, Delete"),(0,n.Lk)("button",{onClick:t[15]||(t[15]=(...e)=>i.cancelDelete&&i.cancelDelete(...e)),class:"cancel-delete-button"},"No, Cancel")])])):(0,n.Q3)("",!0)])],64)}var Kt={data(){return{addingBook:!1,addinBookSectionID:"",newBookName:"",newBookAuthorName:"",searchQuery:"",searchedSections:[],newSectionName:"",newSectionDescription:"",sections:[],books:[],editingSection:!1,editedSectionName:"",editedSectionId:"",editedSectionDescription:"",confirmingDelete:!1,deletedSection:"",isauthenticated:JSON.parse(localStorage.getItem("isauthenticated"))||!1,userRole:localStorage.getItem("userRole")}},mounted(){this.fetchSections(),this.fetchBooks()},methods:{async fetchSections(){const e=localStorage.getItem("access_token");try{const t=await M.A.get("http://127.0.0.1:8000/sections",{headers:{Authorization:`Bearer ${e}`}});this.sections=t.data}catch(t){console.error(t.response.data)}},async createSection(){const e=localStorage.getItem("access_token");try{const t=await M.A.post("http://127.0.0.1:8000/sections",{section_name:this.newSectionName,section_description:this.newSectionDescription},{headers:{Authorization:`Bearer ${e}`}});console.log(t.data),this.fetchSections()}catch(t){console.error(t.response.data)}},editSection(e,t,o){this.editingSection=!0,this.editedSectionId=e,this.editedSectionName=t,this.editedSectionDescription=o},saveEdit(){const e=localStorage.getItem("access_token");M.A.put(`http://127.0.0.1:8000/sections/${this.editedSectionId}`,{name:this.editedSectionName,description:this.editedSectionDescription},{headers:{Authorization:`Bearer ${e}`}}).then((e=>{console.log(e.data),this.fetchSections(),this.cancelEdit()})).catch((e=>{console.error(e.response.data)}))},cancelEdit(){this.editingSection=!1,this.editedSectionName="",this.editedSectionDescription=""},confirmdelete(e){this.confirmingDelete=!0,this.deletedSection=e},deleteSection(){const e=localStorage.getItem("access_token");M.A.delete(`http://127.0.0.1:8000/sections/${this.deletedSection}`,{headers:{Authorization:`Bearer ${e}`}}).then((e=>{console.log(e.data),this.fetchSections(),this.confirmingDelete=!1})).catch((e=>{console.error(e.response.data)}))},cancelDelete(){this.confirmdelete=!1,this.deletedSection=""},logout(){const e=localStorage.getItem("access_token");this.$axios.post("http://127.0.0.1:8000/logout",null,{headers:{Authorization:`Bearer ${e}`}}).then((()=>{localStorage.removeItem("access_token"),localStorage.removeItem("userRole"),localStorage.setItem("isauthenticated",!1),this.isauthenticated=!1,this.$router.push("/logout")}))},searchSections(){const e=localStorage.getItem("access_token");console.log("Searching"),M.A.post("/search",{search_query:this.searchQuery},{headers:{Authorization:`Bearer ${e}`}}).then((e=>{this.searchedSections=e.data})).catch((e=>{console.log(e)}))},toggleAddingBook(e){this.addingBook=!0,this.addinBookSectionID=e},async addBook(){const e=localStorage.getItem("access_token");try{const t=await M.A.post("http://127.0.0.1:8000/book",{book_name:this.newBookName,book_author:this.newBookAuthorName,section_id:this.addinBookSectionID,book_link:this.newBookLink},{headers:{Authorization:`Bearer ${e}`}});console.log(t.data),this.fetchSections()}catch(t){console.error(t.response.data)}this.fetchBooks()},async fetchBooks(){const e=localStorage.getItem("access_token");try{const t=await M.A.get("http://127.0.0.1:8000/book",{headers:{Authorization:`Bearer ${e}`}});this.books=t.data}catch(t){console.error(t.response.data)}},getBooksForSection(e){return this.books.filter((t=>t.section_id===e))}}};const Mt=(0,r.A)(Kt,[["render",Vt],["__scopeId","data-v-7500fa48"]]);var Tt=Mt;const Yt=e=>((0,n.Qi)("data-v-2a2a1a5e"),e=e(),(0,n.jt)(),e),Ht=Yt((()=>(0,n.Lk)("h1",null,"You have been logged out.",-1)));function Gt(e,t,o,s,a,r){const i=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",null,[Ht,(0,n.Lk)("p",null,[(0,n.eW)("Please click "),(0,n.bF)(i,{to:"/user-login"},{default:(0,n.k6)((()=>[(0,n.eW)("here")])),_:1}),(0,n.eW)(" to login again.")])])}var Zt={name:"LogoutPage"};const eo=(0,r.A)(Zt,[["render",Gt],["__scopeId","data-v-2a2a1a5e"]]);var to=eo;const oo={class:"container"},so=(0,n.Lk)("h1",{class:"mt-3 mb-4"},"Pending Requests",-1),no={class:"row"},ao={class:"col"},ro={class:"table"},io=(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",{scope:"col"},"Book ID"),(0,n.Lk)("th",{scope:"col"},"Book Name"),(0,n.Lk)("th",{scope:"col"},"User ID"),(0,n.Lk)("th",{scope:"col"},"User Name"),(0,n.Lk)("th",{scope:"col"},"Actions")])],-1),lo=["onClick"],co=["onClick"];function uo(e,t,o,s,a,r){return(0,n.uX)(),(0,n.CE)("div",oo,[so,(0,n.Lk)("div",no,[(0,n.Lk)("div",ao,[(0,n.Lk)("table",ro,[io,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(a.pendingRequests,((e,t)=>((0,n.uX)(),(0,n.CE)("tr",{key:t},[(0,n.Lk)("td",null,(0,u.v_)(e.bookId),1),(0,n.Lk)("td",null,(0,u.v_)(e.bookName),1),(0,n.Lk)("td",null,(0,u.v_)(e.userId),1),(0,n.Lk)("td",null,(0,u.v_)(e.userName),1),(0,n.Lk)("td",null,[(0,n.Lk)("button",{class:"btn btn-success me-2",onClick:t=>r.approveRequest(e)},"Approve",8,lo),(0,n.Lk)("button",{class:"btn btn-danger",onClick:t=>r.rejectRequest(e)},"Reject",8,co)])])))),128))])])])])])}var ko={data(){return{isauthenticated:JSON.parse(localStorage.getItem("isauthenticated"))||!1,userRole:localStorage.getItem("userRole")||"general",userId:localStorage.getItem("userid"),access_token:localStorage.getItem("access_token"),pendingRequests:[]}},mounted(){this.getPendingRequests()},methods:{async getPendingRequests(){const e=localStorage.getItem("access_token");let t="http://127.0.0.1:8000/approve_request";try{const o=await M.A.get(t,{headers:{Authorization:`Bearer ${e}`}});this.pendingRequests=o.data}catch(o){console.error("Error:",o)}},async approveRequest(e){const t=localStorage.getItem("access_token");try{const o=await M.A.put("http://127.0.0.1:8000/approve_request",{book_id:e.bookId,user_id:e.userId},{headers:{Authorization:`Bearer ${t}`}});console.log(o.data),this.getPendingRequests()}catch(o){console.error("Error:",o)}},async rejectRequest(e){const t=localStorage.getItem("access_token");try{const o=e.bookId,s=e.userId,n=await M.A.delete(`http://127.0.0.1:8000/reject_request/${s}/${o}`,{headers:{Authorization:`Bearer ${t}`}});console.log(n.data),this.getPendingRequests()}catch(o){console.error("Error:",o)}}}};const ho=(0,r.A)(ko,[["render",uo]]);var go=ho;const po=(0,n.Lk)("h1",null,"Admin Reports",-1),mo={class:"table-responsive"},bo={class:"table table-striped"},Lo=(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",null,"Book Title"),(0,n.Lk)("th",null,"Users")])],-1),vo=["onClick"];function fo(e,t,o,s,a,r){return(0,n.uX)(),(0,n.CE)("div",null,[po,(0,n.Lk)("div",mo,[(0,n.Lk)("table",bo,[Lo,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(a.bookwisedetail,(e=>((0,n.uX)(),(0,n.CE)("tr",{key:e.id},[(0,n.Lk)("td",null,(0,u.v_)(e.bookName),1),(0,n.Lk)("td",null,(0,u.v_)(e.userName),1),(0,n.Lk)("td",null,[(0,n.Lk)("button",{class:"btn btn-danger",onClick:t=>r.revokeAccess(e)},"Revoke Access",8,vo)])])))),128))])])])])}var yo={data(){return{isauthenticated:JSON.parse(localStorage.getItem("isauthenticated"))||!1,userRole:localStorage.getItem("userRole")||"general",userId:localStorage.getItem("userid"),access_token:localStorage.getItem("access_token"),bookwisedetail:[]}},mounted(){this.getBookWiseDetails()},methods:{async getBookWiseDetails(){const e=localStorage.getItem("access_token");let t="http://127.0.0.1:8000/admin-reports";try{const o=await M.A.get(t,{headers:{Authorization:`Bearer ${e}`}});this.bookwisedetail=o.data}catch(o){console.error("Error:",o)}},async revokeAccess(e){const t=localStorage.getItem("access_token");try{const o=e.bookId,s=e.userId,n=await M.A.delete(`http://127.0.0.1:8000/reject_request/${s}/${o}`,{headers:{Authorization:`Bearer ${t}`}});console.log(n.data),this.getBookWiseDetails()}catch(o){console.error("Error:",o)}}}};const So=(0,r.A)(yo,[["render",fo]]);var wo=So;const _o=[{path:"/dashboard",name:"DashboardPage",component:H},{path:"/",name:Ne,component:Ne},{path:"/user-login",name:ve,component:ve},{path:"/user-signup",name:re,component:re},{path:"/doesntExists",name:Ie,component:Ie},{path:"/userExists",name:Oe,component:Oe},{path:"/WrongPassword",name:Ze,component:Ze},{path:"/admin-dashboard",name:"AdminDashboard",component:Tt,meta:{isAdmin:!0}},{path:"/logout",name:"Logout",component:to},{path:"/pending-requests",name:"Pending Requests",component:go,meta:{isAdmin:!0}},{path:"/admin-reports",name:"Admin Reports",component:wo,meta:{isAdmin:!0}}],Io=(0,d.aE)({history:(0,d.LA)("/"),routes:_o});Io.beforeEach(((e,t,o)=>{const s=localStorage.getItem("userRole")||"general";e.meta.isAdmin&&"Administrator"!==s?o({path:"/user-login",query:{unauthorized:!0}}):o()}));var Ao=Io;const Bo=(0,s.Ef)(c);M.A.defaults.baseURL="http://127.0.0.1:8000";const Co=M.A.create({baseURL:"http://127.0.0.1:8000"});Bo.config.globalProperties.$axios=Co,Bo.use(Ao),Bo.mount("#app")}},t={};function o(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,s,n,a){if(!s){var r=1/0;for(d=0;d<e.length;d++){s=e[d][0],n=e[d][1],a=e[d][2];for(var i=!0,l=0;l<s.length;l++)(!1&a||r>=a)&&Object.keys(o.O).every((function(e){return o.O[e](s[l])}))?s.splice(l--,1):(i=!1,a<r&&(r=a));if(i){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[s,n,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,a,r=s[0],i=s[1],l=s[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(n in i)o.o(i,n)&&(o.m[n]=i[n]);if(l)var d=l(o)}for(t&&t(s);c<r.length;c++)a=r[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},s=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=o.O(void 0,[504],(function(){return o(4856)}));s=o.O(s)})();
//# sourceMappingURL=app.bd11dce8.js.map