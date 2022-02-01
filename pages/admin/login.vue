<template>
   <div class="container-fluid">
      <div class="row my-5">
         <div class="col-12 col-sm-6 col-md-4 m-auto pb-5 pt-5 px-4 shadow-lg">
            <b-overlay :show="loginOverlay" no-wrap></b-overlay>
            <h2 class="text-center mb-4">
               Giriş Yap
            </h2>
            <b-form>
               <b-form-group id="username_group" label="Kullanıcı Adı" label-for="username_input" description="">
                  <b-form-input :class="[loginError.username ? 'border-danger':'border-dark']" id="username_input" v-model="login.username" type="text" placeholder="Kullanıcı Adınız"  @click="loginError.username=false" required></b-form-input>
               </b-form-group>

               <b-form-group class="position-relative" id="password_group" label="Şifre" label-for="password_input" description="">
                  <b-form-input :class="[loginError.password ? 'border-danger':'border-dark']" id="password_input" v-model="login.password" :type="passwordType" placeholder="Şirfe" @click="loginError.password=false" required>
                   
                  </b-form-input>
                  <b-icon-eye-fill variant="secondary" font-scale="1" @click="passwordType='text'" v-if="passwordType=='password'">
                     
                  </b-icon-eye-fill>
                  <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="passwordType='password'" v-if="passwordType=='text'">
                     
                  </b-icon-eye-slash-fill>
               </b-form-group>
               <div class="row mt-4">
                  <div class="col-12 col-md-6 m-auto">
                     <b-button class="col-12" type="button" @click="loginAdmin" squared size="lg" variant="primary">Giriş Yap</b-button>
                  </div>
               </div>
            </b-form>
         </div>         
      </div>
   </div>
</template>

<script>
   import tokenControl from '@/mixins/tokenControl'
   export default 
   {
      name:'AdminLogin',
      mixins:[tokenControl],
      data() {
         return {
            login:{
               username:undefined,
               password:undefined
            },
            loginError:{
               username:false,
               password:false
            },
            passwordType:'password',
            loginOverlay:false
         }
      },
      props:{
         
      },
      methods:{
         loginAdmin(){
            var _this = this;
            if(_this.login.username && _this.login.password)
            {
               _this.loginOverlay = true;        
               _this.$store.dispatch('postService' , {"data":_this.login , "urlParameter":"/api/v1/token" , "token":""})
               .then(response => {
                  if(response.msg == "ok")
                  {
                     _this.$cookiz.set('token', response.result.token, {
                       path: '/',
                       maxAge: 60 * 60 * 24 * 2
                     })

                     _this.$cookiz.set('_userId', response.result.user.id, {
                       path: '/',
                       maxAge: 60 * 60 * 24 * 2
                     })

                     _this.$bvToast.toast('Giriş başarılı.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });
                     
                     setTimeout(() => { 
                        _this.loginOverlay = false;             
                        _this.$router.push("/admin");
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
               if(_this.login.username == '' || _this.login.username == null || _this.login.username == undefined)
                  _this.loginError.username = true;

               if(_this.login.password == '' || _this.login.password == null || _this.login.password == undefined)
                  _this.loginError.password = true;

            }
         }
      },
      async created(){
         var _this = this;
         _this.tokenControl().then(response => {
            if(response)
            {
               _this.$router.push("/admin");
            }
         });         
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
