<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";
import {DocumentData} from "firebase/firestore";

const currentText = ref(''),
  currentRoute = ref('');


onBeforeMount(async () => {
  let index = 0;
  const data: DocumentData[] = await readDocumentsDataOnce("SETTING/GENERAL_SETTING/TOP_BANNER") as DocumentData[];
  currentText.value = data[index].bannerText;
  setInterval(() => {
    index = (index + 1) % data.length;
    currentText.value = data[index].bannerText;
    currentRoute.value = data[index].bannerRoute;
  }, 10000)
})
</script>

<template>
  <div class="top-banner">
    <nuxt-link :to="currentRoute">{{currentText}}</nuxt-link>
  </div>
</template>

<style scoped lang="scss">
div {
  background-color: #000;
  display: flex;
  height: 3.6rem;
  > a {
    color: white;
    font-size: 1.2rem;
    line-height: 3.6rem;
    width: 100%;
    text-align: center;
  }
}
</style>
