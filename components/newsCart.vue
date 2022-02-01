<template>
	<div class="col-6 col-sm-4 col-md-3 px-4 py-2 news-cart" :id="`newsCart${index}`">
		<div class="row shadow-sm">
			<div class="col-12 p-0">
				<NuxtLink :to="`/newsDetail/${news.id}`" class="float-left w-100 image-wrapper" style="padding-bottom: 75%;">
					<span>
						<img :data-src="news.image" :alt="news.seo_title" :title="news.seo_title" v-lazy-load>
					</span>					
				</NuxtLink>
			</div>
			<div class="col-12 pt-2 content">
				<div class="row">
					<div class="col-12 mb-1 mt-2 news-subject">
						{{news.subject}}
					</div>
					<div class="col-12 news-description mb-2">
						<p :title="news.description" v-html="news.short_description"></p>				
					</div>
					<div class="col-12 news-date mb-2">
						<small class="float-right text-secondary">
							{{news.saved_date | dateFormat}}
						</small>				
					</div>
				</div>
			</div>
			
		</div>		
	</div>
</template>
<script>
	export default{
		name:'NewsCart',
		props:["news" , "index"],
	    components:{
	    },
	    data() {
	        return {
	        }
	    },
	    methods:{

	    },
	    created(){			
		}
	}
</script>

<style>

	.image-wrapper span {
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}

	.news-subject {
	    font-size: 15px;
	    font-weight: 500;
	    color: #000000;
	    height: 25px;
	    overflow: hidden;
	}

	.news-description {
	    font-size: 13px;
	    font-weight: 400;
	    color: #000000;
	    height: 62px;
	    overflow: hidden;
	}

	[id*=newsCart]:hover > .row {
		box-shadow: 0 0.125rem 1rem 6px rgb(0 0 0 / 8%) !important;
		-webkit-transition: all .3s ease;
		-moz-transition: all .3s ease;
		-o-transition: all .3s ease;
		-ms-transition: all .3s ease;
		transition: all .3s ease;
		cursor: pointer;
	}

	[id*=newsCart]:hover .content {
	    background: #064e76;
	}

	[id*=newsCart] > .row {
		-webkit-transition: all .3s ease;
		-moz-transition: all .3s ease;
		-o-transition: all .3s ease;
		-ms-transition: all .3s ease;
		transition: all .3s ease;
	}

	[id*=newsCart]:hover > .row * {
	    color: #ffffff !important;
	}
</style>
