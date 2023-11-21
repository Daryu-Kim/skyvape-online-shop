<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {DocumentData} from "firebase/firestore";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
import "swiper/css/swiper.css";

const listOfBannerItems = ref([]);
const swiperOptions = ref({
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  }
});

onBeforeMount(async () => {
  const arrData: DocumentData[] = [];
  const data = await readDocumentsDataOnce("SETTING/GENERAL_SETTING/MAIN_BANNER") as DocumentData[];
  data.forEach((item) => {
    listOfBannerItems.value.push(item as never);
  });
  console.log(listOfBannerItems.value);
})

function onClickMainBanner() {
  console.log("asdf: ")
  // $nuxt.$router.push(route);
}
</script>

<template>
  <Swiper :options="swiperOptions">
    <SwiperSlide class="swiper-slide" v-for="(slide, index) in listOfBannerItems" :key="index"
                 :style="{backgroundImage: `url(${slide.bannerImage})`}" @click="onClickMainBanner">
    </SwiperSlide>
    <div class="swiper-pagination" slot="pagination"></div>
  </Swiper>
</template>

<style scoped lang="scss">
.swiper-container {
  width: 100%;
}

.swiper-slide {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;

}

@media screen and (max-width: 767px) {
  .swiper-container {
    aspect-ratio: 1920 / 640;
  }
}

@media screen and (min-width: 768px) {
  .swiper-container {
    aspect-ratio: 1920 / 480;
  }
}
</style>
