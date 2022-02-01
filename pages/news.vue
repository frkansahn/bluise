<template>
   <div class="container-fluid">
      <Header/>
      <Navigation :nav="navigation" v-if="navigation"/>
      <div class="container">
         <div class="row">
            <div class="col-12 mb-5 mt-3 text-center block-title">
               <span>
                  Haberler
               </span>
            </div>
            <div class="col-12 mb-2" id="news_category">
               <div class="row">
                  <ul class="col-12 text-center">
                     <li class="float-none d-inline-block px-3" v-for="(nc,index) in news_category" v-bind:key="`NewsCategory${index}`" :class="[active_category == index ? 'active':'']">
                        <span @click="getNewsByCategoryId(nc.id,index)">
                           {{nc.category_name}}
                        </span>
                     </li>
                     <li class="float-none d-inline-block px-3" :class="[active_category == -1 ? 'active':'']">
                        <span @click="getAllNews">
                           Tümü
                        </span>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="col-12 px-2">
               <div class="row">
                  <newsCart v-for="(n,index) in news" v-bind:key="`NewsCart${index}`" :news="n" :index="index"/>
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
      name:'News',
      data() {
         return {
            news:[],
            news_category:[],
            navigation:undefined,
            active_category:-1
         }
      },
      props:{

      },
      methods:{
         getNewsByCategoryId(id,index){
            var _this = this;
            _this.active_category = index;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news/active_all_by_category/" + id , "token":""})
            .then(response => {
               _this.news = response;
            });
         },
         getAllNews(){
            var _this = this;
            _this.active_category = -1;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news/active_all" , "token":""})
            .then(response => {
               _this.news = response;
            });
         },
         getNewsCategory(){
            var _this = this;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news_category" , "token":""})
            .then(response => {
               _this.news_category = response;
            });
         }
      },
      created(){
         var _this = this;
         _this.getAllNews();
         _this.getNewsCategory(); 
         _this.navigation = [
              {
                  "name":"Haberler",
                  "url":"/news"
              }
          ]     
      }
   }
</script>

<style>
   .block-title {
       font-size: 35px;
       font-weight: 500;
       color: #007cc2;
   }

   .block-title:before 
   {
       content: '';
       position: absolute;
       left: 0;
       right: 0;
       top: 30px;
       background: #007cc2;
       height: 1px;
       width: 100%;
       z-index: -1;
   }

   .block-title span {
       background: #ffffff;
       padding: 0 2em;
   }

   #news_category ul li {
     position: relative;
  }

  #news_category ul li:hover:before , #news_category ul li.active:before
  {
     left: 0;
     right: 0;
     -webkit-transition: all .3s ease;
     -moz-transition: all .3s ease;
     -o-transition: all .3s ease;
     -ms-transition: all .3s ease;
     transition: all .3s ease;
  }

  #news_category ul li:before {
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

  #news_category ul li span {
     font-size: 18px;
     cursor: pointer;
  }
</style>
