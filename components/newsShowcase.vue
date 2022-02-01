<template>
	<div class="news-showcase" id="newsShowcase">
		<div class="row" v-if="news">
			<div class="col-12 mb-3 mt-5 text-center block-title">
				<span>
					Haberler
				</span>
			</div>
			<div class="col-12 px-md-2">
				<div class="row">
					<newsCart v-for="(n,index) in news" v-bind:key="`NewsCart${index}`" :news="n" :index="index"/>
				</div>
			</div>
			<div class="col-12 mt-3 mb-5 d-flex align-items-center justify-content-center" v-if="news.length > 11">
				<NuxtLink to="/news" class="show-all">
					Tümünü Gör
				</NuxtLink>
			</div>
		</div>		
	</div>
</template>
<script>
	import newsCart from '@/components/newsCart'
	export default{
		name:'NewsShowcase',
	    components:{
	    	newsCart
	    },
	    data() {
	        return {
	        	news:[]
	        }
	    },
	    props:{
	         
	    },
	    methods:{

	    },
	    created(){
	    	var _this = this;
			_this.$store.dispatch('getService' , {"urlParameter":"/api/v1/news" , "token":""})
			.then(response => {
				_this.news = response;
			});			
		}
	}
</script>

<style>
	.block-title {
	    font-size: 35px;
	    font-weight: 500;
	    color: #007cc2;
	}

	.block-title:before 
	{
	    content: '';
	    position: absolute;
	    left: 0;
	    right: 0;
	    top: 30px;
	    background: #007cc2;
	    height: 1px;
	    width: 100%;
	    z-index: -1;
	}

	.block-title span {
	    background: #ffffff;
	    padding: 0 2em;
	}

	a.show-all {
	    padding: .5em 2em;
	    background: #007cc2;
	    border: 1px solid #007cc2;
	    color: #ffffff;
	    font-weight: 500;
	    font-size: 16px;
	    border-radius: 6px;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}

	a.show-all:hover {
	    border: 1px solid #007cc2;
	    background: #ffffff;
	    color: #007cc2;
	    text-decoration: none;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}
</style>
