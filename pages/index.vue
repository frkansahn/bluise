<template>
   <div class="container-fluid">
      <Header/>
      <div class="row">
         <div class="col-12 mb-3">
            <Slider/>
         </div>
         <div class="container">
            <div class="row">
               <div class="col-12 mb-3">
                  <NewsShowcase/>
               </div>
            </div>
         </div>         
         <div class="col-12">
            <div class="row">
               <video autoplay="autoplay" muted="muted" loop="loop" class="w-100">
                  <source src="http://eskonas.com.tr/video/omur_evler_tanitim.mp4" type="video/mp4" />
                  <source src="http://eskonas.com.tr/video/omur_evler_tanitim.mp4" type="video/ogg" />
                  Tarayıcınız video etiketini desteklemiyor.
               </video>
            </div>            
         </div>
         <div class="col-12 py-5 bg-light">
            <div class="container">
               <div class="row">
                  <div id="hn-kredi-widget" class="col-12 px-0 px-md-3"></div>
                  <script src="https://e.hesaplama.net/kredi.do?bgcolor=FFFFFF&tcolor=000000&hcolor=3B8CEE&rcolor=EEEEEE&tsize=n&tfamily=n&btype=s&bsize=1px&bcolor=EEEEEE" type="text/javascript"></script>
               </div>
            </div>
         </div>
         <div class="col-12 py-5 bg-light">
            <div class="container">
               <div class="row">
                  <div class="col-md-3 px-4" v-if="getDolar">
                     <div class="row border border-secondary rounded bg-dark text-white">
                        <div class="col-12 mt-2 mb-3 d-flex align-items-center justify-content-between">
                           <span class="exchange-title ">
                              Dolar - <strong>$</strong>
                           </span>
                           <small :class="[getDolar.rate < 0 ? 'text-danger' : 'text-success']" class="exchange-rate">
                              % {{getDolar.rate}}
                           </small>
                        </div>
                        <div class="col-12 mb-1">
                           <span class="float-left w-100 d-flex align-items-center justify-content-between exchange-selling">
                              <small>Satış : </small> <strong>{{getDolar.selling}}</strong>
                           </span>
                        </div>
                        <div class="col-12 mb-3">
                           <span class="float-left w-100 d-flex align-items-center justify-content-between exchange-buying">
                              <small>Alış : </small> {{getDolar.buying}}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-3 px-4" v-if="getEuro">
                     <div class="row border border-secondary rounded bg-dark text-white">
                        <div class="col-12 mt-2 mb-3 d-flex align-items-center justify-content-between">
                           <span class="exchange-title ">
                              Euro - <strong>€</strong>
                           </span>
                           <small :class="[getEuro.rate < 0 ? 'text-danger' : 'text-success']" class="exchange-rate">
                              % {{getEuro.rate}}
                           </small>
                        </div>
                        <div class="col-12 mb-1">
                           <span class="float-left w-100 d-flex align-items-center justify-content-between exchange-selling">
                              <small>Satış : </small> <strong>{{getEuro.selling}}</strong>
                           </span>
                        </div>
                        <div class="col-12 mb-3">
                           <span class="float-left w-100 d-flex align-items-center justify-content-between exchange-buying">
                              <small>Alış : </small> {{getEuro.buying}}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-3 px-4" v-if="getGBP">
                     <div class="row border border-secondary rounded bg-dark text-white">
                        <div class="col-12 mt-2 mb-3 d-flex align-items-center justify-content-between">
                           <span class="exchange-title ">
                              Sterlin - <strong>£</strong>
                           </span>
                           <small :class="[getGBP.rate < 0 ? 'text-danger' : 'text-success']" class="exchange-rate">
                              % {{getGBP.rate}}
                           </small>
                        </div>
                        <div class="col-12 mb-1">
                           <span class="float-left w-100 d-flex align-items-center justify-content-between exchange-selling">
                              <small>Satış : </small> <strong>{{getGBP.selling}}</strong>
                           </span>
                        </div>
                        <div class="col-12 mb-3">
                           <span class="float-left w-100 d-flex align-items-center justify-content-between exchange-buying">
                              <small>Alış : </small> {{getGBP.buying}}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-3 px-4">
                     <div class="row d-flex flex-column justify-content-center align-items-center border border-secondary btn btn-secondary rounded bg-dark text-white text-center h-100" @click="getExchange">
                        <b-icon-arrow-clockwise variant="white" font-scale="2.5" class="mb-1"></b-icon-arrow-clockwise>  
                        <h4>Yenile</h4>
                     </div>
                  </div>
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
      name:'Anasayfa',
      data() {
         return {
            exchange:[],
            weather:[]
         }
      },
      async created(){
         var _this = this;
         _this.getExchange();
      },
      methods:{
         getExchange(){
            var _this = this;
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/doviz" , "token":""})
            .then(response => {
               _this.exchange = JSON.parse(response).result;
            });
         }
      },
      computed: {
         getDolar: function() {
            return this.exchange.find(x => x.code == 'USD');
         },
         getEuro: function() {
            return this.exchange.find(x => x.code == 'EUR');
         },
         getGBP: function() {
            return this.exchange.find(x => x.code == 'GBP');
         }
      },
   }
</script>

<style>
   body form.hnarac > fieldset > ol > li .iw6 , body form.hnarac > fieldset > ol > li .iw3 {
       width: 80px;
   }

   body form.hnarac > fieldset .buttons > button[type=submit] {
       width: 50%;
   }

   body form.hnarac > fieldset .buttons > button[type=reset] {
       width: 50%;
       margin: 0 1em;
   }

   body form.hnarac > fieldset > legend
   {
      padding: 14px 8px;
   }

   .exchange-selling , .exchange-buying {
       font-size: 14px;
   }
   
</style>
