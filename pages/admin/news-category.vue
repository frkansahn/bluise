<template>
   <div class="admin-news-category" id="adminNewsCategory">
        <AdminHeader/>      
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Haber Kategorileri
                        <button @click="addNewsCategoryPopup" id="addNewsCategory" class="btn float-right text-secondary">
                            + Ekle
                        </button>
                    </h3>
                    <table class="table table-sm" id="adminNewsCategoryTable">
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
                            <tr v-for="(NC,index) in news_categories" :key="`bodyNews${index}`">
                                <td>{{NC.category_name}}</td>
                                <td>{{NC.description}}</td>
                                <td>{{NC.saved_by}}</td>
                                <td>
                                    <button @click="editNewsCategoryPopup(NC)" id="editNewsCategory" class="btn btn-sm btn-outline-primary px-4">
                                        Düzenle
                                    </button>
                                </td>
                                <td>
                                    <button @click="deleteNewsCategoryPopup(NC.id)" id="deleteNewsCategory" class="btn btn-sm btn-outline-danger px-4">
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
            <div class="popup" v-show="isAddNews || isEditNews">
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="isAddNews=false;isEditNews=false;">
                        &times;
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <b-overlay :show="newsCategoryOverlay" no-wrap></b-overlay>
                            <b-form class="row">
                                <b-form-group class="col-md-12" id="category_name_group" label="Kategori Adı" label-for="category_name_input" description="" required>
                                    <b-form-input :class="[newsCategoryError.category_name ? 'border-danger':'border-dark']" id="category_name_input" v-model="news_category.category_name" type="text" name="category_name" placeholder="Kategori adı" @click="newsCategoryError.category_name=false" required></b-form-input>
                                </b-form-group> 

                                <b-form-group class="col-md-12" id="description_group" label="Açıklama" label-for="description_input" description="" required>
                                    <b-form-input :class="[newsCategoryError.description ? 'border-danger':'border-dark']" id="description_input" v-model="news_category.description" type="text" name="description" placeholder="Kategori adı" @click="newsCategoryError.description=false" required></b-form-input>
                                </b-form-group> 

                                <div class="col-12 mt-4">
                                    <div class="row">
                                        <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12" type="button" @click="saveNewsCategory" squared size="lg" variant="primary" v-if="isAddNews">Kaydet</b-button>
                                        <b-button class="col-12" type="button" @click="updateNewsCategory" squared size="lg" variant="primary" v-if="isEditNews">Güncelle</b-button>
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
        name:'AdminNewsCategory',
        head() {
            return {
                title: "Admin Haber Kategori Sayfası"
            }
        },
        data() {
            return {
                news_categories:[],
                isAddNews:false,
                isEditNews:false,
                newsCategoryOverlay:false,
                news_category:{
                    id:undefined,
                    category_name:undefined,
                    description:undefined,
                    saved_by:undefined
                },
                newsCategoryError:{
                   category_name:false,
                   description:false
                },
            }
        },
        props:{

        },
        methods:{
            addNewsCategoryPopup(){
                this.news_category.id = undefined;
                this.news_category.category_name = undefined;
                this.news_category.description = undefined; 
                this.isAddNews = true;
            },
            editNewsCategoryPopup(data){
                this.news_category.id = data.id;
                this.news_category.category_name = data.category_name;
                this.news_category.description = data.description;
                this.isEditNews = true;
            },
            async saveNewsCategory(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                if(_this.news_category.category_name != '' && _this.news_category.description != '')
                {
                   _this.newsCategoryOverlay = true;
                   _this.$store.dispatch('postService' , {"data":_this.news_category , "urlParameter":"/api/v1/news_category/add" , "token": token})
                   .then(response => {
                        if(response.success == "success")
                        {
                            this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getNewsCategoryByAdmin();
                            _this.isAddNews = false;
                            _this.newsCategoryOverlay = false;
                        }
                        else
                        {
                            this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.newsCategoryOverlay = false;
                        }                  
                    });
                }
                else
                {
                   if(_this.newsCategoryError.category_name == '' || _this.newsCategoryError.category_name == null || _this.newsCategoryError.category_name == undefined)
                      _this.newsCategoryError.category_name = true;

                  if(_this.newsCategoryError.description == '' || _this.newsCategoryError.description == null || _this.newsCategoryError.description == undefined)
                      _this.newsCategoryError.description = true;

                }
            },
            async updateNewsCategory(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                if(_this.news_category.category_name != '' && _this.news_category.description != '')
                {
                   _this.newsCategoryOverlay = true;
                   _this.$store.dispatch('postService' , {"data":_this.news_category , "urlParameter":"/api/v1/news_category/update/" + _this.news_category.id , "token": token})
                   .then(response => {
                        if(response.success == "success")
                        {
                            this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getNewsCategoryByAdmin();
                            _this.isEditNews = false;
                            _this.newsCategoryOverlay = false;
                        }
                        else
                        {
                            this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.newsCategoryOverlay = false;
                        }                  
                    });
                }
                else
                {
                   if(_this.newsCategoryError.category_name == '' || _this.newsCategoryError.category_name == null || _this.newsCategoryError.category_name == undefined)
                      _this.newsCategoryError.category_name = true;

                  if(_this.newsCategoryError.description == '' || _this.newsCategoryError.description == null || _this.newsCategoryError.description == undefined)
                      _this.newsCategoryError.description = true;

                }
            },
            async deleteNewsCategoryPopup(id){
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
                        _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news_category/delete/" + id , "token": token})
                        .then(response => {
                            if(response.success == "success")
                            {
                                _this.$bvToast.toast('Kategori başarıyla silindi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                                _this.getNewsCategoryByAdmin();
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
            async getNewsCategoryByAdmin(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news_category" , "token": token})
                .then(response => {
                      if(response)
                      {
                         _this.news_categories = response;
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
                this.news_category.saved_by = userId;
                this.getNewsCategoryByAdmin();
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
