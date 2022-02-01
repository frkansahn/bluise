<template>
   <div class="add-contents" id="addContents">
      <AdminHeader/>
      <div class="admin-content-wrapper">
         <div class="row my-5">
            <div class="col-12">
               <b-overlay :show="contentsOverlay" no-wrap></b-overlay>
               <h2 class="text-center mb-4">
                  Yeni İçerik Ekle
               </h2>
               <b-form class="row">
                  <b-form-group class="col-md-9" id="subject_group" label="Başlık" label-for="subject_input" description="" required>
                     <b-form-input :class="[contentsError.subject ? 'border-danger':'border-dark']" id="subject_input" v-model="contents.subject" type="text" name="subject" placeholder="Başlık" @click="contentsError.subject=false" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="category_group" label="İçerik Kategori" label-for="category_input" description="">
                     <b-form-select :class="[contentsError.category_id ? 'border-danger':'border-dark']" v-model="contents.category_id" name="contentsCategory" required>
                        <b-form-select-option value="" disabled selected>Kategori Seçiniz</b-form-select-option>
                        <b-form-select-option v-for="(CC , index) in contents_categories" :key="`contents_categories${index}`" :value="CC.id">{{CC.category_name}}</b-form-select-option>
                     </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-7" id="image_group" label="İçerik Görseli" label-for="image_input" description="">
                     <b-form-file @change="saveImage" v-model="contentImage" :state="Boolean(contentImage)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                  </b-form-group> 
                  <div class="col-md-2 mt-4">
                     <div class="row">
                        <b-button @click="saveImage" class="mt-2 col-12" variant="success" size="md">Resim Ekle</b-button>
                     </div>                     
                  </div>
                  <div class="col-md-3 px-4">
                     <img :src="contents.image" :alt="contents.subject" v-if="contents.image" style="max-height: 60px;">
                     <span class="row mt-4" v-else>
                        <b-alert show variant="warning" class="mt-2 px-3 py-1">
                           <small>Eklenmiş resim bulunmamaktadır.</small>
                        </b-alert>
                     </span>
                  </div>                                  

                  <b-form-group class="col-md-3" id="is_active_group" label="Aktif/Pasif" label-for="is_active_input" description="">
                     <b-form-select class="border-dark" v-model="contents.is_active" name="isActiveCategory">
                        <b-form-select-option value="1" selected>Aktif</b-form-select-option>
                        <b-form-select-option value="0" selected>Pasif</b-form-select-option>
                     </b-form-select>
                  </b-form-group>                  

                  <b-form-group class="col-md-3" id="seo_title_group" label="Seo Başlık" label-for="seo_title_input" description="">
                     <b-form-input class="border-dark" id="seo_title_input" v-model="contents.seo_title" type="text" name="seo_title" placeholder="Seo başlığını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="seo_keyword_group" label="Seo Anahtarları" label-for="seo_keyword_input" description="Birden fazla kullanımlarda kelimeleri virgün ile ayırınız. ">
                     <b-form-input class="border-dark" id="seo_keyword_input" v-model="contents.seo_keyword" type="text" name="seo_keyword" placeholder="Seo anahtarlarını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="sort_group" label="Sıralama" label-for="sort_input" description="">
                     <b-form-input class="border-dark" id="sort_input" v-model="contents.sort" type="number" name="sort" placeholder="Sıralamasını giriniz"></b-form-input>
                  </b-form-group> 

                  <b-form-group class="col-md-5" id="seo_link_group" label="Seo Link" label-for="seo_link_input" description="">
                     <span class="link-no-use" v-if="seoLinkSuccess == false">
                        Link kullanılamaz
                     </span>
                     <b-form-input :state="seoLinkSuccess" :class="[seoLinkSuccess == undefined ? 'border-dark':'']" id="seo_link_input" v-model="contents.seo_link" type="text" name="seo_link" placeholder="Seo linkini giriniz" @click="contentsError.seo_link=false" @keypress="keypressSeoLink($event)" required></b-form-input>
                     <b-button class="seo-link-control" type="button" @click="controlSeoLink" squared size="sm" variant="info">
                        <small>Kontrol Et</small>
                     </b-button>
                     
                  </b-form-group>

                  <b-form-group class="col-md-7" id="seo_description_group" label="Seo Açıklama" label-for="seo_description_input" description="">
                     <b-form-input class="border-dark" id="seo_description_input" v-model="contents.seo_description" type="text" name="seo_description" placeholder="Seo açıklamasını giriniz"></b-form-input>
                  </b-form-group>                  

                  <b-form-group class="col-md-12" id="short_description_group" label="Kısa Açıklama" label-for="short_description_input" description="">
                     <b-form-textarea :class="[contentsError.short_description ? 'border-danger':'border-dark']" id="short_description_input" v-model="contents.short_description" type="text" name="short_description" placeholder="Kısa Açıklama" @click="contentsError.short_description=false" required></b-form-textarea>
                  </b-form-group>

                  <b-form-group class="col-md-12" id="description_group" label="Detaylı Açıklama" label-for="description_input" description="">
                     <editor
                        v-model="contents.description"
                        api-key="s7u29tgilrvtq5reoies8hkux66ow3f1mavn7nby76tfszx2"
                        :init="{
                           language : 'tr',
                           min_height: 500,
                           preview_styles: 'font-size color',
                           resize: 'both',
                           plugins: 'link image media code autolink lists media table',
                           toolbar: 'undo redo | styleselect| forecolor  | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image media| code table',
                           toolbar_mode: 'floating',
                           image_title: true,
                           automatic_uploads: true, 
                           images_upload_url: 'http://localhost:4001/api/v1/image/upload', 
                           file_picker_types: 'image',
                           tinycomments_mode: 'embedded',
                           tinycomments_author: 'Furkan ŞAHİN',
                           relative_urls: false,
                           remove_script_host: false,
                           convert_urls: true
                        }" required />
                  </b-form-group>

                  <div class="col-12 mt-4">
                     <div class="row">
                        <div class="col-12 col-md-6 m-auto">
                           <b-button class="col-12" type="button" @click="saveContents" squared size="lg" variant="primary">Kaydet</b-button>
                        </div>
                     </div>                     
                  </div>
               </b-form>
            </div>         
         </div>
      </div>
   </div>
