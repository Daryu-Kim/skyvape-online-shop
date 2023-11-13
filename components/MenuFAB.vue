<script setup lang="ts">
import IconMenuBtn from "~/components/icons/IconMenuBtn.vue";
import {onMounted, ref} from "vue";
import IconCloseBtn from "~/components/icons/IconCloseBtn.vue";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";
import {DocumentData} from "firebase/firestore";

const isOpened = ref(false);

const listOfCategoryItems = ref([]);
onMounted(async () => {
  const data = await readDocumentsDataOnce('SETTING/MENU_ITEM/MAIN') as DocumentData[];
  const dataArr: never[] = [];
  data.forEach((item) => {
    dataArr.push(item as never);
  });
  listOfCategoryItems.value = dataArr.sort((a, b) => {
    if (a.mainMenuItemNumber > b.mainMenuItemNumber) return 1;
    if (a.mainMenuItemNumber < b.mainMenuItemNumber) return -1;
    return 0;
  });
  console.log(listOfCategoryItems.value);
});
</script>

<template>
  <transition name="fade">
  <div>
    <div v-if="isOpened" class="overlay"></div>
    <div class="fab-div">
      <div v-if="isOpened" class="open-menu">
        <div v-for="(menuItem, menuIndex) in listOfCategoryItems" :key="menuIndex">
          <p style="color: white">
            {{menuItem.mainMenuItemName}}
          </p>
          <button :style="{backgroundImage: `url(${menuItem.mainMenuItemImage})`}" @click="$nuxt.$router.push(menuItem.mainMenuItemRoute)"></button>
        </div>
      </div>
      <button v-if="!isOpened" @click="isOpened = !isOpened"><IconMenuBtn /></button>
      <button v-else @click="isOpened = !isOpened"><IconCloseBtn /></button>
    </div>
  </div>
  </transition>

</template>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0,0,0,0.75);
  top: 0;
  left: 0;
}

.fab-div {
  position: fixed;
  bottom: 2.4rem;
  right: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  z-index: 1000;

  .open-menu {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1.6rem;

      > button {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
      }

      > p {
        color: white;
        font-weight: 700;
        font-size: 1.2rem;
      }
    }
  }

  > button {
    width: 3.6rem;
    height: 3.6rem;
    margin-top: 0.8rem;
    background-color: var(--color-accent);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      width: 2rem;
      height: 2rem;
    }
  }
}

</style>
