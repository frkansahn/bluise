<template>
   <div class="container-fluid">
      <Header/>
      <div class="row my-5">
         <div class="col-11 col-sm-6 col-md-4 m-auto pb-5 pt-5 px-4 shadow-lg">
            <b-overlay :show="registerOverlay" no-wrap></b-overlay>
            <h2 class="text-center mb-4">
               Kayıt Ol
            </h2>
            <b-form>
               <b-form-group id="name_group" label="İsim" label-for="name_input" description="">
                  <b-form-input :class="[registerError.name ? 'border-danger':'border-dark']" id="name_input" v-model="register.name" type="text" name="name" placeholder="İsminiz" @click="registerError.name=false" required></b-form-input>
               </b-form-group>

               <b-form-group id="surname_group" label="Soyisim" label-for="surname_input" description="">
                  <b-form-input :class="[registerError.surname ? 'border-danger':'border-dark']" id="surname_input" v-model="register.surname" type="text" name="surname" placeholder="Soyisminiz" @click="registerError.surname=false" required></b-form-input>
               </b-form-group>

               <b-form-group id="tc_kimlik_group" label="TC Kimlik" label-for="tc_kimlik_input" description="">
                  <b-form-input :class="[registerError.tc_kimlik ? 'border-danger':'border-dark']" id="tc_kimlik_input" v-model="register.tc_kimlik" type="number" name="uniqueId" placeholder="Tc Kimlik Numarası" maxlength="11" @click="registerError.tc_kimlik=false" required></b-form-input>
               </b-form-group>

               <b-form-group class="position-relative" id="password_group" label="Şifre" label-for="password_input" description="">
                  <b-form-input :class="[registerError.password ? 'border-danger':'border-dark']" id="password_input" v-model="register.password" :type="passwordType" name="password" placeholder="Şirfe" @click="registerError.password=false" required>
                   
                  </b-form-input>
                  <b-icon-eye-fill variant="secondary" font-scale="1" @click="passwordType='text'" v-if="passwordType=='password'">
                     
                  </b-icon-eye-fill>
                  <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="passwordType='password'" v-if="passwordType=='text'">
                     
                  </b-icon-eye-slash-fill>
               </b-form-group>

               <b-form-group class="position-relative" id="again_password_group" label="Şifre tekrar" label-for="again_password_input" description="">
                  <b-form-input :class="[registerError.again_password ? 'border-danger':'border-dark']" id="again_password_input" v-model="register.again_password" :type="again_passwordType" name="againPassword" placeholder="Şirfe tekrar" @click="registerError.again_password=false" required>
                   
                  </b-form-input>
                  <b-icon-eye-fill variant="secondary" font-scale="1" @click="again_passwordType='text'" v-if="again_passwordType=='password'">
                     
                  </b-icon-eye-fill>
                  <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="again_passwordType='password'" v-if="again_passwordType=='text'">
                     
                  </b-icon-eye-slash-fill>
               </b-form-group>

               <b-form-group id="email_group" label="Email" label-for="email_input" description="">
                  <b-form-input :class="[registerError.email ? 'border-danger':'border-dark']" name="email" id="email_input" v-model="register.email" type="text" placeholder="Emailiniz" @click="registerError.email=false" autocomplete="nope"></b-form-input>
               </b-form-group>

               <b-form-group id="phone_group" label="Telefon" label-for="phone_input" description="">
                  <b-form-input :class="[registerError.phone ? 'border-danger':'border-dark']" id="phone_input" name="phone" v-model="register.phone" type="text" v-mask="'0(###)-###-##-##'" placeholder="Telefon numaranız" @click="registerError.phone=false" required></b-form-input>
               </b-form-group>

               <div class="row mt-4">
                  <div class="col-12 col-md-6 m-auto">
                     <b-button class="col-12" type="button" @click="registerCustomer" squared size="lg" variant="primary">Kayıt Ol</b-button>
                  </div>
               </div>
            </b-form>
         </div>         
      </div>
      <Footer/>
   </div>
