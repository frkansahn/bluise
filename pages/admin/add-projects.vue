<template>
   <div class="add-projects" id="addProjects">
      <AdminHeader/>
      <div class="admin-content-wrapper">
         <div class="row my-5">
            <div class="col-12">
               <b-overlay :show="projectsOverlay" no-wrap></b-overlay>
               <h2 class="text-center mb-4">
                  Yeni Proje Ekle
               </h2>
               <b-form class="row">
                  <b-form-group class="col-md-9" id="subject_group" label="Başlık" label-for="subject_input" description="" required>
                     <b-form-input :class="[projectsError.subject ? 'border-danger':'border-dark']" id="subject_input" v-model="projects.subject" type="text" name="subject" placeholder="Başlık" @click="projectsError.subject=false" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="category_group" label="Proje Kategori" label-for="category_input" description="">
                     <b-form-select :class="[projectsError.category_id ? 'border-danger':'border-dark']" v-model="projects.category_id" name="projectsCategory" required>
                        <b-form-select-option value="" disabled selected>Kategori Seçiniz</b-form-select-option>
                        <b-form-select-option v-for="(PC , index) in projects_categories" :key="`projects_categories${index}`" :value="PC.id">{{PC.category_name}}</b-form-select-option>
                     </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-7" id="image_group" label="Proje Görseli" label-for="image_input" description="">
                     <b-form-file @change="saveImage" v-model="projectImage" :state="Boolean(projectImage)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                  </b-form-group> 
                  <div class="col-md-2 mt-4">
                     <div class="row">
                        <b-button @click="saveImage" class="mt-2 col-12" variant="success" size="md">Resim Ekle</b-button>
                     </div>                     
                  </div>
                  <div class="col-md-3 px-4">
                     <img :src="projects.image" :alt="projects.subject" v-if="projects.image" style="max-height: 60px;">
                     <span class="row mt-4" v-else>
                        <b-alert show variant="warning" class="mt-2 px-3 py-1">
                           <small>Eklenmiş resim bulunmamaktadır.</small>
                        </b-alert>
                     </span>
                  </div>                                  

                  <b-form-group class="col-md-4" id="is_active_group" label="Aktif/Pasif" label-for="is_active_input" description="">
                     <b-form-select class="border-dark" v-model="projects.is_active" name="isActiveCategory">
                        <b-form-select-option value="1" selected>Aktif</b-form-select-option>
                        <b-form-select-option value="0" selected>Pasif</b-form-select-option>
                     </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_title_group" label="Seo Başlık" label-for="seo_title_input" description="">
                     <b-form-input class="border-dark" id="seo_title_input" v-model="projects.seo_title" type="text" name="seo_title" placeholder="Seo başlığını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_keyword_group" label="Seo Anahtarları" label-for="seo_keyword_input" description="Birden fazla kullanımlarda kelimeleri virgün ile ayırınız. ">
                     <b-form-input class="border-dark" id="seo_keyword_input" v-model="projects.seo_keyword" type="text" name="seo_keyword" placeholder="Seo anahtarlarını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-9" id="seo_description_group" label="Seo Açıklama" label-for="seo_description_input" description="">
                     <b-form-input class="border-dark" id="seo_description_input" v-model="projects.seo_description" type="text" name="seo_description" placeholder="Seo açıklamasını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="sort_group" label="Sıralama" label-for="sort_input" description="">
                     <b-form-input class="border-dark" id="sort_input" v-model="projects.sort" type="number" name="sort" placeholder="Sıralamasını giriniz"></b-form-input>
                  </b-form-group> 

                  <b-form-group class="col-md-12" id="short_description_group" label="Kısa Açıklama" label-for="short_description_input" description="">
                     <b-form-textarea :class="[projectsError.short_description ? 'border-danger':'border-dark']" id="short_description_input" v-model="projects.short_description" type="text" name="short_description" placeholder="Kısa Açıklama" @click="projectsError.short_description=false" required></b-form-textarea>
                  </b-form-group>

                  <b-form-group class="col-md-12" id="description_group" label="Detaylı Açıklama" label-for="description_input" description="">
                     <editor
                        v-model="projects.description"
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
                           <b-button class="col-12" type="button" @click="saveProjects" squared size="lg" variant="primary">Kaydet</b-button>
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
      name:'AddProjects',
      components: {
        'editor': Editor
      },
      data() {
         return {
            projects:{
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
            projectsError:{
               subject:false,
               description:false,
               short_description:false,
               category_id:false
            },
            projectsOverlay:false,
            token:undefined,
            projects_categories:[],
            formData:undefined,
            projectImage:undefined
         }
      },
      props:{
         
      },
      methods:{
         saveProjects(){
            var _this = this;
            if(_this.projects.subject != '' && _this.projects.description != '' && _this.projects.short_description != '' && _this.projects.category_id != '')
            {
               _this.projectsOverlay = true;
               _this.$store.dispatch('postService' , {"data":_this.projects , "urlParameter":"/api/v1/projects/add" , "token": _this.token})
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
                        _this.$router.push("/admin/");
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
                     _this.projectsOverlay = false;
                  }                  
               });
            }
            else
            {
               if(_this.projectsError.subject == '' || _this.projectsError.subject == null || _this.projectsError.subject == undefined)
                  _this.projectsError.subject = true;

               if(_this.projectsError.description == '' || _this.projectsError.description == null || _this.projectsError.description == undefined)
                  _this.projectsError.description = true;

               if(_this.projectsError.short_description == '' || _this.projectsError.short_description == null || _this.projectsError.short_description == undefined)
                  _this.projectsError.short_description = true;

               if(_this.projectsError.category_id == '' || _this.projectsError.category_id == null || _this.projectsError.category_id == undefined)
                  _this.projectsError.category_id = true;

            }
         },
         saveImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.projectImage);

            if(_this.projectImage)
            {
               _this.$store.dispatch('uploadImage' , {"data":formData})
               .then(response => {
                  _this.projects.image = response.location;                 
               })
               .catch(err => {
                  console.log(err);
               });
            }
            
         },
      },
      async created(){
         var _this = this; 
         var token = _this.$cookiz.get("token");
         var userId = _this.$cookiz.get("_userId");
         if(token && userId)
         {
            this.token = token;
            this.projects.saved_by = userId;

            this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects_category" , "token": token})
            .then(response => {
               this.projects_categories = response;               
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
