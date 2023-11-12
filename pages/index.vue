<script setup lang="ts">
import BaseHeader from "~/components/BasePCHeader.vue";
import TopBanner from "~/components/TopBanner.vue";
import BaseFooter from "~/components/BaseFooter.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import {onBeforeMount, ref} from "vue";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";
import {DocumentData} from "firebase/firestore";

const listOfCategoryItems =ref([]);
onBeforeMount(async() => {
  const data = await readDocumentsDataOnce("SETTING/MENU_ITEM/MAIN") as DocumentData[];
  data.forEach((item) => {
    listOfCategoryItems.value.push(item as never);
  });
  console.log(listOfCategoryItems.value);
})

const swiperOptions = ref({
  pagination: {
    el: '.swiper-pagination',
    type: 'bullet'
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 'auto',
  spaceBetween: '16'
});
</script>

<template>
  <div class="wrapper">
        <TopBanner />
        <BaseHeader />
    <MainBanner />
    <main>
      <Swiper class="swiper-container" :options="swiperOptions">
        <SwiperSlide class="swiper-slide" v-for="(menuItem, menuIndex) in listOfCategoryItems" :key="menuIndex">
          <nuxt-link :to="menuItem.mainMenuItemRoute" class="menu-item" :style="{backgroundImage: `url(${menuItem.mainMenuItemImage})`}">
          </nuxt-link>
          <p>{{menuItem.mainMenuItemName}}</p>
        </SwiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-next" slot="navigation"></div>
        <div class="swiper-button-prev" slot="navigation"></div>
      </Swiper>
    </main>
        <BaseFooter />
  </div>
</template>

<style lang="scss">
main {
  flex: 1;

  > .swiper-container {
    max-width: 720px;

    .swiper-slide {
      width: auto;
      height: auto;

      > p {
        color: var(--color-text);
        font-size: 1.2rem;
        font-weight: 700;
        text-align: center;
        margin-top: 0.8rem;
      }

      .menu-item {
        display: block;
        width: 6.4rem !important;
        height: 6.4rem !important;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 50%;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  main > .swiper-container {
    width: 100%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  main > .swiper-container {
    max-width: 56rem;
  }
}

@media screen and (min-width: 1024px) {
  main > .swiper-container {
    max-width: 72rem;
  }
}
</style>

