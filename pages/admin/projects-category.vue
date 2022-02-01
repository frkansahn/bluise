<template>
   <div class="admin-projects-category" id="adminProjectsCategory">
        <AdminHeader/>      
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Proje Kategorileri
                        <button @click="addProjectsCategoryPopup" id="addProjectsCategory" class="btn float-right text-secondary">
                            + Ekle
                        </button>
                    </h3>
                    <table class="table table-sm" id="adminProjectsCategoryTable">
                        <thead class="table-secondary">
                            <tr>
                                <th>Kategori İsmi</th>
                                <th>Açıklama</th>
                                <th>Kaydeden</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            <tr v-for="(PC,index) in projects_categories" :key="`bodyProjects${index}`">
                                <td>{{PC.category_name}}</td>
                                <td>{{PC.description}}</td>
                                <td>{{PC.saved_by}}</td>
                                <td>
                                    <button @click="editProjectsCategoryPopup(PC)" id="editProjectsCategory" class="btn btn-sm btn-outline-primary px-4">
                                        Düzenle
                                    </button>
                                </td>
                                <td>
                                    <button @click="deleteProjectsCategoryPopup(PC.id)" id="deleteProjectsCategory" class="btn btn-sm btn-outline-danger px-4">
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="popup" v-show="isAddProjects || isEditProjects">
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="isAddProjects=false;isEditProjects=false;">
                        &times;
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <b-overlay :show="projectsCategoryOverlay" no-wrap></b-overlay>
                            <b-form class="row">
                                <b-form-group class="col-md-12" id="category_name_group" label="Kategori Adı" label-for="category_name_input" description="" required>
                                    <b-form-input :class="[projectsCategoryError.category_name ? 'border-danger':'border-dark']" id="category_name_input" v-model="projects_category.category_name" type="text" name="category_name" placeholder="Kategori adı" @click="projectsCategoryError.category_name=false" required></b-form-input>
                                </b-form-group> 

                                <b-form-group class="col-md-12" id="description_group" label="Açıklama" label-for="description_input" description="" required>
                                    <b-form-input :class="[projectsCategoryError.description ? 'border-danger':'border-dark']" id="description_input" v-model="projects_category.description" type="text" name="description" placeholder="Kategori adı" @click="projectsCategoryError.description=false" required></b-form-input>
                                </b-form-group> 

                                <div class="col-12 mt-4">
                                    <div class="row">
                                        <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12" type="button" @click="saveProjectsCategory" squared size="lg" variant="primary" v-if="isAddProjects">Kaydet</b-button>
                                        <b-button class="col-12" type="button" @click="updateProjectsCategory" squared size="lg" variant="primary" v-if="isEditProjects">Güncelle</b-button>
                                    </div>
                                    </div>                     
                                </div>
                            </b-form>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
   </div>
</template>

<script>
    export default 
    {
        name:'AdminProjectsCategory',
        head() {
            return {
                title: "Admin Proje Kategori Sayfası"
            }
        },
        data() {
            return {
                projects_categories:[],
                isAddProjects:false,
                isEditProjects:false,
                projectsCategoryOverlay:false,
                projects_category:{
                    id:undefined,
                    category_name:undefined,
                    description:undefined,
                    saved_by:undefined
                },
                projectsCategoryError:{
                   category_name:false,
                   description:false
                },
            }
        },
        props:{

        },
        methods:{
            addProjectsCategoryPopup(){
                this.projects_category.id = undefined;
                this.projects_category.category_name = undefined;
                this.projects_category.description = undefined; 
                this.isAddProjects = true;
            },
            editProjectsCategoryPopup(data){
                this.projects_category.id = data.id;
                this.projects_category.category_name = data.category_name;
                this.projects_category.description = data.description;
                this.isEditProjects = true;
            },
            async saveProjectsCategory(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                if(_this.projects_category.category_name != '' && _this.projects_category.description != '')
                {
                   _this.projectsCategoryOverlay = true;
                   _this.$store.dispatch('postService' , {"data":_this.projects_category , "urlParameter":"/api/v1/projects_category/add" , "token": token})
                   .then(response => {
                        if(response.success == "success")
                        {
                            this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getProjectsCategoryByAdmin();
                            _this.isAddProjects = false;
                            _this.projectsCategoryOverlay = false;
                        }
                        else
                        {
                            this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.projectsCategoryOverlay = false;
                        }                  
                    });
                }
                else
                {
                   if(_this.projectsCategoryError.category_name == '' || _this.projectsCategoryError.category_name == null || _this.projectsCategoryError.category_name == undefined)
                      _this.projectsCategoryError.category_name = true;

                  if(_this.projectsCategoryError.description == '' || _this.projectsCategoryError.description == null || _this.projectsCategoryError.description == undefined)
                      _this.projectsCategoryError.description = true;

                }
            },
            async updateProjectsCategory(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                if(_this.projects_category.category_name != '' && _this.projects_category.description != '')
                {
                   _this.projectsCategoryOverlay = true;
                   _this.$store.dispatch('postService' , {"data":_this.projects_category , "urlParameter":"/api/v1/projects_category/update/" + _this.projects_category.id , "token": token})
                   .then(response => {
                        if(response.success == "success")
                        {
                            this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getProjectsCategoryByAdmin();
                            _this.isEditProjects = false;
                            _this.projectsCategoryOverlay = false;
                        }
                        else
                        {
                            this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.projectsCategoryOverlay = false;
                        }                  
                    });
                }
                else
                {
                   if(_this.projectsCategoryError.category_name == '' || _this.projectsCategoryError.category_name == null || _this.projectsCategoryError.category_name == undefined)
                      _this.projectsCategoryError.category_name = true;

                  if(_this.projectsCategoryError.description == '' || _this.projectsCategoryError.description == null || _this.projectsCategoryError.description == undefined)
                      _this.projectsCategoryError.description = true;

                }
            },
            async deleteProjectsCategoryPopup(id){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$bvModal.msgBoxConfirm('Kategoriyi silmek istediğinize emin misiniz?',{
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
                        _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects_category/delete/" + id , "token": token})
                        .then(response => {
                            if(response.success == "success")
                            {
                                _this.$bvToast.toast('Kategori başarıyla silindi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                                _this.getProjectsCategoryByAdmin();
                            }
                            else
                            {
                                if(response.error.errno == 1451)
                                {
                                    _this.$bvToast.toast('Kategorinin bağlı olduğu projeler bulunmaktadır. Önce bağlı olduğu kategorileri siliniz.', 
                                    {
                                        title: `Başarısız..`,
                                        variant: 'danger',
                                        autoHideDelay: 4000,
                                        solid: true
                                    });
                                }
                                else
                                {
                                    _this.$bvToast.toast('Kategori silinemedi.Sayfayı yenileyip tekrar deneyiniz.', 
                                    {
                                        title: `Başarısız..`,
                                        variant: 'danger',
                                        autoHideDelay: 1500,
                                        solid: true
                                    });
                                }                                
                            }
                        });
                    }
                })
                .catch(err => {
                   
                }); 
            },
            async getProjectsCategoryByAdmin(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects_category" , "token": token})
                .then(response => {
                      if(response)
                      {
                         _this.projects_categories = response;
                      }
                      else
                      {
                         _this.$router.push("/admin/login");
                      }
                   
                });
            }
        },
        async created(){
            var _this = this;    
            var token = _this.$cookiz.get("token");
            var userId = _this.$cookiz.get("_userId");
            if(token && userId)
            {
                this.projects_category.saved_by = userId;
                this.getProjectsCategoryByAdmin();
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
