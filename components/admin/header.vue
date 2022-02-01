<template>
	<div class="admin-header" id="adminHader">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 p-3 shadow" id="adminHeader">					
					<span class="float-right text-danger" @click="logout">
						<b-icon-box-arrow-in-left variant="danger" font-scale="1"></b-icon-box-arrow-in-left>
						Çıkış
					</span>
				</div>
			</div>
			<div class="row">
				<div class="col-12" id="content">
					<b-sidebar id="sidebarAdmin" bg-variant="white" title="Sidebar" shadow no-header visible>
						<div class="col-12">
							<div class="row">
								<ul class="col-12 px-4 list-unstyled">
									<li class="float-left w-100 mb-5">
										<div class="py-2 px-3">
											<NuxtLink to="/admin" class="text-secondary" title="Admin Index">
												<img src="/logo.jpg" alt="Eskon Logo">
											</NuxtLink>
										</div>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/news" class="text-secondary" title="Haber Düzenleme Sayfası">
											Haberler
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/news-category" class="text-secondary" title="Haber Kategori Sayfası">
											Haber Kategori
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/projects" class="text-secondary" title="Proje Düzenleme Sayfası">
											Projeler
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/projects-category" class="text-secondary" title="Proje Kategori Sayfası">
											Proje Kategori
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/contents" class="text-secondary" title="İçerik Düzenleme Sayfası">
											İçerikler
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/contents-category" class="text-secondary" title="İçerik Kategori Sayfası">
											İçerik Kategori
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/application" class="text-secondary" title="Başvuru Görüntüleme Sayfası">
											Başvurular
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/users" class="text-secondary" title="Başvuru Görüntüleme Sayfası">
											Kullanıcı İşlemleri
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/customers" class="text-secondary" title="Başvuru Görüntüleme Sayfası">
											Kayıtlı Müşteriler
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/slider-page" class="text-secondary" title="İnteraktif Vitrin Sayfası">
											İnteraktif Vitrin
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-2">
										<NuxtLink to="/admin/settings" class="text-secondary" title="Site Ayarlar Sayfası">
											Ayarlar
										</NuxtLink>
									</li>
								</ul>
							</div>
						</div>						
					</b-sidebar>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import tokenControl from '@/mixins/tokenControl'
	export default{
		name:'AdminHeader',
		mixins:[tokenControl],
	    components:{
	    },
	    data() {
	        return {
	        }
	    },
	    props:{
	         
	    },
	    methods:{
	    	async logout(){
	    		var _this = this;
	    		var token = await cookieStore.delete("token");
	    		var cusId = await cookieStore.delete("_userId");
	    		_this.$router.push("/admin/login");
	    	}
	    },
	    async created(){	
	    	var _this = this;
	        _this.tokenControl().then(response => {
	            if(!response)
	            {
	               _this.$router.push("/admin/login");
	            }
	        }); 		
		},
		mounted(){
		},
		computed: {
		}
	}
</script>

<style>
	.b-sidebar {
	    width: 260px;
	}
	
	#adminHeader span
	{
		cursor: pointer;
	}
</style>
