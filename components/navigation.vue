<template>
	<div class="navigation" id="navigation" v-if="nav">
		<div class="row">
			<ul class="col-12" itemscope itemtype="http://schema.org/BreadcrumbList">
				<li class="float-left home-navigation" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					<NuxtLink to="/">
						<span itemprop="name">
							<b-icon-house-door-fill variant="secondary" font-scale="1.2"></b-icon-house-door-fill>
							Anasayfa
						</span>
					</NuxtLink>
					<meta itemprop="position" content="1">
				</li>
				<li class="float-left pl-1" v-for="(N,index) in nav" :key="`navigation${index}`" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
					/ 
					<NuxtLink :to="N.url" :title="N.name" itemprop="item">
						<span itemprop="name">
							{{N.name}}
						</span>
					</NuxtLink>
					<meta itemprop="position" :content="index+2">
				</li>
			</ul>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'Navigation',
	    data() {
	        return {
	        }
	    },
	    props:["nav"]
	}
</script>

<style scoped>
	#navigation ul li {
	    list-style-type: none;
	    font-size: 12px;
	}

	#navigation ul li a {
	    color: #000000;
	    font-size: 12px;
	}

	@media screen and (max-width: 768px)
   	{
   	}

   	@media screen and (max-width: 540px)
   	{
      	#navigation ul li , #navigation ul li a {
      		font-size: 10px;
		}
   	}
</style>
