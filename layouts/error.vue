<template>
   <div class="container-fluid">
      <Header/>
      <div class="row mt-3 mb-5" id="page-404">
         <div class="col-12 mb-5 text-center not-found-page">
            404!
         </div>
         <h1 class="col-12 text-center">
            Üzgünüm aradığınız sayfayı bulanamadık :( 
         </h1>
         <div class="col-12 mt-5 d-flex align-items-center justify-content-center">
            <NuxtLink to="/" id="backHomePAge">
               Anasayfaya Dön
            </NuxtLink>
         </div>
         <div class="col-12 mt-5 d-flex align-items-center justify-content-center">
            <button type="button" @click="$router.go(-1)" class="btn btn-outline-primary"> 
               Geri Dön
            </button>
         </div>         
      </div>
      <Footer/>
   </div>
</template>

<script>
   export default 
   {
      name:'NotFound',
      head() {
         return {
            title: 'Sayfa Bulunamadı',
         }
      },
      data() {
         return {
         }
      },
      props:{
         
      },
      methods:{

      }
   }
</script>

<style scoped>
   .not-found-page
   {
      font-size: 150px;
   }

   @media screen and (max-width: 768px)
   {
      #page-404 h1 {
          font-size: 24px;
      }
   }

   @media screen and (max-width: 540px)
   {
      #page-404 h1 {
          font-size: 20px;
      }
   }
</style>
