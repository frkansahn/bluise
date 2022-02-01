<template>
   <div class="admin-contents-category" id="adminContentsCategory">
        <AdminHeader/>      
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        İçerik Kategorileri
                        <button @click="addContentsCategoryPopup" id="addContentsCategory" class="btn float-right text-secondary">
                            + Ekle
                        </button>
                    </h3>
                    <table class="table table-sm" id="adminContentsCategoryTable">
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
                            <tr v-for="(CC,index) in contents_categories" :key="`bodyContents${index}`">
                                <td>{{CC.category_name}}</td>
                                <td>{{CC.description}}</td>
                                <td>{{CC.saved_by}}</td>
                                <td>
                                    <button @click="editContentsCategoryPopup(CC)" id="editContentsCategory" class="btn btn-sm btn-outline-primary px-4">
                                        Düzenle
                                    </button>
                                </td>
                                <td>
                                    <button @click="deleteContentsCategoryPopup(CC.id)" id="deleteContentsCategory" class="btn btn-sm btn-outline-danger px-4">
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
            <div class="popup" v-show="isAddContents || isEditContents">
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="isAddContents=false;isEditContents=false;">
                        &times;
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <b-overlay :show="contentsCategoryOverlay" no-wrap></b-overlay>
                            <b-form class="row">
                                <b-form-group class="col-md-12" id="category_name_group" label="Kategori Adı" label-for="category_name_input" description="" required>
                                    <b-form-input :class="[contentsCategoryError.category_name ? 'border-danger':'border-dark']" id="category_name_input" v-model="contents_category.category_name" type="text" name="category_name" placeholder="Kategori adı" @click="contentsCategoryError.category_name=false" required></b-form-input>
                                </b-form-group> 

                                <b-form-group class="col-md-12" id="description_group" label="Açıklama" label-for="description_input" description="" required>
                                    <b-form-input :class="[contentsCategoryError.description ? 'border-danger':'border-dark']" id="description_input" v-model="contents_category.description" type="text" name="description" placeholder="Kategori adı" @click="contentsCategoryError.description=false" required></b-form-input>
                                </b-form-group> 

                                <div class="col-12 mt-4">
                                    <div class="row">
                                        <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12" type="button" @click="saveContentsCategory" squared size="lg" variant="primary" v-if="isAddContents">Kaydet</b-button>
                                        <b-button class="col-12" type="button" @click="updateContentsCategory" squared size="lg" variant="primary" v-if="isEditContents">Güncelle</b-button>
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
        name:'AdminContentsCategory',
        head() {
            return {
                title: "Admin İçerik Kategori Sayfası"
            }
        },
        data() {
            return {
                contents_categories:[],
                isAddContents:false,
                isEditContents:false,
                contentsCategoryOverlay:false,
                contents_category:{
                    id:undefined,
                    category_name:undefined,
                    description:undefined,
                    saved_by:undefined
                },
                contentsCategoryError:{
                   category_name:false,
                   description:false
                },
            }
        },
        props:{

        },
        methods:{
            addContentsCategoryPopup(){
                this.contents_category.id = undefined;
                this.contents_category.category_name = undefined;
                this.contents_category.description = undefined; 
                this.isAddContents = true;
            },
            editContentsCategoryPopup(data){
                this.contents_category.id = data.id;
                this.contents_category.category_name = data.category_name;
                this.contents_category.description = data.description;
                this.isEditContents = true;
            },
            async saveContentsCategory(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                if(_this.contents_category.category_name != '' && _this.contents_category.description != '')
                {
                   _this.contentsCategoryOverlay = true;
                   _this.$store.dispatch('postService' , {"data":_this.contents_category , "urlParameter":"/api/v1/contents_category/add" , "token": token})
                   .then(response => {
                        if(response.success == "success")
                        {
                            this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getContentsCategoryByAdmin();
                            _this.isAddContents = false;
                            _this.contentsCategoryOverlay = false;
                        }
                        else
                        {
                            this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.contentsCategoryOverlay = false;
                        }                  
                    });
                }
                else
                {
                   if(_this.contentsCategoryError.category_name == '' || _this.contentsCategoryError.category_name == null || _this.contentsCategoryError.category_name == undefined)
                      _this.contentsCategoryError.category_name = true;

                  if(_this.contentsCategoryError.description == '' || _this.contentsCategoryError.description == null || _this.contentsCategoryError.description == undefined)
                      _this.contentsCategoryError.description = true;

                }
            },
            async updateContentsCategory(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                if(_this.contents_category.category_name != '' && _this.contents_category.description != '')
                {
                   _this.contentsCategoryOverlay = true;
                   _this.$store.dispatch('postService' , {"data":_this.contents_category , "urlParameter":"/api/v1/contents_category/update/" + _this.contents_category.id , "token": token})
                   .then(response => {
                        if(response.success == "success")
                        {
                            this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getContentsCategoryByAdmin();
                            _this.isEditContents = false;
                            _this.contentsCategoryOverlay = false;
                        }
                        else
                        {
                            this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.contentsCategoryOverlay = false;
                        }                  
                    });
                }
                else
                {
                   if(_this.contentsCategoryError.category_name == '' || _this.contentsCategoryError.category_name == null || _this.contentsCategoryError.category_name == undefined)
                      _this.contentsCategoryError.category_name = true;

                  if(_this.contentsCategoryError.description == '' || _this.contentsCategoryError.description == null || _this.contentsCategoryError.description == undefined)
                      _this.contentsCategoryError.description = true;

                }
            },
            async deleteContentsCategoryPopup(id){
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
                        _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents_category/delete/" + id , "token": token})
                        .then(response => {
                            if(response.success == "success")
                            {
                                _this.$bvToast.toast('Kategori başarıyla silindi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                                _this.getContentsCategoryByAdmin();
                            }
                            else
                            {
                                if(response.error.errno == 1451)
                                {
                                    _this.$bvToast.toast('Kategorinin bağlı olduğu haberler bulunmaktadır. Önce bağlı olduğu kategorileri siliniz.', 
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
            async getContentsCategoryByAdmin(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents_category" , "token": token})
                .then(response => {
                      if(response)
                      {
                         _this.contents_categories = response;
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
                this.contents_category.saved_by = userId;
                this.getContentsCategoryByAdmin();
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
    .popup {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #00000040;
        z-index: 9999999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-content {
        background: #ffffff;
        position: relative;
    }

    .popup-close {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        font-size: 30px;
        line-height: 15px;
        height: 20px;
        cursor: pointer;
        z-index: 1;
    }
</style>
