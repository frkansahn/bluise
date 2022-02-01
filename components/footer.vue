<template>
	<div class="row">
		<div class="col-12 footer" id="footer" v-if="$store.state.config">
			<div class="col-12 social-media mb-5 border-bottom border-white">
				<div class="row">
					<h3 class="col-12 text-center">
						#Bizi Takip Edin#
					</h3>
					<ul class="col-12 text-center pt-4 pb-4">
						<li class="float-none d-inline-block px-3 px-md-4" v-for="(S,index) in sortedSocialMedia" :id="`footerSocialMedia${index}`">
							<a :href="S.link" target="_blank">
								<b-icon :icon="S.icon" font-scale="1.5"></b-icon>
							</a>
						</li>
					</ul>
				</div>						
			</div>
			<div class="container">
				
				<div class="row mb-5">
					<div class="col-12">
						<div class="row">
							<div class="col-12 col-sm-4 col-md-3" v-for="(F,index) in sortedFooterMenu" :id="`footerMenu${index}`">
								<div class="row">
									 <h3 class="col-12">
										{{F.title}}
									</h3>
									<ul class="col-12">
										<li class="float-left w-100" v-for="(Sub,index) in F.sub_category">
											<NuxtLink :to="Sub.url">
												{{Sub.name}}
											</NuxtLink>
										</li>
									</ul>
								</div>							
							</div>
							<div class="col-12 col-sm-4 col-md-3" id="footerMenuIletisim">
								<div class="row">
									 <h3 class="col-12">
										İletişim
									</h3>
									<ul class="col-12 mt-2">
										<li class="float-left w-100 mb-2">
											<b-icon-map variant="light" font-scale="0.9" class="mr-3 mt-1"></b-icon-map>
											<span>
												Adres: Kemer Mah. Mehmet Akif İnan Cd. No: 85, 34230 Esenler/İstanbul
											</span>
										</li>
										<li class="float-left w-100 mb-2">
											<b-icon-telephone-forward variant="light" font-scale="0.9" class="mr-3 mt-1"></b-icon-telephone-forward>
											<span class="d-flex">
												<NuxtLink to="tel:02124385052">
													0212 438 50 52
												</NuxtLink>												
											</span>
										</li>
										<li class="float-left w-100 mb-2">
											<b-icon-mailbox variant="light" font-scale="0.9" class="mr-3 mt-1"></b-icon-mailbox>
											<span class="d-flex">
												<NuxtLink to="mailto:info@eskonas.com.tr">
													info@eskonas.com.tr
												</NuxtLink>												
											</span>
										</li>
									</ul>
								</div>							
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 tumHaklar text-center">
						©Copyright 2022 <strong>Eskon A.Ş.</strong> Tüm Hakları Saklıdır
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'Footer',
	    components:{
	    },
	    props:{
	         
	    },
	    data() {
	        return {
	        	isMobile:false
	        }
	    },
	    methods:{

	    },
	    async mounted(){	
	    	this.isMobile = window.screen.width > 768 ? false : true;
		},
		computed: {
			sortedFooterMenu: function() {
				function compare(a, b) {
					if (a.sort < b.sort)
						return -1;
					if (a.sort > b.sort)
						return 1;
					return 0;
				}

				return JSON.parse(this.$store.state.config.footer_menu).sort(compare);
			},
			sortedSocialMedia: function() {
				function compare(a, b) {
					if (a.sort < b.sort)
						return -1;
					if (a.sort > b.sort)
						return 1;
					return 0;
				}

				return JSON.parse(this.$store.state.config.social_media).sort(compare);
			}
		}
	}
</script>

<style>	

	#footer {
		background: linear-gradient(180deg, #0074b5 33%, #444444);
		padding: 5em 0 0 0;
	}

	.social-media h3 {
		color: #ffffff;
	}

	.social-media ul li {
		list-style-type: none;
	}

	.social-media ul li a 
	{
		color: #ffffff;
	}

	.social-media ul li a:hover svg {
		transform: scale(1.5);
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	.social-media ul li a svg {
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	[id*=footerMenu] h3 {
		font-size: 20px;
		color: #ffffff;
	}

	[id*=footerMenu] ul li {
		list-style-type: none;
	}

	[id*=footerMenu] ul li a {
		color: #ffffff;
		font-size: 12px;
	}

	#footerMenuIletisim li {
		display: flex;
		align-items: baseline;
	}

	#footerMenuIletisim li span {
		color: #ffffff;
		font-size: 14px;
	}

	#footerMenuIletisim li span a {
	    font-size: 15px;
	}

	.tumHaklar
	{
		font-size: 15px;
		font-weight: normal;
		color: #ffffff;
		padding: 1em 0;
	}
</style>
