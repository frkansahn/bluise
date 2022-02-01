<template>
   <div class="container-fluid">
      <Header/>      
      <div class="container" v-if="pageLoading">
         <Navigation :nav="navigation" v-if="navigation"/>   
         <div class="row">
            <div class="col-12 px-0 px-md-3 my-3 d-flex align-items-center justify-content-between">
               <h4>
                  Başvurularım
               </h4>
               <NuxtLink to="/application/add" id="applicationAdd" class="btn btn-sm btn-md-lg btn-primary">
                  Başvuru Yap
               </NuxtLink>
            </div>
            <div class="col-12 px-0 px-md-3">
               <tableList :id="`applicationTable`" :body="applicationList" :head="tableHead"/>
            </div>
         </div>
      </div>  
      <Footer/>
   </div>
</template>

<script>
   export default 
   {
      name:'ApplicationList',
      head() {
         return {
            title: "Başvuru Sayfası"
         }
      },
      data() {
         return {
            pageLoading:false,
            navigation:undefined,
            applicationList:[],
            tableHead:undefined
         }
      },
      props:{

      },
      methods:{
         getApplicationListByCustomer(customerId,token){
            var _this = this;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/application/getAllApplicationByCustomerId/" + customerId , "token": token})
            .then(response => {
               _this.applicationList = response;
               _this.tableHead = ["Başvuru no" , "Başvuru tarih" , "İlçe/Mahalle" , "Durum" , "Detay"]
               _this.pageLoading = true;
            });
         },
      },
      async created(){
         var _this = this;
         var token = await cookieStore.get("token");
         var cus_id = await cookieStore.get("_cusId");
         if(token && cus_id)
         {
            _this.getApplicationListByCustomer(cus_id.value,token.value);
            _this.navigation = [
              {
                  "name":"Başvuru Listeleme",
                  "url":"/application/list"
              }
            ]
         }
         else
         {
            _this.$router.push("/uye-giris");
         }
              
      }
   }
</script>

<style>
   @media screen and (max-width: 768px)
   {
      #applicationTable {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        font-size: 12px;
        white-space: nowrap;
      }
   }

   @media screen and (max-width: 540px)
   {
      
   }

</style>
