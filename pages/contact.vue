<template>
   <div class="container-fluid">
      <Header/>
      <Navigation :nav="navigation" v-if="navigation"/>
      <div class="row" v-if="$store.state.config">
         <div class="col-6">
            <div class="row">
               <img src="/eskon-iletisim.jpg" alt="Eskon İletişim" title="Eskon İletişim">   
            </div>            
         </div>
         <div class="col-6 p-5 d-flex align-items-center" id="contactPage">
            <div class="row px-3">
               <h1 class="col-12">
                  İletişim
               </h1>
               <ul class="col-md-8 mt-4">
                  <li class="float-left w-100 mb-3">
                     <b-icon-map variant="dark" font-scale="1.2" class="mr-3 mt-1"></b-icon-map>
                     <span>
                        {{getContactInfo("Adres")}}
                     </span>
                  </li>
                  <li class="float-left w-100 mb-3">
                     <b-icon-telephone-forward variant="dark" font-scale="1.2" class="mr-3 mt-1"></b-icon-telephone-forward>
                     <span class="d-flex">
                        <NuxtLink :to="`tel:${getContactInfo('Telefon')}`">
                           {{getContactInfo("Telefon")}}
                        </NuxtLink>                                  
                     </span>
                  </li>
                  <li class="float-left w-100 mb-3">
                     <b-icon-mailbox variant="dark" font-scale="1.2" class="mr-3 mt-1"></b-icon-mailbox>
                     <span class="d-flex">
                        <NuxtLink to="mailto:info@eskonas.com.tr">
                           {{getContactInfo("Email")}}
                        </NuxtLink>                                  
                     </span>
                  </li>
               </ul>
            </div>                     
         </div>
         <div class="col-12 px-0" v-html="$store.state.config.maps">
            
         </div>
      </div>
      <div class="container">
         <div class="row my-5 position-relative">
            <b-overlay :show="contactOverlay" no-wrap></b-overlay>
            <div class="col-12 px-0">
               <h1 class="text-center">
                  İletişim Formu
               </h1>
               <p class="text-center">
                  <small>Lütfen iletişim bilgilerinizin doğru olmasına özen gösteriniz.</small>
               </p>
            </div>
            <div class="col-12 px-0">
               <div class="row">
                  <form @submit.prevent="contactSubmit" class="col-12" id="contactForm">
                     <div class="row">
                        <div class="col-12 col-sm-6 col-md-4 mt-4 mb-3">
                           <input class="form-control form-control-md py-4 px-3 bg-light" v-model="contact.name" type="text" name="name" placeholder="İsiminizi giriniz.." required/>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 mt-4 mb-3">
                           <input class="form-control form-control-md py-4 px-3 bg-light" v-model="contact.email" type="email" name="email" placeholder="E-Mail adresinizi giriniz.." required/>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 mt-4 mb-3">
                           <input class="form-control form-control-md py-4 px-3 bg-light" v-model="contact.phone" type="number" maxlength="11" name="phone" placeholder="Telefon numaranızı giriniz.." required/>
                        </div>

                        <div class="col-12 mb-3">
                           <textarea class="form-control form-control-md py-4 px-3 bg-light" rows="5" v-model="contact.message" placeholder="Mesajınızı giriniz.." name="message" required></textarea>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                           <b-button type="submit" variant="outline-dark" size="lg" class="w-100 d-flex align-items-center justify-content-center">
                              Gönder <b-icon-cursor-fill variant="dark" font-scale="0.9" class="ml-2"></b-icon-cursor-fill>
                           </b-button>
                        </div> 
                     </div>                                         
                  </form>                  
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
      name:'Contact',
      data() {
         return {
            navigation:undefined,
            contact:{
               name:undefined,
               email:undefined,
               phone:undefined,
               message:undefined
            },
            contactOverlay:false
         }
      },
      props:{
         
      },
      methods:{
         contactSubmit(){
            var _this = this;
            _this.contactOverlay = true;            
            _this.$store.dispatch('postService' , {"data":_this.contact , "urlParameter":"/api/v1/contact_application/add" , "token":""})
            .then(response => {
               if(response.success)
               {
                  setTimeout(() => {
                     _this.contact.name = undefined;
                     _this.contact.email = undefined;
                     _this.contact.phone = undefined;
                     _this.contact.message = undefined;
                     _this.contactOverlay = false;
                     this.$bvToast.toast('Başvurunuz başarıyla iletildi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 2000,
                        solid: true
                     })                     
                  } , 1000)
                  
               }
            });
         },
         getContactInfo(type){
            var _this = this;
            var contact = JSON.parse(_this.$store.state.config.contact);
            var result = "";
            contact.forEach(C => {
               if(C.name == type)
                  result = C.value;
            });
            return result;
         }
      },
      created(){
         this.navigation = [
             {
                 "name":"İletişim",
                 "url":"/contact"
             }
         ]
      }
   }
</script>

<style> 
   #contactPage {
       background: #f3f3f3;
   }
   #contactPage li {
      display: flex;
      list-style-type: none; 
   }

   #contactPage li span {
      color: #000000;
      font-size: 16px;
   }

   #contactPage li span a {
       font-size: 18px;
       color: #000000
   }  

   #contactForm [type="submit"]:hover svg {
       fill: #ffffff;
   }
</style>
