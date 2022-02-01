<template>
    <div class="admin-settings" id="adminSettings">
        <AdminHeader/>      
        <div class="admin-content-wrapper" v-if="settings">
            <div class="row mt-4">
                <div class="col-12" v-b-toggle.collapse-header>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Header Menü</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-header" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newMainMenu" squared size="sm" variant="primary">+ Ana Menü Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(H,index) in headerMenu" :key="`key${index}`">
                                        <span class="col-md-3 pr-2">
                                            <b-form-input class="border-dark" :id="`headerName${index}`" v-model="H.name" type="text" :name="`headerName${index}`" placeholder="Ana Menüyü yazın.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-3 pr-0">
                                            <b-form-input class="border-dark" :id="`headerSort${index}`" v-model="H.sort" type="number" :name="`headerSort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-3 pr-0">
                                            <b-form-input class="border-dark" :id="`headerUrl${index}`" v-model="H.url" type="text" :name="`headerUrl${index}`" placeholder="URL giriniz.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-button class="col-12" type="button" @click="newSubMenu(index)" squared size="sm" variant="primary">+ Alt Menü Ekle</b-button>
                                        </span>
                                        <span class="col-md-1">
                                            <b-button class="col-12" type="button" @click="deleteMainMenu(index)" squared size="sm" variant="danger">- Sil</b-button>
                                        </span>
                                        <div class="col-md-12 pl-5 pr-4" v-if="H.child">
                                            <div class="row mt-3">
                                                <ul class="col-12">
                                                    <li class="row mb-2" v-for="(SubH,indexSub) in H.child" :key="`keySub${indexSub}`">
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`headerSubName${indexSub}`" v-model="SubH.name" type="text" :name="`headerSubName${indexSub}`" placeholder="Ana Menüyü yazın.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`headerSubSort${indexSub}`" v-model="SubH.sort" type="number" :name="`headerSubSort${indexSub}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`headerSubUrl${indexSub}`" v-model="SubH.url" type="text" :name="`headerSubUrl${indexSub}`" placeholder="URL giriniz.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-1">
                                                            <b-button class="col-12" type="button" @click="deleteSubMenu(index,indexSub)" squared size="sm" variant="danger">- Sil</b-button>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-footer>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Footer Menü</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-footer" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newMainFooterMenu" squared size="sm" variant="primary">+ Ana Menü Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(F,index) in footerMenu" :key="`key${index}`">
                                        <span class="col-md-3 pr-2">
                                            <b-form-input class="border-dark" :id="`footerName${index}`" v-model="F.title" type="text" :name="`footerName${index}`" placeholder="Başlık yazın.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-3 pr-0">
                                            <b-form-input class="border-dark" :id="`footerSort${index}`" v-model="F.sort" type="number" :name="`footerSort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-button class="col-12" type="button" @click="newSubFooterMenu(index)" squared size="sm" variant="primary">+ Alt Menü Ekle</b-button>
                                        </span>
                                        <span class="col-md-1">
                                            <b-button class="col-12" type="button" @click="deleteMainFooterMenu(index)" squared size="sm" variant="danger">- Sil</b-button>
                                        </span>
                                        <div class="col-md-12 pl-5 pr-4" v-if="F.sub_category">
                                            <div class="row mt-3">
                                                <ul class="col-12">
                                                    <li class="row mb-2" v-for="(SubF,indexSub) in F.sub_category" :key="`keySub${indexSub}`">
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`footerSubName${indexSub}`" v-model="SubF.name" type="text" :name="`footerSubName${indexSub}`" placeholder="Alt Menüyü yazın.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-3 pr-0" v-if="SubF.sort">
                                                            <b-form-input class="border-dark" :id="`footerSubSort${indexSub}`" v-model="SubF.sort" type="number" :name="`footerSubSort${indexSub}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`footerSubUrl${indexSub}`" v-model="SubF.url" type="text" :name="`footerSubUrl${indexSub}`" placeholder="URL giriniz.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-1">
                                                            <b-button class="col-12" type="button" @click="deleteSubFooterMenu(index,indexSub)" squared size="sm" variant="danger">- Sil</b-button>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-logo>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Site Logo</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-logo" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <editor
                                v-model="settings.logo"
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
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-contact>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>İletişim Bilgileri</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-contact" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2" v-for="(C,index) in contact" :key="`key${index}`">
                                        <span class="col-md-3 pr-2">
                                            <b-form-input class="border-dark" :id="`contactName${index}`" v-model="C.name" type="text" :name="`contactName${index}`" placeholder="Ana Menüyü yazın.." size="sm" disabled></b-form-input>
                                        </span>
                                        <span class="col-md-6 pr-0">
                                            <b-form-input class="border-dark" :id="`contactValue${index}`" v-model="C.value" type="text" :name="`contactValue${index}`" :placeholder="`${C.name} giriniz..`" size="sm"></b-form-input>
                                        </span>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-maps>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Google Maps</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-maps" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <editor
                                v-model="settings.maps"
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
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-social>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Sosyal Medya</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-social" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newSocialMedia" squared size="sm" variant="primary">+ Sosyal Medya Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(S,index) in social" :key="`key${index}`">
                                        <span class="col-md-2 pr-2">
                                            <b-form-input class="border-dark" :id="`socialName${index}`" v-model="S.name" type="text" :name="`socialName${index}`" placeholder="Sosyal Media İsim.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-input class="border-dark" :id="`socialLink${index}`" v-model="S.link" type="text" :name="`socialLink${index}`" placeholder="Link giriniz.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-input class="border-dark" :id="`socialSort${index}`" v-model="S.sort" type="number" :name="`socialSort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-input class="border-dark" :id="`socialIcon${index}`" v-model="S.icon" type="text" :name="`socialIcon${index}`" placeholder="İkon adını giriniz.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-select class="border-dark" v-model="S.is_active" name="socialActive" size="sm">
                                                <b-form-select-option value="1">Aktif</b-form-select-option>
                                                <b-form-select-option value="0">Pasif</b-form-select-option>
                                            </b-form-select>
                                        </span> 
                                        <span class="col-md-1">
                                            <b-button class="col-12" type="button" @click="deleteSocialMedia(index)" squared size="sm" variant="danger">- Sil</b-button>
                                        </span>                                      
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-md-4 mx-auto">
                    <button @click="saveSettings" id="saveSettings" class="w-100 btn btn-md btn-outline-primary px-4">
                        Ayarları Kaydet
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    export default 
    {
        name:'AdminSettings',
        components: {
            'editor': Editor
        },
        head() {
            return {
                title: "Admin Ayarlar Sayfası"
            }
        },
        data() {
            return {
                settings:undefined,
                footerMenu:undefined,
                headerMenu:undefined,
                contact:undefined,
                social:undefined
            }
        },
        props:{

        },
        methods:{
            async saveSettings(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$bvModal.msgBoxConfirm('Ayarları kaydetmek istiyor musunuz?',{
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
                        _this.settings.header_menu = JSON.stringify(_this.headerMenu);
                        _this.settings.footer_menu = JSON.stringify(_this.footerMenu);
                        _this.settings.contact = JSON.stringify(_this.contact);
                        _this.settings.social_media = JSON.stringify(_this.social);
                        _this.$store.dispatch('postService' , {"data":_this.settings , "urlParameter":"/api/v1/siteSettings/update/all" , "token": token})
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
                                    _this.getSettings();
                                } , 1000)
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
                })
                .catch(err => {
                   
                }); 
            },
            newMainMenu(){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        _this.headerMenu.push({name:"",url:"",sort:0});
                    }
                })
                .catch(err => {
                   
                });                
            },
            newSubMenu(index){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        if(_this.headerMenu[index].child)
                            _this.headerMenu[index].child.push({name:"",url:"",sort:0});
                        else
                        {
                            _this.headerMenu[index].child = [];
                            _this.headerMenu[index].child.push({name:"",url:"",sort:0});
                        }
                    }
                })
                .catch(err => {
                   
                });                
            },
            deleteMainMenu(index){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        _this.headerMenu.splice(index,1);
                    }
                })
                .catch(err => {
                   
                });
                
            },
            deleteSubMenu(mainIndex,subIndex){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        _this.headerMenu[mainIndex].child.splice(subIndex,1);
                    }
                })
                .catch(err => {
                   
                }); 
                
            },

            newMainFooterMenu(){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        _this.footerMenu.push({title:"",sort:0,sub_category:[]});
                    }
                })
                .catch(err => {
                   
                });                 
            },
            newSubFooterMenu(index){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        if(_this.footerMenu[index].sub_category)
                            _this.footerMenu[index].sub_category.push({name:"",url:"",sort:0});
                        else
                        {
                            _this.footerMenu[index].sub_category = [];
                            _this.footerMenu[index].sub_category.push({name:"",url:"",sort:0});
                        }
                    }
                })
                .catch(err => {
                   
                });                
            },
            deleteMainFooterMenu(index){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                       _this.footerMenu.splice(index,1);  
                    }
                })
                .catch(err => {
                   
                });
                
            },
            deleteSubFooterMenu(mainIndex,subIndex){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                       _this.footerMenu[mainIndex].sub_category.splice(subIndex,1);           
                    }
                })
                .catch(err => {
                   
                });
                
            },
            newSocialMedia(){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        _this.social.push({name:"",link:"",sort:0 , icon:"", is_active:1});
                    }
                })
                .catch(err => {
                   
                });
            },
            deleteSocialMedia(index){
                var _this = this;                
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
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
                        _this.social.splice(index,1);                    
                    }
                })
                .catch(err => {
                   
                });
            },
            getSettings(){
                var _this = this;
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/siteSettings" , "token": ""})
                .then(response => {
                    if(response)
                    {
                        _this.settings = response[0];
                        _this.headerMenu = JSON.parse(response[0].header_menu);
                        _this.footerMenu = JSON.parse(response[0].footer_menu);
                        _this.contact = JSON.parse(response[0].contact);
                        _this.social = JSON.parse(response[0].social_media);
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
                _this.getSettings();
            }
            else
            {
                _this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
                    title: `Başarısız..`,
                    variant: 'danger',
                    autoHideDelay: 500,
                    solid: true
                });
                setTimeout(() => {
                    _this.$router.push("/admin/login");
                },1500)           
            }               
        },
        computed:{
        }
    }
</script>

<style>
    
</style>
