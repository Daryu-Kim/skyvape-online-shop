<script setup lang="ts">
async function adultRequest() {
}

function paymentRequest() {
}
</script>

<template>
  <main>
    <button @click="adultRequest">본인인증</button>
    <button @click="paymentRequest">결제테스트</button>
  </main>
</template>

<style scoped lang="scss">
.skyvape-main-banner {
  aspect-ratio: 3 / 1.25;

  > .skyvape-main-banner-slide {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
