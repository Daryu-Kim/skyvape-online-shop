<script setup lang="ts">
import IconSearchBtn from "~/components/icons/IconSearchBtn.vue";
import IconCartBtn from "~/components/icons/IconCartBtn.vue";
import UserLoginModal from "~/components/modals/UserLoginModal.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {readDocumentDataOnce} from "~/scripts/FirebaseFirestore";
import {auth} from "~/scripts/FirebaseAuth";
import SearchModal from "~/components/modals/SearchModal.vue";

const isShowLoginModal = ref(false);
const isShowSearchModal = ref(false);
const logoName = ref('');

onBeforeMount(async () => {
  const generalSettingData = await readDocumentDataOnce("SETTING", "GENERAL_SETTING");
  logoName.value = generalSettingData.siteName;
})

function onClickCartButton() {
  if (auth.currentUser?.uid) {
    $nuxt.$router.push("/cart");
  } else {
    isShowLoginModal.value = !isShowLoginModal.value;
  }
}
</script>

<template>
  <header>
    <article class="inner">
      <nuxt-link class="skyvape-logo" to="/">{{logoName}}</nuxt-link>
      <div class="skyvape-func-menu">
        <button @click="isShowSearchModal = !isShowSearchModal">
          <IconSearchBtn />
        </button>
        <button @click="onClickCartButton">
          <IconCartBtn />
        </button>
      </div>
    </article>
    <UserLoginModal :isShowModal="isShowLoginModal" @close="isShowLoginModal = false" />
    <SearchModal :isShowModal="isShowSearchModal" @close="isShowSearchModal = false" />
  </header>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  z-index: 100;
  top: 0;
  background-color: #001D3D;;
  height: 6.4rem;

    > .inner > .skyvape-logo {
      position: absolute;
      font-size: 3.2rem;
      font-weight: 900;
      color: white;
      top: 50%;
      left: 3.6rem;
      transform: translateY(-50%);
    }
    > .inner > .skyvape-menu {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    > .inner > .skyvape-func-menu {
      position: absolute;
      top: 50%;
      right: 3.6rem;
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
