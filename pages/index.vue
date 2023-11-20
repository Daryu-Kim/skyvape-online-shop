<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {readDocumentsDataOnce} from '~/scripts/FirebaseFirestore';
import {DocumentData} from 'firebase/firestore';
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import NoticeBannerModal from "~/components/modals/NoticeBannerModal.vue";
import UserLoginModal from "~/components/modals/UserLoginModal.vue";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

const isShowNoticeModal = ref(false);
const listOfCategoryItems = ref([]),
  listOfKeywordItems = ref([]),
  listOfBestItems = ref([]),
  listOfHotDealItems = ref([]);
onMounted(async () => {
  const mainMenuData = await readDocumentsDataOnce('SETTING/MAIN_MENU/MENU_TEST_ITEM') as DocumentData[],
    keywordsData = await readDocumentsDataOnce('SETTING/KEYWORDS/KEYWORD_TEST_LIST') as DocumentData[],
    bestItemsData = await readDocumentsDataOnce('SETTING/PRODUCTS/PRODUCT_TEST_LIST') as DocumentData[],
    hotDealItemsData = await readDocumentsDataOnce('SETTING/HOTDEAL_PRODUCTS/HOTDEAL_PRODUCT_TEST_LIST') as DocumentData[];
  const mainMenuDataArr: never[] = [],
    keywordsDataArr: never[] = [],
    bestItemsDataArr: never[] = [],
    hotDealItemsDataArr: never[] = [];
  mainMenuData.forEach((item) => {
    mainMenuDataArr.push(item as never);
  });
  keywordsData.forEach((item) => {
    keywordsDataArr.push(item as never);
  });
  bestItemsData.forEach((item) => {
    bestItemsDataArr.push(item as never);
  });
  hotDealItemsData.forEach((item) => {
    hotDealItemsDataArr.push(item as never);
  });
  listOfCategoryItems.value = mainMenuDataArr.sort((a, b) => {
    if (a.menuNumber > b.menuNumber) return 1;
    if (a.menuNumber < b.menuNumber) return -1;
    return 0;
  });
  listOfKeywordItems.value = keywordsDataArr.sort((a, b) => {
    if (a.keywordCount > b.keywordCount) return -1;
    if (a.keywordCount < b.keywordCount) return 1;
    return 0;
  });
  listOfBestItems.value = bestItemsDataArr.sort((a, b) => {
    if (a.productViewCount > b.productViewCount) return -1;
    if (a.productViewCount < b.productViewCount) return 1;
    return 0;
  });
  listOfHotDealItems.value = hotDealItemsDataArr.sort((a, b) => {
    if (a.productEndDeal > b.productEndDeal) return 1;
    if (a.productEndDeal < b.productEndDeal) return -1;
    return 0;
  });
  listOfKeywordItems.value = listOfKeywordItems.value.slice(0, 5);
  listOfBestItems.value = listOfBestItems.value.slice(0, 5);
  console.log(listOfCategoryItems.value);
});

onMounted(async() => {
  const resultNoticeModal = await getItemWithExpireTime("SHOW_NOTICE_MODAL");
  if (resultNoticeModal) {
    isShowNoticeModal.value = false;
    return;
  } else {
    isShowNoticeModal.value = true;
    return;
  }
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
  slidesPerView: 3,
  breakpoints: {
    375: {
      slidesPerView: 4
    },
    425: {
      slidesPerView: 5
    },
    640: {
      slidesPerView: 6
    },
    1024: {
      slidesPerView: 8
    }
  },
  spaceBetween: '16'
});

