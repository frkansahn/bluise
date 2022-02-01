<template>
	<div class="header" id="header" v-if="$store.state.config">		
		<div class="row pt-md-3 border-bottom shadow mb-4" :class="[stickyActive == true ? 'sticky':'']" id="headerWrapper">
			<div class="col-12 px-1 pl-md-3 pr-md-4 headerTop">
				<div class="container">
					<div class="row">
						<div class="col-2 d-flex align-items-center mobile-menu" v-b-toggle.mobileMenu v-if="isMobile">
							<b-icon-list variant="secondary" font-scale="2"></b-icon-list>
						</div>
						<b-sidebar id="mobileMenu" title="Menü" backdrop-variant="dark" bg-variant="white" backdrop shadow>
							<template #footer>
						       	<div class="bg-primary py-2" id="headerContactMobile">
									<NuxtLink class="col-12 my-1 text-white" to="/contact" title="Üye hesap sayfası">
										<b-icon-telephone-outbound-fill variant="white" font-scale=".8"></b-icon-telephone-outbound-fill>
										İletişim
									</NuxtLink>
								</div>
						    </template>
							<ul class="col-12 mt-4">
								<li class="row" v-for="(H,index) in sortedHeaderMenu" :key="`headerMobileMenu${index}`">								
									<span class="col-12 my-1 text-secondary" :aria-controls="`mobile-accordion-${index}`" v-b-toggle="`mobile-accordion-${index}`" v-if="H.child && H.child.length > 0">
										{{H.name}}
									</span>
									<NuxtLink :to="H.url" class="col-12 my-1 text-secondary" v-else>
										{{H.name}}
									</NuxtLink>
									<b-collapse :id="`mobile-accordion-${index}`" class="col-12 my-2" accordion="Menü" role="tabpanel" v-if="H.child && H.child.length > 0">
										<div class="row">
											<div class="col-12 mobile-child-menu" v-if="H.child && H.child.length > 0">
												<div class="row bg-primary rounded">
													<ul class="col-12 px-4 py-3">
														<li class="row my-1" v-for="(ChildMenu,index) in H.child" :key="`headerMobileChildMenu${index}`">
															<NuxtLink :to="ChildMenu.url" class="px-2 text-white" :title="ChildMenu.name">															
																<b-icon-chevron-right variant="white" font-scale=".8"></b-icon-chevron-right>
																{{ChildMenu.name}}
															</NuxtLink>
														</li>
													</ul>
												</div>
											</div>
										</div>									
									</b-collapse>								
								</li>							
							</ul>
					    </b-sidebar>
						<div class="col-4 col-md-3">
							<NuxtLink to="/" id="logo" v-html="$store.state.config.logo">
							</NuxtLink>
						</div>

						<div class="col-3 offset-3 col-md-1 d-flex align-items-center justify-content-center" id="headerAccount" v-if="isMobile && customerAccount">
							<span class="title">
								<b-icon-person variant="secondary" font-scale="1.5"></b-icon-person>
							</span>	
							<ul>
								<li class="float-left w-100">
									<NuxtLink to="/uye-hesap" title="Üye hesap sayfası">
										Hesabım
									</NuxtLink>
								</li>
								<li class="float-left w-100">
									<NuxtLink to="/application/list" title="Üye başvuru sayfası">
										Başvurularım
									</NuxtLink>
								</li>
								<li class="float-left w-100 logout">
									<span @click="logout">
										<b-icon-box-arrow-in-left variant="secondary" font-scale="1"></b-icon-box-arrow-in-left>
										Çıkış
									</span>
								</li>
							</ul>
						</div>

						<div class="col-12 col-md-5 mt-2 mt-md-0 d-flex align-items-center justify-content-center" id="search">
							<span class="d-flex align-items-center justify-content-between search-page w-100" v-b-modal.pageSearch>
								Site içerisinde arama..
								<b-icon-search variant="secondary" font-scale="1"></b-icon-search>
							</span>		
							<b-modal id="pageSearch" title="Site arama" hide-footer>
								<div class="col-12 mb-4">
									<div class="col-12">
										<b-form-input id="searchInput" v-model="searchInput" type="text" placeholder="Site içinda ara.."></b-form-input>
									</div>
								</div>		         	
					      	</b-modal>		
						</div>
						<div class="col-md-2 d-flex align-items-center justify-content-center" id="headerContact" v-if="!isMobile">
							<NuxtLink to="/contact" title="Üye hesap sayfası">
								<b-icon-telephone-outbound variant="secondary" font-scale=".8"></b-icon-telephone-outbound>
								İletişim
							</NuxtLink>
						</div>
						<div class="col-md-2 d-flex align-items-center justify-content-center" id="headerAccount" v-if="!isMobile && customerAccount">
							<span class="title">
								<b-icon-person variant="secondary" font-scale="1.2" class="mr-1"></b-icon-person>
								Hesabım
							</span>	
							<ul>
								<li class="float-left w-100">
									<NuxtLink to="/uye-hesap" title="Üye hesap sayfası">
										Hesabım
									</NuxtLink>
								</li>
								<li class="float-left w-100">
									<NuxtLink to="/application/list" title="Üye başvuru sayfası">
										Başvurularım
									</NuxtLink>
								</li>
								<li class="float-left w-100 logout">
									<span @click="logout">
										<b-icon-box-arrow-in-left variant="secondary" font-scale="1"></b-icon-box-arrow-in-left>
										Çıkış
									</span>
								</li>
							</ul>
						</div>
							
					</div>
				</div>
			</div>
			
			<div class="d-flex align-items-center justify-content-center border-top mt-3" :class="[customerAccount ? 'col-md-12' : 'col-md-12']" id="headerMenu" v-if="!isMobile">
				<ul class="col-12 text-center m-0">
					<li class="float-none d-inline-block text-left" v-for="(H,index) in sortedHeaderMenu" :key="`headerMenu${index}`" :class="[H.child && H.child.length > 0 ? 'parentChild':'']">
						<NuxtLink :to="H.url" class="float-left py-2 px-4 text-secondary">
							{{H.name}}							
						</NuxtLink>
						<div class="child-menu" v-if="H.child && H.child.length > 0">
							<div class="row">
								<ul class="col-12">
									<li class="float-left w-100" v-for="(ChildMenu,index) in H.child" :key="`headerChildMenu${index}`">
										<NuxtLink :to="ChildMenu.url" :title="ChildMenu.name">
											<b-icon-chevron-right variant="white" font-scale="1"></b-icon-chevron-right>
											{{ChildMenu.name}}
										</NuxtLink>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>				
			</div>
		</div>
		<div class="back-to-top" @click="backToTop" v-if="backTopActive">			
			<b-icon-chevron-double-up variant="white" font-scale="0.8"></b-icon-chevron-double-up>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'Header',
	    data() {
	        return {
	        	customerAccount:false,
	        	isMobile: false,
	        	searchInput:"",
	        	stickyActive:false,
	        	backTopActive:false
	        }
	    },
	    props:{
	         
	    },
	    methods:{
	    	async logout(){
	    		var _this = this;
	    		_this.$cookiz.removeAll();
	    		_this.$router.push("/uye-giris");
	    	},
	    	backToTop(){
	    		window.scrollTo({
				  top: 0,
				  left: 0,
				  behavior: 'smooth'
				});
	    	},
	    	eventWindowResize(){
	    		this.isMobile = window.screen.width > 768 ? false : true;
	    	}
	    },
	    async created(){
	    	var _this = this;
	    	var token = _this.$cookiz.get('token');
	    	var cusId = _this.$cookiz.get('_cusId');
	    	if(token && cusId)
	    	{
	    		_this.customerAccount = true;
	    	}
		},
		async mounted(){
			var _this = this;
			
			_this.isMobile = window.screen.width > 768 ? false : true;
			window.addEventListener("resize", _this.eventWindowResize);

			_this.$store.dispatch('getService' , {"urlParameter":"/api/v1/siteSettings" , "token":""})
			.then(response => {
				if(response)
					_this.$store.commit("config" , response[0]);
			});

			window.document.onscroll = () => {
		      	let navBar = document.getElementById('header');
		      	if(window.scrollY > 150)
		      		_this.stickyActive = true;
		        else
		        	_this.stickyActive = false;

		        if(window.scrollY > 500)
		      		_this.backTopActive = true;
		        else
		        	_this.backTopActive = false;
		    }
		},
		computed: {
			sortedHeaderMenu: function() {
				function compare(a, b) {
					if (a.sort < b.sort)
						return -1;
					if (a.sort > b.sort)
						return 1;
					return 0;
				}

				return JSON.parse(this.$store.state.config.header_menu).sort(compare);
			}
		},
		destroyed() {
		  	window.removeEventListener("resize", this.eventWindowResize);
		}
	}
