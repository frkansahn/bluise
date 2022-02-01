<template>
	<div class="slider" id="slider" v-if="$store.state.config">
		<div class="row">
			<div class="col-12 px-0">
				<swiper ref="mySwiper" :options="swiperOptions">
					<swiper-slide v-for="(slide,index) in JSON.parse($store.state.config.home_page_slider)" v-bind:key="`Slider${index}`">
						<NuxtLink :to="slide.url" :id="`slider${index}`" v-html="decodeURIComponent(slide.image)" :title="slide.title">
						</NuxtLink>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
					<div class="swiper-button-prev" slot="button-prev"></div>
    				<div class="swiper-button-next" slot="button-next"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'Slider',
    title: 'Swiper Slider',
    data() {
      return {
        swiperOptions: {
        	loop:false,
        	autoplay: {
	            delay: 2500,
	        	disableOnInteraction: false
	        },
          	pagination: {
            	el: '.swiper-pagination',
            	type: 'fraction',
            	clickable: true
          	},
          	navigation: {
            	nextEl: '.swiper-button-next',
            	prevEl: '.swiper-button-prev'
          	},
          	breakpoints: {
          		1024: {
          			slidesPerView: 1,
          			spaceBetween: 0
          		},
          		768: {
          			slidesPerView: 1,
          			spaceBetween: 0
          		},
          		640: {
          			slidesPerView: 1,
          			spaceBetween: 0
          		},
          		320: {
          			slidesPerView: 1,
          			spaceBetween: 0
          		}
          	}
        }
      }
    }
  }
</script>
<style>
	#slider p {
    margin: 0 !important;
	}
</style>