</template>

<script>
   import Editor from '@tinymce/tinymce-vue'
   export default 
   {
      name:'AddContents',
      components: {
        'editor': Editor
      },
      data() {
         return {
            contents:{
               subject:undefined,
               description:undefined,
               short_description:undefined,
               image:"",
               saved_by:undefined,
               category_id:"",
               seo_title:"",
               seo_link:"",
               seo_description:"",
               seo_keyword:"",
               sort:0,
               is_active:1
            },
            contentsError:{
               subject:false,
               description:false,
               short_description:false,
               category_id:false
            },
            contentsOverlay:false,
            token:undefined,
            contents_categories:[],
            formData:undefined,
            contentImage:undefined,
            seoLinkSuccess:undefined
         }
      },
      props:{
         
      },
      methods:{
         saveContents(){
            var _this = this;
            if(_this.contents.subject != '' && _this.contents.description != '' && _this.contents.short_description != '' && _this.contents.category_id != '' && _this.controlSeoLink())
            {
               _this.contentsOverlay = true;
               _this.contents.seo_link = _this.contents.seo_link.replaceAll("/","-");
               _this.$store.dispatch('postService' , {"data":_this.contents , "urlParameter":"/api/v1/contents/add" , "token": _this.token})
               .then(response => {
                  if(response.success == "success")
                  {
                     this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });
                     
                     setTimeout(() => {                               
                        _this.$router.push("/admin/contents");
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
                     _this.contentsOverlay = false;
                  }                  
               });
            }
            else
            {
               if(_this.contentsError.subject == '' || _this.contentsError.subject == null || _this.contentsError.subject == undefined)
                  _this.contentsError.subject = true;

               if(_this.contentsError.description == '' || _this.contentsError.description == null || _this.contentsError.description == undefined)
                  _this.contentsError.description = true;

               if(_this.contentsError.short_description == '' || _this.contentsError.short_description == null || _this.contentsError.short_description == undefined)
                  _this.contentsError.short_description = true;

               if(_this.contentsError.category_id == '' || _this.contentsError.category_id == null || _this.contentsError.category_id == undefined)
                  _this.contentsError.category_id = true;

               if(_this.controlSeoLink())
                  _this.seoLinkSuccess = false;

            }
         },
         saveImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.contentImage);

            if(_this.contentImage)
            {
               _this.$store.dispatch('uploadImage' , {"data":formData})
               .then(response => {
                  _this.contents.image = response.location;                 
               })
               .catch(err => {
                  console.log(err);
               });
            }
            
         },
         async controlSeoLink(){
            var _this = this;
            var token = _this.$cookiz.get("token");
            if(_this.contents.seo_link != "")
            {
               _this.$store.dispatch('postService' , {"data":{link: _this.contents.seo_link} , "urlParameter":"/api/v1/contents/controlLink" , "token":token})
               .then(response => {
                  if(response.use)
                  {
                     _this.seoLinkSuccess = true;
                     return true;
                  }
                  else
                  {
                     _this.seoLinkSuccess = false;
                     return false;
                  }
               });
            }
            else
            {
               _this.seoLinkSuccess = undefined;
               _this.$bvToast.toast('Seo link alanının dolu olması gerekmektedir.', {
                  title: `Başarısız..`,
                  variant: 'danger',
                  autoHideDelay: 1500,
                  solid: true
               });
               return false;
            }
         },
         keypressSeoLink(e){
            var a = new RegExp('^[A-Za-z0-9_-]+$');
            if(!a.test(e.key))
            {
              e.preventDefault();
            }
         }
      },
      async created(){
         var _this = this;
         var token = _this.$cookiz.get("token");
         var userId = _this.$cookiz.get("_userId");
         if(token && userId)
         {
            this.token = token;
            this.contents.saved_by = userId;

            this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents_category" , "token": token})
            .then(response => {
               this.contents_categories = response;               
            });
         }
         else
         {
            this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
               title: `Başarısız..`,
               variant: 'danger',
               autoHideDelay: 500,
               solid: true
            });
            setTimeout(() => {
               this.$router.push("/admin/login");
            },1500)            
         }
      }
   }
</script>

<style>  
   .link-no-use {
       position: absolute;
       bottom: -15px;
       font-size: 9px;
       color: #f00;
   }
   .seo-link-control {
       position: absolute;
       bottom: 4px;
       right: 20px;
   }

</style>
