<template>
    <div class="col-12 px-md-4" id="otherContents">
        <h4>
            <b-icon-card-list variant="secondary" font-scale="1"></b-icon-card-list>
            {{title}}
        </h4>
        <div class="row mt-3">
            <ul class="col-12">
                <li class="float-left w-100 border-bottom border-secondary" v-for="(C,index) in otherContents" :key="`OtherContent${index}`">
                    <NuxtLink :to="`/contents/${C.seo_link}`">
                        {{C.subject}}
                    </NuxtLink>
                </li>
            </ul>
        </div>        
    </div>
</template>

<script>
    export default 
    {
        name:'OtherContents',
        components:{
            
        },
        data() {
            return {
            }
        },
        props:["otherContents","title"],
        methods:{
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
</style>
