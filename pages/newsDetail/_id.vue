<template>
    <div class="container-fluid" v-if="isLoading">
        <Header/>
        <Navigation :nav="navigation" v-if="navigation"/>
        <div class="row bg-light">
            <div class="container">
                <div class="row my-4 my-md-5">
                    <div class="col-12 mb-2 mb-md-4 news-title">
                        <h1 class="text-left">
                            {{news.subject}}
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-md-4 my-3 my-md-0" v-if="news.image != ''">
                                <img :data-src="news.image" :alt="news.subject" :title="news.subject" v-lazy-load>
                            </div>
                            <div :class="[news.image != '' ? 'col-12 col-md-8' : 'col-md-12']">
                                <p v-html="news.description"></p>
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
        name:'NewsDetails',
        components:{
            Header,Footer,Navigation
        },
        data() {
            return {
                isLoading:false,
                navigation:undefined,
                news:undefined
            }
        },
        props:{

        },
        methods:{
            getNewsDetail(){            
                var _this = this;
                var id = _this.$route.params.id;
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news/" + id , "token":""})
                .then(response => {
                    _this.news = response[0];
                    _this.isLoading = true;
                    _this.navigation = [
                        {
                            "name":"Haberler",
                            "url":"/news"
                        },
                        {
                            "name":_this.news.subject,
                            "url":"/newsDetail/" + _this.news.id
                        }
                    ] 
                });
            }
        },
        created(){
            var _this = this;
            _this.getNewsDetail();   
        }
    }
</script>

<style>
    @media screen and (max-width: 768px)
    {
    }

    @media screen and (max-width: 540px)
    {
        .news-title h1
        {
            font-size: 20px;
            line-height: 26px;
        }
    }
</style>
