<template>
   <div class="container-fluid">
      <Header/>
      <div class="container">
         <div class="row my-5">
            <div class="col-12 pb-0 pt-5 shadow-lg">
               <b-overlay :show="applicationOverlay" no-wrap></b-overlay>
               <h2 class="text-center mb-4">
                  Başvuru Yap
               </h2>
               <div class="row">
                  <div class="col-12 text-center">
                     <span>
                        Gri zeminli kutu içindeki tüm bilgilerin güncel tapu belgesinde yazdığı şekilde girilmesi gerekmektedir.
                     </span> 
                     <br>                    
                     <span>
                        Tapu bilgileriniz mevcut değil ise; <a href="https://www.turkiye.gov.tr/tapu-bilgileri-sorgulama"><strong>Tapu Sorgulama sayfasından</strong></a> giriş yapabilir, ilgili bilgileri edindikten sonra başvurunuzu tamamlayabilirsiniz.
                     </span>                     
                  </div>
               </div>
               
               <div class="row mt-5 mb-4">
                  <div class="col-12 col-md-8 m-auto">
                     <b-form class="row">
                        <b-form-group class="col-md-4" id="deed_province_group" label="Tapu İl" label-for="deed_province_input" description="">
                           <b-form-select :class="[applicationError.deed_province ? 'border-danger':'border-dark']" v-model="application.deed_province" name="tapuIl" required disabled>
                              <b-form-select-option v-for="(i , index) in deed_province_options" :key="`deed_province${index}`" :value="i.PlatesNo" v-if="i.PlatesNo == 34">{{i.CityName}}</b-form-select-option>
                           </b-form-select>
                        </b-form-group>

                        <b-form-group class="col-md-4" id="deed_district_group" label="Tapu İlçe" label-for="deed_district_input" description="">
                           <b-form-select :class="[applicationError.deed_district ? 'border-danger':'border-dark']" v-model="application.deed_district" name="tapuIlce" @change="changeDistrict" required>
                              <b-form-select-option value="" disabled selected>İlçe seçiniz</b-form-select-option>
                              <b-form-select-option v-for="(i , index) in deed_district_options.Districts" :key="`deed_district${index}`" :value="i">{{i}}</b-form-select-option>
                           </b-form-select>
                        </b-form-group>

                         <b-form-group class="col-md-4" id="neighborhood_group" label="Tapu Mahalle" label-for="neighborhood_input" description="">
                           <b-form-select :class="[applicationError.neighborhood ? 'border-danger':'border-dark']" v-model="application.neighborhood" name="tapuMahalle" required @change="applicationError.neighborhood=false">
                              <b-form-select-option value="" disabled selected>Mahalle seçiniz</b-form-select-option>
                              <b-form-select-option v-for="(m , index) in neighborhood_options" :key="`neighborhood${index}`" :value="m">{{m}}</b-form-select-option>
                           </b-form-select>
                        </b-form-group>

                        <b-form-group class="col-md-6" id="island_number_group" label="Ada" label-for="island_number_input" description="">
                           <b-form-input :class="[applicationError.island_number ? 'border-danger':'border-dark']" id="island_number_input" v-model="application.island_number" type="text" name="island_number" placeholder="Ada(Ada numaranız yoksa 0 giriniz.)" @click="applicationError.island_number=false" @keypress="applicationError.island_number=false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-md-6" id="parcel_group" label="Parsel" label-for="parsel_input" description="">
                           <b-form-input :class="[applicationError.parcel ? 'border-danger':'border-dark']" id="parcel_input" v-model="application.parcel" type="text" name="parcel" placeholder="Parsel" @click="applicationError.parcel=false" @keypress="applicationError.parcel=false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-md-12" id="address_group" label="Açık Adres" label-for="address_input" description="">
                           <b-form-input :class="[applicationError.address ? 'border-danger':'border-dark']" id="address_input" v-model="application.address" type="text" name="address" placeholder="Örn: Esenler İlçesi Eren Bülbül Mah. Ferhat Gedik Cad. No:28" @click="applicationError.address=false" @keypress="applicationError.address=false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-md-4" id="site_name_group" label="Site Adı" label-for="site_name_input" description="">
                           <b-form-input :class="[applicationError.site_name ? 'border-danger':'border-dark']" id="site_name_input" v-model="application.site_name" type="text" name="site_name" placeholder="Site adı" @click="applicationError.site_name=false" @keypress="applicationError.site_name=false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-md-4" id="block_group" label="Blok/Apartman adı" label-for="block_input" description="">
                           <b-form-input :class="[applicationError.block ? 'border-danger':'border-dark']" id="block_input" v-model="application.block" type="text" name="block" placeholder="Blok/Apartman adı" @click="applicationError.block=false" @keypress="applicationError.block=false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-md-4" id="door_number_group" label="İç kapı numarası" label-for="door_number_input" description="">
                           <b-form-input :class="[applicationError.door_number ? 'border-danger':'border-dark']" id="door_number_input" v-model="application.door_number" type="text" name="door_number" placeholder="Kapı Numarası" @click="applicationError.door_number=false" @keypress="applicationError.door_number=false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-12" id="approval_group" label="" label-for="checkboxApproval" description="">
                           <b-form-checkbox :state="application.approval" id="checkboxApproval" v-model="application.approval" name="approval">
                              <small>
                                 Formda verdiğim bilgilerin doğruluğunu beyan ederim.
                              </small>
                           </b-form-checkbox>
                        </b-form-group>

                        <div class="col-12 my-3">
                           <b-button class="col-12" type="button" @click="apply" squared size="lg" variant="primary">Kaydet</b-button>
                        </div>


                     </b-form>
                  </div>
               </div>
               <div class="row">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82346.37023207932!2d28.856077394426173!3d41.06709999475104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caafe253f39f9b%3A0x349572fb9a436310!2sEsenler%2F%C4%B0stanbul!5e1!3m2!1str!2str!4v1642180514850!5m2!1str!2str" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
               </div>               
            </div>         
         </div>
      </div>
      <Footer/>
   </div>
