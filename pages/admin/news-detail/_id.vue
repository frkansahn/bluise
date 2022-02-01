<template>
   <div class="news-edit" id="editNews">
      <AdminHeader/>
      <div class="admin-content-wrapper">
         <div class="row my-5">
            <div class="col-12">
               <b-overlay :show="newsOverlay" no-wrap></b-overlay>
               <h2 class="text-center mb-4">
                    Haber Düzenle
               </h2>
               <b-form class="row">
                  <b-form-group class="col-md-9" id="subject_group" label="Başlık" label-for="subject_input" description="" required>
                     <b-form-input :class="[newsError.subject ? 'border-danger':'border-dark']" id="subject_input" v-model="news.subject" type="text" name="subject" placeholder="Başlık" @click="newsError.subject=false" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="category_group" label="Haber Kategori" label-for="category_input" description="">
                     <b-form-select :class="[newsError.category_id ? 'border-danger':'border-dark']" v-model="news.category_id" name="newsCategory" required>
                        <b-form-select-option value="" disabled selected>Kategori Seçiniz</b-form-select-option>
                        <b-form-select-option v-for="(NC , index) in news_categories" :key="`news_categories${index}`" :value="NC.id">{{NC.category_name}}</b-form-select-option>
                     </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-7" id="image_group" label="Haber Görseli" label-for="image_input" description="">
                     <b-form-file @change="saveImage" v-model="newImage" :state="Boolean(newImage)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                  </b-form-group> 
                  <div class="col-md-2 mt-4">
                     <div class="row">
                        <b-button @click="saveImage" class="mt-2 col-12" variant="success" size="md" v-if="!news.image">Resim Ekle</b-button>
                        <b-button @click="deleteImage" class="mt-2 col-12" variant="danger" size="md" v-else>Sil</b-button>
                     </div>                     
                  </div>
                  <div class="col-md-3 px-4">
                     <img class="mt-3" :src="news.image" :alt="news.subject" v-if="news.image" style="max-height: 60px;">
                     <span class="row mt-4" v-else>
                        <b-alert show variant="warning" class="mt-2 px-3 py-1">
                           <small>Eklenmiş resim bulunmamaktadır.</small>
                        </b-alert>
                     </span>
                  </div>                                  

                  <b-form-group class="col-md-4" id="is_active_group" label="Aktif/Pasif" label-for="is_active_input" description="">
                     <b-form-select class="border-dark" v-model="news.is_active" name="isActiveCategory">
                        <b-form-select-option value="1" selected>Aktif</b-form-select-option>
                        <b-form-select-option value="0" selected>Pasif</b-form-select-option>
                     </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_title_group" label="Seo Başlık" label-for="seo_title_input" description="">
                     <b-form-input class="border-dark" id="seo_title_input" v-model="news.seo_title" type="text" name="seo_title" placeholder="Seo başlığını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_keyword_group" label="Seo Anahtarları" label-for="seo_keyword_input" description="Birden fazla kullanımlarda kelimeleri virgün ile ayırınız. ">
                     <b-form-input class="border-dark" id="seo_keyword_input" v-model="news.seo_keyword" type="text" name="seo_keyword" placeholder="Seo anahtarlarını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-9" id="seo_description_group" label="Seo Açıklama" label-for="seo_description_input" description="">
                     <b-form-input class="border-dark" id="seo_description_input" v-model="news.seo_description" type="text" name="seo_description" placeholder="Seo açıklamasını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="sort_group" label="Sıralama" label-for="sort_input" description="">
                     <b-form-input class="border-dark" id="sort_input" v-model="news.sort" type="number" name="sort" placeholder="Sıralamasını giriniz"></b-form-input>
                  </b-form-group> 

                  <b-form-group class="col-md-12" id="short_description_group" label="Kısa Açıklama" label-for="short_description_input" description="">
                     <b-form-textarea :class="[newsError.short_description ? 'border-danger':'border-dark']" id="short_description_input" v-model="news.short_description" type="text" name="short_description" placeholder="Kısa Açıklama" @click="newsError.short_description=false" required></b-form-textarea>
                  </b-form-group>

                  <b-form-group class="col-md-12" id="description_group" label="Detaylı Açıklama" label-for="description_input" description="">
                     <editor
                        v-model="news.description"
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
                           <b-button class="col-12" type="button" @click="updateNews" squared size="lg" variant="primary">Güncelle</b-button>
                        </div>
                     </div>                     
                  </div>

                  <div class="col-12 mt-4">
                     <div class="row">
                        <div class="col-10 col-md-4 m-auto">
                           <b-button class="col-12" type="button" @click="deleteNews" squared size="md" variant="danger">Sil</b-button>
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
      name:'EditNews',
      components: {
        'editor': Editor
      },
      data() {
         return {
            news:{
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
            newsError:{
               subject:false,
               description:false,
               short_description:false,
               category_id:false
            },
            newsOverlay:false,
            token:undefined,
            news_categories:[],
            formData:undefined,
            newImage:undefined
         }
      },
      props:{
         
      },
      methods:{
         async deleteNews(){
            var _this = this;
            var token = _this.$cookiz.get("token");
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
                  _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news/delete/" + _this.$route.params.id , "token": token})
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
         },
         updateNews(){
            var _this = this;
            if(_this.news.subject != '' && _this.news.description != '' && _this.news.short_description != '' && _this.news.category_id != '')
            {
               _this.newsOverlay = true;
               _this.$store.dispatch('postService' , {"data":_this.news , "urlParameter":"/api/v1/news/update/" + _this.$route.params.id  , "token": _this.token})
               .then(response => {
                  if(response.success == "success")
                  {
                     this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });
                     
                     setTimeout(() => {                               
                        _this.$router.push("/admin/");
                     } , 2000)
                  }
                  else
                  {
                     this.$bvToast.toast('Güncelleme başarısız.Bilgilerinizi kontrol ediniz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                     _this.newsOverlay = false;
                  }                  
               });
            }
            else
            {
               if(_this.newsError.subject == '' || _this.newsError.subject == null || _this.newsError.subject == undefined)
                  _this.newsError.subject = true;

               if(_this.newsError.description == '' || _this.newsError.description == null || _this.newsError.description == undefined)
                  _this.newsError.description = true;

               if(_this.newsError.short_description == '' || _this.newsError.short_description == null || _this.newsError.short_description == undefined)
                  _this.newsError.short_description = true;

               if(_this.newsError.category_id == '' || _this.newsError.category_id == null || _this.newsError.category_id == undefined)
                  _this.newsError.category_id = true;

            }
         },
         saveImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.newImage);

            if(_this.newImage)
            {
               _this.$store.dispatch('uploadImage' , {"data":formData})
               .then(response => {
                  _this.news.image = response.location;                 
               })
               .catch(err => {
                  console.log(err);
               });
            }
            
         },
         async deleteImage(){
            var _this = this;
            if(_this.token)
            {
               _this.$store.dispatch('postService' , {"data":{"filename":_this.news.image} , "urlParameter":"/api/v1/image/removeFile" , "token": _this.token})
               .then(response => {
                  if(response)
                  {
                     _this.news.image = "";
                     _this.newImage = undefined;
                  }
                  else
                  {
                     _this.news.image = "";
                     _this.newImage = undefined;
                     this.$bvToast.toast('Dosya bulunamadı fakat sistemden silindi. Lütfen güncellemeyi tamamlayınız', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }                  
               });
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
            this.news.saved_by = userId;

            this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news/ForAdmin/" + this.$route.params.id , "token": token})
            .then(response => {
               this.news = response[0];               
            });

            this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news_category" , "token": token})
            .then(response => {
               this.news_categories = response;               
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
</style>
