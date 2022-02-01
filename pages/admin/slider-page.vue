<template>
    <div class="admin-settings" id="adminSettings">
        <AdminHeader/>      
        <div class="admin-content-wrapper" v-if="settings">
            <div class="row mt-4">
                <div class="col-12" v-b-toggle.collapse-logo>
                    <h5>
                        İnteraktif Vitrin 
                    </h5>
                    <p>
                        Anasayfada header'ın altında bulunan slider alan ayarları
                    </p>
                </div>
                <div class="col-12">
                    <div class="row my-2">
                        <div class="col-12">
                            <b-button class="col-2" type="button" @click="newSlider" squared size="sm" variant="primary">+ Slider Ekle</b-button>
                        </div>
                    </div>
                    <div class="row mb-4" v-for="(S,index) in slider" :key="`slider${index}`">
                        <div class="col-md-3 mt-2">
                            <b-form-group label="Slider Başlık" :label-for="`sliderTitle${index}`" description="" required>
                                <b-form-input class="border-dark" :id="`sliderTitle${index}`" v-model="S.title" type="text" :name="`sliderTitle${index}`" placeholder="Slider başlık.." size="sm"></b-form-input>  
                            </b-form-group> 
                            <b-form-group label="Slider URL" :label-for="`sliderUrl${index}`" description="" required>
                                <b-form-input class="border-dark" :id="`sliderUrl${index}`" v-model="S.url" type="text" :name="`sliderUrl${index}`" placeholder="Slider URL.." size="sm"></b-form-input>  
                            </b-form-group> 
                            <b-form-group label="Slider Sıralama" :label-for="`sliderSort${index}`" description="" required>
                                <b-form-input class="border-dark" :id="`sliderSort${index}`" v-model="S.sort" type="number" :name="`sliderSort${index}`" placeholder="Slider Sıralama.." size="sm"></b-form-input>  
                            </b-form-group>   
                            <span class="col-md-12 px-0">
                                <b-button class="col-3 mt-2" type="button" @click="deleteSlider(index)" squared size="sm" variant="danger">- Sil</b-button>
                            </span>                                        
                        </div>
                        <div class="col-md-9 mt-4">
                            <editor
                                v-model="S.image"
                                api-key="s7u29tgilrvtq5reoies8hkux66ow3f1mavn7nby76tfszx2"
                                :init="init" required />                   
                        </div>
                    </div>
                </div>
                
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
        name:'AdminSlider',
        components: {
            'editor': Editor
        },
        head() {
            return {
                title: "İnteraktif Vitrin Sayfası"
            }
        },
        data() {
            return {
                settings:undefined,
                slider:undefined,
                init:{
                   language : 'tr',
                   min_height: 500,
                   preview_styles: 'font-size color',
                   resize: 'both',
                   plugins: 'link image media code autolink lists media table',
                   toolbar: 'undo redo | styleselect| forecolor  | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image media| code table',
                   toolbar_mode: 'floating',
                   image_title: true,
                   automatic_uploads: true, 
                   images_upload_url: this.$nuxt.context.env.baseUrl + '/api/v1/image/upload', 
                   file_picker_types: 'image',
                   tinycomments_mode: 'embedded',
                   tinycomments_author: 'Furkan ŞAHİN',
                   relative_urls: false,
                   remove_script_host: false,
                   convert_urls: true
                }
            }
        },
        props:{

        },
        methods:{
            async saveSettings(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.slider = _this.slider.map(item => {
                    item.image = encodeURIComponent(item.image);
                    return item;
                })
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
                        _this.$store.dispatch('postService' , {"data":_this.slider , "urlParameter":"/api/v1/siteSettings/update/home_page_slider" , "token": token})
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
            newSlider(){
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
                        _this.slider.push({title:"",url:"",sort:0,image:""});
                    }
                })
                .catch(err => {
                   
                });                
            },
            deleteSlider(index){
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
                        _this.slider.splice(index,1);
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
                        _this.slider = JSON.parse(response[0].home_page_slider);
                        _this.slider = _this.slider.map(item => {
                            item.image = decodeURIComponent(item.image);
                            return item;
                        })
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
