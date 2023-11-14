<script setup lang="ts">
import {onMounted, ref} from "vue";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";

const categoryData = ref();

onMounted(async() => {
  categoryData.value = await readDocumentsDataOnce("/SETTING/MAIN_MENU/MENU_ITEM");
})


const addedProductDetails = ref([]),
  addedProductQnaList = ref([]),
  addedProductRequireOptions = ref([]),
  addedProductReviewList = ref([]),
  addedProductTag = ref([]),
  addedProductThumbnails = ref([]),
  addedProductAdditionalOptions = ref([]);
const adminInputProductCategory = ref(''),
  adminInputProductDescription = ref(''),
  adminInputProductDetail = ref(''),
  adminInputProductId = ref(''),
  adminInputProductName = ref(''),
  adminInputProductOriginPrice = ref(0),
  adminInputProductQnaList = ref(''),
  adminInputIsProductRequireOptions = ref(false),
  adminInputProductRequireOptionCount = ref(0),
  adminInputProductRequireOptionColor = ref(''),
  adminInputProductRequireOptionName = ref(''),
  adminInputProductRequireOptionPrice = ref(0),
  adminInputProductReviewList = ref(''),
  adminInputProductSellPrice = ref(0),
  adminInputProductTag = ref(''),
  adminInputProductThumbnail = ref(''),
  adminInputProductUploadAt = ref(''),
  adminInputProductViewCount = ref(0),
  adminInputIsProductAdditionalOptions = ref(false),
  adminInputProductAdditionalOptionCount = ref(''),
  adminInputProductAdditionalOptionColor = ref(''),
  adminInputProductAdditionalOptionPrice = ref(0);
</script>

<template>
  <div class="wrapper">
    <main>
      <article class="skyvape-category">
        <section>
          <div v-for="(item, index) in categoryData">
            <input type="radio" name="category" :id="item.menuNumber">
            <label :for="item.menuNumber">{{item.menuName}}</label>
          </div>

        </section>
      </article>
      <input >
    </main>
  </div>
</template>

<style scoped lang="scss">
main {
  > .skyvape-category {
    margin-top: 0;
    > section {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      > div {
        display: flex;
      }
    }
  }
}
</style>