</template>

<script>
   import 'turkey-yl-district/lib/data'
   export default 
   {
      name:'applicationAdd',
      data() {
         return {
            application:{
               customer_id:undefined,
               deed_province:34,
               deed_district:"",
               neighborhood:"",
               island_number:undefined,
               parcel:undefined,
               address:undefined,
               site_name:undefined,
               block:undefined,
               door_number:undefined,
               approval:false
            },
            applicationError:{
               deed_province:false,
               deed_district:false,
               neighborhood:false,
               island_number:false,
               parcel:false,
               address:false,
               site_name:false,
               block:false,
               door_number:false,
               approval:false
            },
            applicationOverlay:false,
            deed_province_options:[],
            deed_district_options:[],
            neighborhood_options:[]
         }
      },
      props:{
         
      },
      methods:{
         async apply(){
            var _this = this;
            var token = _this.$cookiz.get("token");
            if(_this.application.deed_district.length > 0 && _this.application.neighborhood.length > 0 && _this.application.island_number.length > 0 && _this.application.parcel.length > 0 && _this.application.address.length > 0 && _this.application.site_name.length > 0 && _this.application.block.length > 0 && _this.application.door_number.length > 0 && _this.application.approval == true) 
            {
               _this.applicationOverlay = true;
               _this.$store.dispatch('postService' , {"data":_this.application , "urlParameter":"/api/v1/application/add" , "token":token})
               .then(response => {
                  if(response.success == "success")
                  {
                     this.$bvToast.toast('Başvurunuz başarıyla alındı.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });

                     setTimeout(() => {
                        _this.applicationOverlay = false;             
                        _this.$router.push("/application/list");
                     },2000);
                  }
                  else
                  {
                     this.$bvToast.toast('Başvurunuz işleminiz başarısız.Bilgilerinizi kontrol ediniz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                     _this.applicationOverlay = false;     
                  }     


               });
            }
            else
            {
               if(_this.application.deed_district == '' || _this.application.deed_district == null || _this.application.deed_district == undefined)
                  _this.applicationError.deed_district = true;
               else
                  _this.applicationError.deed_district = false;

               if(_this.application.neighborhood == '' || _this.application.neighborhood == null || _this.application.neighborhood == undefined)
                  _this.applicationError.neighborhood = true;
               else
                  _this.applicationError.neighborhood = false;

               if(_this.application.island_number == '' || _this.application.island_number == null || _this.application.island_number == undefined)
                  _this.applicationError.island_number = true;
               else
                  _this.applicationError.island_number = false;

               if(_this.application.parcel == '' || _this.application.parcel == null || _this.application.parcel == undefined)
                  _this.applicationError.parcel = true;
               else
                  _this.applicationError.parcel = false;

               if(_this.application.address == '' || _this.application.address == null || _this.application.address == undefined)
                  _this.applicationError.address = true;
               else
                  _this.applicationError.address = false;

               if(_this.application.site_name == '' || _this.application.site_name == null || _this.application.site_name == undefined)
                  _this.applicationError.site_name = true;
               else
                  _this.applicationError.site_name = false;

               if(_this.application.block == '' || _this.application.block == null || _this.application.block == undefined)
                  _this.applicationError.block = true;
               else
                  _this.applicationError.block = false;

               if(_this.application.door_number == '' || _this.application.door_number == null || _this.application.door_number == undefined)
                  _this.applicationError.door_number = true;
               else
                  _this.applicationError.door_number = false;

               if(_this.application.approval == '' || _this.application.approval == null || _this.application.approval == undefined)
                  _this.applicationError.approval = true;
               else
                  _this.applicationError.approval = false;

            }
         },
         async changeDistrict(){
            this.applicationError.deed_district = false;
            const { getNeighbourhoods } = require('turkey-yl-district');
            this.neighborhood_options = await getNeighbourhoods('İstanbul', this.application.deed_district);
         }
      },
      async created(){
         var _this = this;
         var token = _this.$cookiz.get("token");
         var cus_id = _this.$cookiz.get("_cusId");
         if(!token && !cus_id)
         {
            this.$router.push("/uye-giris");
         }
         else
         {
            
            this.application.customer_id = cus_id;
            const { getCityNameAndPlates } = require('turkey-yl-district');
            this.deed_province_options = await getCityNameAndPlates();

            const { getDistrictsName } = require('turkey-yl-district');
            this.deed_district_options = await getDistrictsName(this.application.deed_province);
         }
      },
      updated(){
      }
   }
</script>

<style>
</style>
