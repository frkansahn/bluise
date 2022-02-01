<template>
   <div class="container-fluid">
      <Header/>
      <Navigation :nav="navigation" v-if="navigation"/>
      <div class="container">
         <div class="row">
            <div class="col-12 mb-5 mt-3 text-center block-title">
               <span>
                  Projeler
               </span>
            </div>
            <div class="col-12 mb-2" id="projects_category">
               <div class="row">
                  <ul class="col-12 text-center">
                     <li class="float-none d-inline-block px-3" v-for="(pc,index) in projects_category" v-bind:key="`ProjectsCategory${index}`" :class="[active_category == index ? 'active':'']">
                        <span @click="getProjectsByCategoryId(pc.id,index)">
                           {{pc.category_name}}
                        </span>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="col-12 px-2">
               <div class="row">
                  <projectsCart v-for="(p,index) in projects" v-bind:key="`ProjectsCart${index}`" :projects="p" :index="index"/>
               </div>
            </div>
         </div>
      </div>      
      <Footer/>
   </div>
</template>

<script>
   export default 
   {
      name:'Projects',
      data() {
         return {
            projects:[],
            projects_category:[],
            navigation:undefined,
            active_category:0
         }
      },
      props:{

      },
      methods:{
         getProjectsByCategoryId(id,index){
            var _this = this;
            _this.active_category = index;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects/active_all_by_category/" + id , "token":""})
            .then(response => {
               _this.projects = response;
            });
         },
         getAllProjects(){
            var _this = this;
            _this.active_category = 0;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects/active_all" , "token":""})
            .then(response => {
               _this.projects = response;
            });
         },
         getProjectsCategory(){
            var _this = this;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects_category" , "token":""})
            .then(response => {
               _this.projects_category = response;
            });
         }
      },
      created(){
         var _this = this;
         _this.getAllProjects();
         _this.getProjectsCategory(); 
         _this.navigation = [
              {
                  "name":"Projeler",
                  "url":"/projects"
              }
          ]     
      }
   }
</script>

<style>
   #projects_category ul li {
      position: relative;
   }

   #projects_category ul li:hover:before , #projects_category ul li.active:before
   {
      left: 0;
      right: 0;
      -webkit-transition: all .3s ease;
      -moz-transition: all .3s ease;
      -o-transition: all .3s ease;
      -ms-transition: all .3s ease;
      transition: all .3s ease;
   }

   #projects_category ul li:before {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: -10px;
      height: 2px;
      background: #007cc2;
      -webkit-transition: all .3s ease;
      -moz-transition: all .3s ease;
      -o-transition: all .3s ease;
      -ms-transition: all .3s ease;
      transition: all .3s ease;
   }

   #projects_category ul li span {
      font-size: 18px;
      cursor: pointer;
   }
</style>
