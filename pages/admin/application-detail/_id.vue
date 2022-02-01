<template>
   <div class="application-detail" id="applicationDetail">
      <div class="container-fluid">
         <div class="row mt-3">
            <div class="col-12">
               <NuxtLink :to="`/admin`" class="float-left text-secondary">
                     Admin Anasayfa
               </NuxtLink>
            </div>
         </div>
         <div class="row my-5">
            <div class="col-5">
               <h2 class="text-left mb-4">
                    Başvuru Detayı
               </h2>
               <b-form class="row">
                  <b-form-group class="col-md-6" id="name_group" label="İsim Soyisim" label-for="name_input" description="" required>
                     <b-form-input class="border-dark" id="name_input" v-model="application.name + ' ' + application.surname " size="sm" type="text" name="name" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="tc_kimlik_group" label="TC Kimlik" label-for="tc_kimlik_input" description="" required>
                     <b-form-input class="border-dark" id="tc_kimlik_input" v-model="application.tc_kimlik" size="sm" type="text" name="tc_kimlik" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="email_group" label="Email" label-for="email_input" description="" required>
                     <b-form-input class="border-dark" id="email_input" v-model="application.email" type="text" size="sm" name="email" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="phone_group" label="Telefon" label-for="phone_input" description="" required>
                     <b-form-input class="border-dark" id="phone_input" v-model="application.phone" type="text" size="sm" name="phone" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="deed_province_group" label="İl" label-for="deed_province_input" description="" required>
                     <b-form-input class="border-dark" id="deed_province_input" v-model="application.deed_province + '- İstanbul'" type="text" size="sm" name="deed_province" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="deed_district_group" label="İlçe" label-for="deed_district_input" description="" required>
                     <b-form-input class="border-dark" id="deed_district_input" v-model="application.deed_district" type="text" size="sm" name="deed_district" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="neighborhood_group" label="Mahalle" label-for="neighborhood_input" description="" required>
                     <b-form-input class="border-dark" id="neighborhood_input" v-model="application.neighborhood" type="text" size="sm" name="neighborhood" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="island_number_group" label="Ada Numarası" label-for="island_number_input" description="" required>
                     <b-form-input class="border-dark" id="island_number_input" v-model="application.island_number" type="text" size="sm" name="island_number" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="parcel_group" label="Parsel" label-for="parcel_input" description="" required>
                     <b-form-input class="border-dark" id="parcel_input" v-model="application.parcel" type="text" size="sm" name="parcel" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="site_name_group" label="Site Adı" label-for="site_name_input" description="" required>
                     <b-form-input class="border-dark" id="site_name_input" v-model="application.site_name" type="text" size="sm" name="site_name" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="block_group" label="Blok/Apartman Adı" label-for="block_input" description="" required>
                     <b-form-input class="border-dark" id="block_input" v-model="application.block" type="text" size="sm" name="block" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="door_number_group" label="Kapı Numarası" label-for="door_number_input" description="" required>
                     <b-form-input class="border-dark" id="door_number_input" v-model="application.door_number" type="text" size="sm" name="door_number" disabled></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-12" id="address_group" label="Açık Adres" label-for="address_input" description="" required>
                     <b-form-textarea class="border-dark" id="address_input" v-model="application.address" type="text" size="sm" name="address" disabled></b-form-textarea>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="createdAt_group" label="Başvuru Tarihi" label-for="createdAt_input" description="" required>
                     <b-alert class="border-dark" show variant="secondary">{{application.createdAt | dateTimeFormat}}</b-alert>
                  </b-form-group>

                  <b-form-group class="col-md-6" id="updatedAt_group" label="Güncelleme Tarihi" label-for="updatedAt_input" description="" required>
                     <b-alert class="border-dark" show variant="secondary">{{application.updatedAt | dateTimeFormat}}</b-alert>
                  </b-form-group>
               </b-form>
            </div> 
            <div class="col-7" v-if="imarURL">
               <iframe class="border-dark" :src="imarURL" height="1400px" width="100%"></iframe>
            </div>        
         </div>
      </div>
   </div>
</template>

<script>
   import Editor from '@tinymce/tinymce-vue'
   export default 
   {
      name:'AdminApplicationDetail',
      components: {
        'editor': Editor
      },
      data() {
         return {
            application:{
               id:undefined,
               customer_id:undefined,
               name:undefined,
               surname:undefined,
               tc_kimlik:undefined,
               email:undefined,
               phone:undefined,
               deed_province:undefined,
               deed_district:undefined,
               neighborhood:undefined,
               island_number:undefined,
               parcel:undefined,
               address:undefined,
               site_name:undefined,
               block:undefined,
               door_number:undefined,
               approval:undefined,
               createdAt:undefined,
               updatedAt:undefined,
               status:undefined
            },
            token:undefined,
            imarURL:undefined
         }
      },
      props:{
         
      },
      methods:{
         async deleteNews(){
            var _this = this;
            _this.$bvModal.msgBoxConfirm('Haberi silmek istediğinize emin misiniz?',{
               size: 'sm',
               buttonSize: 'sm',
               okVariant: 'success',
               okTitle: 'Evet',
               cancelVariant:'danger',
               cancelTitle: 'Hayır',
               footerClass: 'py-2 px-4',
               hideHeaderClose: false
            })
            .then(value => {
               if(value)
               {
                  _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news/delete/" + _this.$route.params.id , "token": _this.token})
                  .then(response => {
                     if(response.success == true)
                     {
                        _this.$bvToast.toast('Haber başarıyla silindi.', {
                           title: `Başarılı..`,
                           variant: 'success',
                           autoHideDelay: 500,
                           solid: true
                        });
                        _this.$router.push("/admin");
                     }
                     else
                     {
                        _this.$bvToast.toast('Haber silinemedi.Sayfayı yenileyip tekrar deneyiniz.', {
                           title: `Başarısız..`,
                           variant: 'danger',
                           autoHideDelay: 500,
                           solid: true
                        });
                     }
                  });
               }
            })
            .catch(err => {
               
            }); 
         }
      },
      async mounted(){
         var _this = this;
         var token = _this.$cookiz.get("token");
         var userId = _this.$cookiz.get("_userId");
         if(token && userId)
         {
            _this.token = token;

            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/application/" + _this.$route.params.id , "token": token})
            .then(response => {
               if(response)
               {
                  _this.application = response[0];  
                  _this.imarURL = "https://keos.esenler.bel.tr/imardurumu/imar.aspx?parselid=" + response[0].parcel;
               }
               else
               {
                  _this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
                     title: `Başarısız..`,
                     variant: 'danger',
                     autoHideDelay: 500,
                     solid: true
                  });
                  setTimeout(() => {
                     _this.$router.push("/admin/login");
                  },1500)
               }
               
            });
         }
         else
         {
            _this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
               title: `Başarısız..`,
               variant: 'danger',
               autoHideDelay: 500,
               solid: true
            });
            setTimeout(() => {
               _this.$router.push("/admin/login");
            },1500)            
         }
      }
   }
</script>

<style>   
</style>
