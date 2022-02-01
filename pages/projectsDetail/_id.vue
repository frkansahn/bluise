<template>
    <div class="container-fluid" v-if="isLoading">
        <Header/>
        <Navigation :nav="navigation" v-if="navigation"/>
        <div class="row bg-light">
            <div class="container">
                <div class="row my-4 my-md-5">
                    <div class="col-12 mb-2 mb-md-4 projects-title">
                        <h1 class="text-left">
                            {{projects.subject}}
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-md-4 my-3 my-md-0" v-if="projects.image != ''">
                                <img :data-src="projects.image" :alt="projects.subject" :title="projects.subject" v-lazy-load>
                            </div>
                            <div :class="[projects.image != '' ? 'col-12 col-md-8' : 'col-md-12']">
                                <p v-html="projects.description"></p>
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
        name:'ProjectsDetails',
        data() {
            return {
                isLoading:false,
                navigation:undefined,
                projects:undefined
            }
        },
        props:{

        },
        methods:{
            getProjectsDetail(){            
                var _this = this;
                var id = _this.$route.params.id;
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects/" + id , "token":""})
                .then(response => {
                    _this.projects = response[0];
                    _this.isLoading = true;
                    _this.navigation = [
                        {
                            "name":"Projeler",
                            "url":"/projects"
                        },
                        {
                            "name":_this.projects.subject,
                            "url":"/projectsDetail/" + _this.projects.id
                        }
                    ] 
                });
            }
        },
        created(){
            var _this = this;
            _this.getProjectsDetail();   
        }
    }
</script>

<style>
    @media screen and (max-width: 768px)
    {
    }

    @media screen and (max-width: 540px)
    {
        .projects-title h1
        {
            font-size: 20px;
            line-height: 26px;
        }
    }
</style>