const hotDealSwiperOptions = ref({
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

function getItemWithExpireTime(keyName: string) {
  const objString = window.localStorage.getItem(keyName);
  if (!objString) {
    return false;
  }
  const obj = JSON.parse(objString);
  if (Date.now() > obj.expire) {
    window.localStorage.removeItem(keyName);
    return false;
  }
  return obj.value;
}

function getEndHotDealTime(date: Timestamp) {
  const currentDate = new Date();
  const endDate = date.toDate();
  const diffMSec = endDate.getTime() - currentDate.getTime();
  const diffDate = diffMSec / (24 * 60 * 60 * 1000);
  const diffHour = (diffMSec % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
  const diffMin = ((diffMSec % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000);
  const diffSec = (((diffMSec % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000;
  return {
    date: Math.floor(diffDate),
    hour: Math.floor(diffHour),
    min: Math.floor(diffMin),
    sec: Math.floor(diffSec)
  };
}
</script>

<template>
  <div class="wrapper">
    <TopBanner/>
    <BasePCHeader/>
    <MainBanner/>
    <main>
      <article class="skyvape-index-category-article">
        <section>
          <h1 class="title-text">
            👀 메뉴 한 눈에 보기
          </h1>
          <p>TUMBLUCK만의 메뉴를 드래그하여 바로 둘러보세요!</p>
          <div class="content-div">
            <Swiper class="swiper-container" :options="swiperOptions">
              <SwiperSlide class="swiper-slide" v-for="(menuItem, menuIndex) in listOfCategoryItems" :key="menuIndex">
                <nuxt-link :to="menuItem.menuRoute" class="menu-item"
                           :style="{backgroundImage: `url(${menuItem.menuImage})`}"></nuxt-link>
                <p>{{ menuItem.menuName }}</p>
              </SwiperSlide>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </Swiper>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            📈 인기 키워드
          </h1>
          <p>최근 많이 검색된 키워드를 살펴보세요!</p>
          <div class="content-div">
            <div v-for="(item, index) in listOfKeywordItems" class="content-item-div" :key="index"
                 @click="$nuxt.$router.push(`/search/${item.keywordName}`)">
              <p>#</p>
              <p>{{ item.keywordName }} ({{ item.keywordCount.toLocaleString() }})</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-best5-article">
        <section>
          <h1 class="title-text">
            👍 BEST 5 상품
          </h1>
          <p>제일 잘 나가는 5가지의 상품을 보여드립니다!</p>
          <div class="content-div">
            <details v-for="(bestItem, bestItemIndex) in listOfBestItems" class="content-item-div"
                     :open="bestItemIndex === 0">
              <summary class="title-div">
                <p class="title-index-text">{{ bestItemIndex + 1 }}</p>
                <p class="title-text">{{ bestItem.productName }}</p>
                <div class="arrow">▶</div>
              </summary>
              <div class="content-div">
                <div class="border-div"></div>
                <div class="item-div" @click="$nuxt.$router.push(`/product/${bestItem.productId}`)">
                  <div class="item-thumbnail" :style="{backgroundImage: `url(${bestItem.productThumbnails[0]})`}"></div>
                  <div class="item-info-div">
                    <p class="product-name-text">{{ bestItem.productName }}</p>
                    <p class="product-tag-text">{{ bestItem.productTag.map(item => "#" + item).join(" ") }}</p>
                    <p class="product-description-text">{{ bestItem.productDescription }}</p>
                    <p class="product-price-text">{{ bestItem.productSellPrice.toLocaleString() }}원</p>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>
      </article>
      <article class="skyvape-index-hotdeal-article">
        <section>
          <h1 class="title-text">
            🔥 빨리 확인해야 하는 핫딜
          </h1>
          <p>인기 상품을 최대 -50%의 가격으로 구매해보세요!</p>
          <div class="content-div">
            <Swiper class="swiper-container" :options="hotDealSwiperOptions">
              <SwiperSlide class="swiper-slide" v-for="(item, index) in listOfHotDealItems" :key="index">
                <nuxt-link :to="'/hotdeal-product/'+item.productId" class="menu-item">
                  <div class="product-thumbnail" :style="{backgroundImage: `url(${item.productThumbnails[0]})`}">
                    <div class="end-time-div">
                      <p>
                        {{getEndHotDealTime(item.productEndDeal).date}}일 {{getEndHotDealTime(item.productEndDeal).hour}}시간 {{getEndHotDealTime(item.productEndDeal).min}}분 {{getEndHotDealTime(item.productEndDeal).sec}}초 남음
                      </p>
                    </div>
                    <div class="view-count-div">👀 {{item.productViewCount}}</div>
                  </div>
                  <div class="product-info">
                    <p class="product-name">{{ item.productName }}</p>
                    <p class="product-price">{{item.productSellPrice.toLocaleString()}}원</p>
                    <div class="product-color-div">
                      <div class="product-color" v-for="(colorItem, colorIndex) in item.productRequireOptions" :key="colorIndex" :style="{backgroundColor: colorItem.productOptionColor}"></div>
                    </div>
                  </div>
                </nuxt-link>
              </SwiperSlide>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </Swiper>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            📌 직원들이 인정한 최애 PICK
          </h1>
          <p>전잘알 직원들도 없어서 못 쓴다는 최애 PICK 상품!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{ item }}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            🎁 안 하고는 못 배기는 이벤트
          </h1>
          <p>언제든 진행중인 이벤트에 참여해보세요!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{ item }}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            💬 소비자들의 검증된 리뷰
          </h1>
          <p>신뢰도 100%! 소비자들의 리뷰를 확인해보세요!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{ item }}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            📣 확인해보면 좋은 공지사항
          </h1>
          <p>중요 소식을 빠르게 받아보세요!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{ item }}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            📬 도움이 필요하다면 커뮤니티
          </h1>
          <p>도움이 필요하신가요? 여기를 확인해보세요!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{ item }}</p>
            </div>
          </div>
        </section>
      </article>
    </main>
    <BaseFooter/>
    <MenuFAB/>
    <NoticeBannerModal :isShowModal="isShowNoticeModal" @close="isShowNoticeModal = false" />
  </div>
</template>

<style lang="scss">
main {

  article {
    margin-top: 3.6rem;

    > section {
      > div {
        margin-top: 1.6rem;
      }

      > p {
        font-weight: 500;
        font-size: 1.2rem;
        color: var(--color-border);
      }

      > h1 {
        font-weight: 700;
        font-size: 2rem;
      }
    }

    &.skyvape-index-category-article {
      margin-top: 0;

      > section {
        > div > .swiper-container {

          .swiper-button-next, .swiper-button-prev {
            width: 3.6rem;
            height: 3.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-background-mute);
            border-radius: 50%;

            &::after {
              font-size: 1.2rem;
              font-weight: 900;
              color: var(--color-accent);
            }
          }

          .swiper-slide {
            width: auto;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .menu-item {
              display: block;
              width: 6.4rem !important;
              height: 6.4rem !important;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border-radius: 50%;
            }

            > p {
              color: var(--color-text);
              font-size: 1.2rem;
              font-weight: 700;
              text-align: center;
              margin-top: 0.8rem;
            }
          }
        }
      }
    }

    &.skyvape-index-popular-tag-article {
      > section {
        > div {
          display: flex;
          gap: 0.8rem;
          align-items: center;
          flex-wrap: wrap;

          > div {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            border-radius: 100rem;
            border: 0.2rem solid var(--color-accent);
            padding: 0.2rem 1.6rem;
            cursor: pointer;

            &:hover {
              background-color: var(--color-accent);

              > p {
                color: black;
              }
            }

            > p {
              font-size: 1.4rem;
              font-weight: 700;
            }
          }
        }
      }
    }

    &.skyvape-index-best5-article {
      > section {
        > div {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;

          > details {
            border-radius: 0.8rem;
            width: 100%;
            height: auto;
            padding: 1.2rem 2rem;
            border: 0.2rem solid var(--color-border-hover);

            > .title-div {
              display: flex;
              align-items: center;
              gap: 0.8rem;
              font-size: 1.4rem;
              cursor: pointer;

              > .title-index-text {
                font-weight: 700;
                color: var(--color-accent);
              }

              > .title-text {
                font-weight: 500;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 1;
              }
            }

            > .content-div {
              > .border-div {
                border: 0.1rem solid var(--color-border-hover);
                margin: 1.2rem 0;
              }

              > .item-div {
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 1.6rem;

                > .item-thumbnail {
                  aspect-ratio: 1 / 1;
                  width: 9.6rem;
                  border-radius: 0.8rem;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover;
                }

                > .item-info-div {
                  > p {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  }

                  > .product-name-text {
                    font-size: 1.4rem;
                    font-weight: 500;
                    -webkit-line-clamp: 1;
                  }

                  > .product-tag-text {
                    font-size: 1.2rem;
                    color: var(--color-border-hover);
                    -webkit-line-clamp: 1;
                  }

                  > .product-description-text {
                    font-size: 1.2rem;
                    color: var(--color-accent);
                    word-break: keep-all;
                    -webkit-line-clamp: 2;
                  }

                  > .product-price-text {
                    font-size: 1.6rem;
                    font-weight: 700;
                    -webkit-line-clamp: 1;
                  }
                }
              }
            }

            > summary {
              position: relative;
              list-style: none;
            }

            > summary::-webkit-details-marker {
              display: none;
            }

            > summary .arrow {
              position: absolute;
              right: 0;
              transition: transform 0.3s ease-in-out;
              font-size: 1rem;
            }

            &[open] > summary .arrow {
              transform: rotate(90deg);
            }
          }

        }
      }
    }

    &.skyvape-index-hotdeal-article {
      > section {
        > div > .swiper-container {
          width: 100%;

          .swiper-button-next, .swiper-button-prev {
            width: 3.6rem;
            height: 3.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-background-soft);
            border-radius: 50%;

            &::after {
              font-size: 1.2rem;
              font-weight: 900;
              color: var(--color-accent);
            }
          }

          .swiper-slide {
            width: auto;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--color-background-mute);
            border-radius: 0.8rem;
            padding: 0.8rem;

            .menu-item {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border-radius: 50%;

              > .product-thumbnail {
                aspect-ratio: 1 / 1;
                width: 16rem;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                border-radius: 0.8rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 0.8rem;

                > .end-time-div {
                  background-color: black;
                  border-radius: 100rem;
                  padding: 0 0.8rem;
                  color: var(--color-accent);
                  line-height: 2.4rem;
                  text-align: center;
                  font-weight: 700;
                  font-size: 1rem;
                }

                > .view-count-div {
                  background-color: rgba(0, 0, 0, 0.75);
                  border-radius: 100rem;
                  padding: 0 0.8rem;
                  color: white;
                  line-height: 2rem;
                  width: fit-content;
                  align-self: flex-end;
                  font-weight: 500;
                  font-size: 1rem;
                }
              }

              > .product-info {
                margin-top: 0.8rem;

                > .product-name {
                  font-size: 1.4rem;
                  color: var(--color-text);
                  font-weight: 500;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  -webkit-line-clamp: 1;
                }

                > .product-price {
                  font-size: 1.2rem;
                  color: var(--color-accent);
                  font-weight: 700;
                }

                > .product-color-div {
                  margin-top: 0.8rem;
                  display: flex;
                  flex-wrap: wrap;
                  gap: 0.2rem;

                  > .product-color {
                    width: 0.8rem;
                    height: 0.8rem;
                    border-radius: 50%;
                  }
                }
              }
            }

            > p {
              color: var(--color-text);
              font-size: 1.2rem;
              font-weight: 700;
              text-align: center;
              margin-top: 0.8rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  main {
    width: 100%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  main {
    max-width: 56rem;
  }
}

@media screen and (min-width: 1024px) {
  main {
    max-width: 72rem;
  }
}
</style>