</script>

<style>

	#header {
	    padding-bottom: calc(145px + 1.5em);
	}

	#headerWrapper {
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    z-index: 1039;
	    background: #ffffff;
	    padding-left: 1em;
	    padding-right: 1em;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}

	#headerContact a {
	    color: #6c757d !important;
	    font-weight: 400;
	}

	.search-page {
        padding: 0.5em 1em;
	    background: #ebebeb;
	    border-radius: 5px;
	    border: 1px solid;
	    font-size: 14px;
	    height: 43px;
	    color: #7c7c7c;
	}

	#headerMenu {
	    height: 50px;
	}

	.sticky #headerMenu {
	    display:none !important; 
	}

	#headerWrapper.sticky {
	    padding: .5em 1em !important;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}

	.back-to-top {
	    position: fixed;
	    right: 20px;
	    bottom: 20px;
	    z-index: 9999;
	    width: 40px;
	    height: 40px;
	    background: #000000;
	    border-radius: 50%;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    cursor: pointer;
	    -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
	    -o-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	    transition: all .3s ease;
	}

	.back-to-top:hover {
	    box-shadow: 0px 0px 7px 0px;
	    -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
	    -o-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	    transition: all .3s ease;
	}

	#logo p {
	    margin: 0;
	}

	#headerWrapper.sticky #logo img {
	    max-height: 54px;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}

	#logo img {
	    max-height: 65px;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	    width: auto;
    	height: auto;
	}

	#headerMenu a {
	    font-weight: 500;
	    height: 50px;
    	line-height: 33px;
	    position: relative;
	    -webkit-transition: all .1s ease;
		-moz-transition: all .1s ease;
		-o-transition: all .1s ease;
		-ms-transition: all .1s ease;
		transition: all .1s ease;
	}

	#headerMenu > ul > li.parentChild {
	    position: relative;
	}

	#headerMenu li.parentChild:hover > a{
	    border-radius:.2em .2em 0 0;
	    background: #007cc2;
	    color: #ffffff !important;
	    text-decoration:none;
	    -webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	#headerMenu li.parentChild:hover .child-menu {
	    opacity: 1;
		visibility: visible;
	    -webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	#headerMenu li.parentChild .child-menu {
		z-index: 9;
		position: absolute;
		left: 0;
		top: 100%;
		min-width: 260px;
		background-color: #007cc2;
		padding: 1em 1.5em;
		opacity: 0;
		visibility: hidden;
		-webkit-transition: all .1s ease;
		-moz-transition: all .1s ease;
		-o-transition: all .1s ease;
		-ms-transition: all .1s ease;
		transition: all .1s ease;
	}

	#headerMenu li.parentChild .child-menu ul li {
		list-style-type: none;
	}

	#headerMenu li.parentChild .child-menu ul li a {
		font-size: 12px;
		color:#ffffff;
	}

	#headerMenu li.parentChild .child-menu ul li a:hover {
		text-decoration: underline;
	}

	#headerMenu {
	    height: 50px;
	}

	#headerAccount ul {
	    display: none;
	    position: absolute;
	    top: calc(100% - 1px);
	    background: #efefef;
	    padding: 1em;
	    box-shadow: 0 0 1rem rgb(0 0 0 / 15%) !important;
	    z-index: 99;
	}

	#headerAccount ul * {
	    color: #6c757d !important;
	    font-weight: 500;
	    line-height: 2em;
	}

	#headerAccount span.title {
	    color: #6c757d !important;
	    font-weight: 400;
		cursor: default;
		display: flex;
    	align-items: center;
	}

	#headerAccount:hover ul {
	    display: block;
	}

	#headerAccount ul li {
	    list-style-type: none;
	}

	#headerAccount ul li.logout span {
	    cursor: pointer;
	}

	@media screen and (max-width: 768px)
	{
		#headerWrapper {
		    padding: .5em 1em;
		}

		.search-page {
		    height: 38px;
		}

		#header {
		    padding-bottom: calc(98px + 1.5em);
		}

		#headerWrapper.sticky #search {
		    display: none !important;
		}

		#headerAccount ul
		{
			right: 0;
		}

		.mobile-child-menu {
		    font-size: 12px;
		}
	}
</style>