</template>

<script>
   export default 
   {
      name:'CustomerRegister',
      data() {
         return {
            register:{
               name:undefined,
               surname:undefined,
               tc_kimlik:undefined,
               password:undefined,
               again_password:undefined,
               phone:undefined,
               email:undefined
            },
            registerError:{
               name:false,
               surname:false,
               tc_kimlik:false,
               password:false,
               again_password:false,
               phone:false,
               email:false
            },            
            passwordType:'password',
            again_passwordType:'password',
            registerOverlay:false
         }
      },
      props:{
         
      },
      methods:{
         registerCustomer(){
            var _this = this;
            if(_this.$checkTcNum(_this.register.tc_kimlik) && (_this.register.password == _this.register.again_password) && _this.register.name != '' && _this.register.surname != '' && _this.$checkEmail(_this.register.email) && _this.register.phone.replace(/\D/g, '').length == 11)
            {
               _this.registerOverlay = true;      
               _this.register.phone = Number(_this.register.phone.replace(/\D/g, ''));
               _this.$store.dispatch('postService' , {"data":_this.register , "urlParameter":"/api/v1/customer/add" , "token":""})
               .then(response => {
                  if(response.success == "success")
                  {
                     this.$bvToast.toast('Kayıt başarılı.Giriş yapılıyor.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });
                     
                     setTimeout(() => {                               
                        _this.$store.dispatch('postService' , {"data":{"tc_kimlik":_this.register.tc_kimlik , "password":_this.register.password} , "urlParameter":"/api/v1/customerToken" , "token":""})
                        .then(response => {
                           if(response.msg == "ok")
                           {
                              _this.$cookiz.set('token', response.result.token, {
                                path: '/',
                                maxAge: 60 * 60 * 24 * 1
                              })

                              _this.$cookiz.set('_cusId', response.result.user.id, {
                                path: '/',
                                maxAge: 60 * 60 * 24 * 1
                              })
                              
                              setTimeout(() => { 
                                 _this.registerOverlay = false;         
                                 _this.$router.push("/application/list");
                              } , 2000)
                           }
                           else
                           {
                              this.$bvToast.toast('Giriş yapılırken sorun oluştu.Sayfayı yenileyip giriş yapmayı deneyebilirsiniz.', {
                                 title: `Başarısız..`,
                                 variant: 'danger',
                                 autoHideDelay: 500,
                                 solid: true
                              });
                              _this.registerOverlay = false;
                           }                  
                        });
                     } , 2000)
                  }
                  else
                  {
                     this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                     _this.registerOverlay = false;
                  }                  
               });
            }
            else
            {
               if(_this.register.name == '' || _this.register.name == null || _this.register.name == undefined)
                  _this.registerError.name = true;

               if(_this.register.surname == '' || _this.register.surname == null || _this.register.surname == undefined)
                  _this.registerError.surname = true;

               if(_this.register.tc_kimlik == '' || _this.register.tc_kimlik == null || _this.register.tc_kimlik == undefined)
                  _this.registerError.tc_kimlik = true;

               if(_this.register.password == '' || _this.register.password == null || _this.register.password == undefined)
                  _this.registerError.password = true;

               if(_this.register.email == '' || _this.register.email == null || _this.register.email == undefined)
                  _this.registerError.email = true;

               if(_this.register.phone == '' || _this.register.phone == null || _this.register.phone == undefined)
                  _this.registerError.phone = true;

            }
         }
      },
      async created(){
         var _this = this;
         var token =  _this.$cookiz.get("token");
         var cus_id =  _this.$cookiz.get("_cusId");
         if(token && cus_id)
         {
            _this.$router.push("/application/list");
         }
      }
   }
</script>

<style>
   #password_input + svg {
      position: absolute;
      right: 10px;
      bottom: 10px;
      cursor: pointer;
   }

   #again_password_input + svg {
      position: absolute;
      right: 10px;
      bottom: 10px;
      cursor: pointer;
   }
</style>
