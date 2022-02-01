<template>
   <div class="container-fluid">
      <Header/>
      <div class="row my-5">
         <div class="col-11 col-sm-6 col-md-4 m-auto pb-5 pt-5 px-4 shadow-lg">
            <b-overlay :show="loginOverlay" no-wrap></b-overlay>
            <h2 class="text-center mb-4">
               Giriş Yap
            </h2>
            <b-form>
               <b-form-group id="tc_kimlik_group" label="TC Kimlik" label-for="tc_kimlik_input" description="">
                  <b-form-input :class="[loginError.tc_kimlik ? 'border-danger':'border-dark']" id="tc_kimlik_input" v-model="login.tc_kimlik" type="number" placeholder="Tc Kimlik Numarası" maxlength="11" @click="loginError.tc_kimlik=false" required></b-form-input>
               </b-form-group>

               <b-form-group class="position-relative" id="password_group" label="Şifre" label-for="password_input" description="">
                  <b-form-input :class="[loginError.password ? 'border-danger':'border-dark']" id="password_input" v-model="login.password" :type="passwordType" placeholder="Şirfe" @click="loginError.password=false" required>
                   
                  </b-form-input>
                  <b-icon-eye-fill variant="secondary" font-scale="1" @click="passwordType='text'" v-if="passwordType=='password'">
                     
                  </b-icon-eye-fill>
                  <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="passwordType='password'" v-if="passwordType=='text'">
                     
                  </b-icon-eye-slash-fill>
               </b-form-group>
               <div class="row">
                  <div class="col-12 d-flex align-items-center justify-content-end">
                     <NuxtLink to="/customerForgetPassword" class="text-secondary">
                        <small>Şifremi unuttum!</small>
                     </NuxtLink>
                  </div>
               </div>

               <div class="row mt-4">
                  <div class="col-12 col-md-6 m-auto">
                     <b-button class="col-12" type="button" @click="loginCustomer" squared size="lg" variant="primary">Giriş Yap</b-button>
                  </div>
               </div>
               <div class="row mt-4">
                  <div class="col-12 d-flex align-items-center justify-content-center">
                     <NuxtLink to="/uye-kayit" class="text-secondary">
                        Kayıt Ol
                     </NuxtLink>
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
      name:'CustomerLogin',
      data() {
         return {
            login:{
               tc_kimlik:undefined,
               password:undefined
            },
            loginError:{
               tc_kimlik:false,
               password:false
            },
            passwordType:'password',
            loginOverlay:false
         }
      },
      props:{
         
      },
      methods:{
         loginCustomer(){
            var _this = this;
            if(_this.$checkTcNum(_this.login.tc_kimlik) && _this.login.password)
            {
               _this.loginOverlay = true;        
               _this.$store.dispatch('postService' , {"data":_this.login , "urlParameter":"/api/v1/customerToken" , "token":""})
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

                     this.$bvToast.toast('Giriş başarılı.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });
                     
                     setTimeout(() => { 
                        _this.loginOverlay = false;             
                        _this.$router.push("/application/list");
                     } , 2000)
                  }
                  else
                  {
                     this.$bvToast.toast('Giriş başarısız.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                     _this.loginOverlay = false;
                  }                  
               });
            }
            else
            {
               if(_this.login.tc_kimlik == '' || _this.login.tc_kimlik == null || _this.login.tc_kimlik == undefined)
                  _this.loginError.tc_kimlik = true;

               if(_this.login.password == '' || _this.login.password == null || _this.login.password == undefined)
                  _this.loginError.password = true;

            }
         }
      },
      async created(){
         var _this = this;
         var token = _this.$cookiz.get("token");
         var cus_id = _this.$cookiz.get("_cusId");
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
</style>
