<script setup lang="ts">
import IconMenuBtn from "~/components/icons/IconMenuBtn.vue";
import IconSearchBtn from "~/components/icons/IconSearchBtn.vue";
import IconCartBtn from "~/components/icons/IconCartBtn.vue";
</script>

<template>
  <header>
    <article class="inner">
      <button class="skyvape-menu-btn">
        <IconMenuBtn />
      </button>
      <nuxt-link class="skyvape-logo" to="/">SKYVAPE</nuxt-link>
      <div class="skyvape-func-menu">
        <button>
          <IconSearchBtn />
        </button>
        <button @click="$nuxt.$router.push('/login')">
          <IconCartBtn />
        </button>
      </div>
    </article>
  </header>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  z-index: 100;
  top: 0;
  background-color: #001D3D;;
  height: 6.4rem;

    > .inner > .skyvape-menu-btn {
      position: absolute;
      top: 50%;
      left: 2.4rem;
      transform: translateY(-50%);
    }
    > .inner > .skyvape-logo {
      font-size: 3.2rem;
      font-weight: 900;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    > .inner > .skyvape-func-menu {
      position: absolute;
      top: 50%;
      right: 2.4rem;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
}

@media screen and (min-width: 1024px) {
  .skyvape-menu-btn {
    left: 6.4rem !important;
  }
}

</style>
