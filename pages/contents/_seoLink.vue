<template>
    <div class="container-fluid">
        <Header/>
        <Navigation :nav="navigation" v-if="navigation"/>
        <div class="row bg-light" v-if="isLoading">
            <div class="container">
                <div class="row my-3 my-md-5">
                    <div class="col-md-3" v-if="otherContents.length > 1">
                        <div class="row">
                            <OtherContents :otherContents="otherContents" title="İçerikler"/>
                        </div>
                    </div>
                    <div :class="[otherContents.length > 1 ? 'col-12 col-md-9':'col-md-12']">
                        <div class="row mt-4 mt-md-0">
                            <div class="col-12 mb-4">
                                <h1 class="text-left" id="contentsTitle">
                                    {{contents.subject}}
                                </h1>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div :class="[contents.image ? 'col-8' : 'col-12']">
                                        <p v-html="contents.description"></p>
                                    </div>
                                    <div class="col-4" v-if="contents.image">
                                        <img :data-src="contents.image" :alt="contents.subject" :title="contents.subject" v-lazy-load>
                                    </div>
                                </div>
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
        name:'ContentsDetails',
        data() {
            return {
                isLoading:false,
                navigation:undefined,
                contents:undefined,
                otherContents:[]
            }
        },
        props:{

        },
        methods:{
            getContentDetail(){            
                var _this = this;
                var seoLink = _this.$route.params.seoLink;
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents/getContentsBySeoLink/" + seoLink , "token":""})
                .then(response => {
                    _this.contents = response[0];
                    
                    if(_this.contents)
                    {
                        _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents/getContentForCategoryId/" + _this.contents.category_id , "token":""})
                        .then(response => {
                            _this.otherContents = response;
                            _this.isLoading = true;
                            _this.navigation = [
                                {
                                    "name":_this.contents.subject,
                                    "url":"/contents/" + _this.contents.seo_link
                                }
                            ] 
                        });
                    }
                });
            }
        },
        created(){
            var _this = this;
            _this.getContentDetail();   
        }
    }
</script>

<style>
    #otherContents ul li {
        list-style-type: none;
        border-bottom: 1px solid;
    }

    #otherContents ul li a {
        color: #000000;
        font-size: 14px;
        font-weight: 400;
        line-height: 3em;
    }

    @media screen and (max-width: 768px)
    {
    }

    @media screen and (max-width: 540px)
    {
        h1#contentsTitle
        {
            font-size: 24px;
        }
    }
</style>
