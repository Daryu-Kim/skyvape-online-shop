<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "@nuxtjs/composition-api";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import {DocumentData} from "firebase/firestore";
import {addToCartORPurchaseAPI, readDocumentDataOnce} from "~/scripts/FirebaseFirestore";
import {showErrorToast} from "~/scripts/Toast";
import UserLoginModal from "~/components/modals/UserLoginModal.vue";
import {auth} from "~/scripts/FirebaseAuth";

const route = useRoute();
const id = ref(route.value.params.id);
const listOfItemData = ref({}),
      listOfSelectedItemData = ref([{}]);

const isShowLoginModal = ref(false);

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

onMounted(async() => {
  // 데이터 처리
  listOfItemData.value = await readDocumentDataOnce("SETTING/PRODUCTS/PRODUCT_TEST_LIST", id.value) as DocumentData;
  console.log(listOfItemData.value.productThumbnails);
});

async function onClickPurchase(type: boolean) {
  if (auth.currentUser?.uid) {
    console.log(listOfSelectedItemData.value)
    if (listOfSelectedItemData.value.length > 1) {
      const isGoToPurchase: boolean = await addToCartORPurchaseAPI(listOfSelectedItemData.value, type);
      if (isGoToPurchase) {
        $nuxt.$router.push("/payment");
      }
    } else {
      showErrorToast("필수 항목을 선택해주세요!");
    }
  } else {
    isShowLoginModal.value = !isShowLoginModal.value;
  }
}

function onChangeOption(index: number) {
  let isExist = false;
  listOfSelectedItemData.value.forEach((item) => {
    if (JSON.stringify(item) === JSON.stringify(listOfItemData.value.productRequireOptions[index])) {
      showErrorToast("이미 선택한 옵션입니다!");
      isExist = true;
    }
  });

  if (!isExist) {
    listOfSelectedItemData.value.push(listOfItemData.value.productRequireOptions[index]);
  }

  console.log(`데이터: ${listOfSelectedItemData.value}`);
}
</script>

<template>
  <div class="wrapper">
    <TopBanner />
    <BasePCHeader />
    <Swiper class="mobile" :options="swiperOptions">
      <SwiperSlide class="swiper-slide" v-for="(slide, index) in listOfItemData.productThumbnails" :key="index"
                   :style="{backgroundImage: `url(${slide})`}">
      </SwiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
    <main>
      <article class="skyvape-product-summary-article">
        <section>
          <div>
            <h1>{{listOfItemData.productName}}</h1>
            <h2>{{listOfItemData.productDescription}}</h2>
            <p>{{listOfItemData.productSellPrice}}원</p>
          </div>
          <div>
            <p>[필수] 옵션 선택</p>
            <select @change="(e) => onChangeOption(e.selected)">
              <option>─ [필수] 옵션을 선택해주세요 ─</option>
              <optgroup label="───────────">
                <option v-for="(item, itemIndex) in listOfItemData.productRequireOptions" :value="itemIndex">
                  {{item.productOptionName}} (+{{item.productOptionPrice}}원) [재고: {{item.productCount}}개]
                </option>
              </optgroup>
            </select>
          </div>
          <div>
            <p>총 상품금액</p>
            <div>
              <p>0원</p>
              <p>(0개)</p>
            </div>
          </div>
          <div>
            <button @click="onClickPurchase(false)">장바구니</button>
            <button @click="onClickPurchase(true)">구매하기</button>
          </div>
        </section>
      </article>
    </main>
    <BaseFooter />
    <UserLoginModal :isShowModal="isShowLoginModal" @close="isShowLoginModal = false" />
  </div>
</template>

<style scoped lang="scss">

.swiper-container {
  margin-top: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.swiper-slide {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
main {
  > article:nth-child(1) {
    margin-top: 0;
  }
}

@media screen and (max-width: 767px) {
  .mobile {
    display: unset;
  }
  .pc {
    display: none;
  }
  main {
      padding-top: 2.4rem !important;
  }
}

@media screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
  .pc {
    display: unset;
  }
}
</style>
