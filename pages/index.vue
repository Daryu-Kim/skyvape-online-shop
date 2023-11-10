<script setup lang="ts">
import BaseHeader from "~/components/BaseHeader.vue";
import TopBanner from "~/components/TopBanner.vue";
import BaseFooter from "~/components/BaseFooter.vue";

const swiper_urls = [
  {
    url: "https://picsum.photos/1000",
    route: "/123"
  },
  {
    url: "https://picsum.photos/1001",
    route: "/1234"
  },
  {
    url: "https://picsum.photos/1002",
    route: "/12345"
  },
];

function bannerClick(link: string) {
}
</script>

<template>
  <div class="wrapper">
        <TopBanner />
        <BaseHeader />
    <main>
      d
    </main>
        <BaseFooter />
  </div>
</template>

<style lang="scss">
main {
  flex: 1;
  padding: 0;
}
.skyvape-main-banner {
  aspect-ratio: 3 / 1.25;

  .skyvape-main-banner-slide {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>

