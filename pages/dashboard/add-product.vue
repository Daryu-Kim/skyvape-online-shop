<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {readDocumentsDataOnce, uploadProductDataAPI} from "~/scripts/FirebaseFirestore";
import {showInfoToast, showSuccessToast} from "~/scripts/Toast";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

const categoryData = ref();

onMounted(async() => {
  categoryData.value = await readDocumentsDataOnce("/SETTING/MAIN_MENU/MENU_TEST_ITEM");
})


const addedProductDetails = ref([]),
  addedProductQnaList = ref([]),
  addedProductRequireOptions = ref([]),
  addedProductReviewList = ref([]),
  addedProductTag = ref([] as string[]),
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

function addItemForList(list: never, item: never) {
  if (item.length === 0) {
    return;
  }
  if (list.includes(item)) {
    return;
  }
  list.push(item);
}

function setRequireOptionData() {
  addItemForList(addedProductRequireOptions.value, {
    productCount: adminInputProductRequireOptionCount.value,
    productOptionColor: adminInputProductRequireOptionColor.value,
    productOptionName: adminInputProductRequireOptionName.value,
    productOptionPrice: adminInputProductRequireOptionPrice.value,
  });
  adminInputProductRequireOptionName.value = '';
  adminInputProductRequireOptionCount.value = 0;
  adminInputProductRequireOptionColor.value = '';
  adminInputProductRequireOptionPrice.value = 0;
}

async function uploadProduct() {
  showInfoToast("상품을 업로드 중입니다!");
  const result = await uploadProductDataAPI(
    {
      productId: adminInputProductId.value,
      productName: adminInputProductName.value,
      productDescription: adminInputProductDescription.value,
      productCategory: adminInputProductCategory.value,
      productDetail: addedProductDetails.value,
      productOriginPrice: adminInputProductOriginPrice.value as number,
      productQnaList: [],
      productRequireOptions: addedProductRequireOptions.value,
      productReviewList: [],
      productSellPrice: adminInputProductSellPrice.value as number,
      productTag: addedProductTag.value,
      productThumbnails: addedProductThumbnails.value,
      productUploadAt: Timestamp.now(),
      productViewCount: 0
    }
  );
  if (result) {
    showSuccessToast("상품을 업로드 했습니다!");
    $nuxt.$router.go(0);
    return;
  }
}
</script>

<template>
  <div class="wrapper">
    <BaseDashboardHeader />
    <main>
      <article class="skyvape-category">
        <section>
          <div v-for="(item, index) in categoryData" :key="index">
            <input type="radio" name="category" :id="item.menuNumber" @change="adminInputProductCategory = item.menuId">
            <label :for="item.menuNumber">{{item.menuName}}</label>
          </div>
        </section>
        <section class="input">
          <div>
            상품명 <input v-model="adminInputProductName">
          </div>
          <div>
            상품설명 <input v-model="adminInputProductDescription">
          </div>
          <div>
            상품원가 <input v-model="adminInputProductOriginPrice" type="number">
          </div>
          <div>
            상품판매가 <input v-model="adminInputProductSellPrice" type="number">
          </div>
          <div>
            상품태그 <input v-model="adminInputProductTag" @keyup.enter="addItemForList(addedProductTag, adminInputProductTag)">
            <p>{{addedProductTag}}</p>
          </div>
          <div>
            상품썸네일 <input v-model="adminInputProductThumbnail" @keyup.enter="addItemForList(addedProductThumbnails, adminInputProductThumbnail)">
            <p>{{addedProductThumbnails}}</p>
          </div>
          <div>
            상품상세페이지 <input v-model="adminInputProductDetail" @keyup.enter="addItemForList(addedProductDetails, adminInputProductDetail)">
            <p>{{addedProductDetails}}</p>
          </div>
          <div>
            상품ID <input v-model="adminInputProductId">
          </div>
          <section>
            <div>
              필수옵션명 <input v-model="adminInputProductRequireOptionName">
            </div>
            <div>
              필수옵션색상 <input v-model="adminInputProductRequireOptionColor">
            </div>
            <div>
              필수옵션수량 <input v-model="adminInputProductRequireOptionCount" type="number">
            </div>
            <div>
              필수옵션가격 <input v-model="adminInputProductRequireOptionPrice" @keyup.enter="setRequireOptionData" type="number">
            </div>
            <p>{{addedProductRequireOptions}}</p>
          </section>
        </section>
        <section>
          <button style="color: white" @click="uploadProduct">업로드하기</button>
        </section>
      </article>
    </main>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: unset;
}
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

      &.input {
        display: block;
        > * {
          display: block;
        }
      }
    }
  }
}
</style>
