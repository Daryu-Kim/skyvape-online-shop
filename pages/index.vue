<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {readDocumentsDataOnce} from '~/scripts/FirebaseFirestore';
import {DocumentData} from 'firebase/firestore';
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";

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

  function testPayment() {
    IMP.init("imp14397622");
    IMP.request_pay({
      pg: "tosspayments",
      pay_method: "card",
      merchant_uid: "test_lovwy5sq",
      name: "테스트 결제",
      amount: 1,
      popup: true,
      buyer_tel: "010-0000-0000",
    }, function (r: any) {
      console.log(r);
    });
  }
</script>

<template>
  <div class="wrapper">
    <TopBanner/>
    <BasePCHeader/>
    <MainBanner />
    <main>
      <article class="skyvape-index-category-article">
        <section>
          <h1 class="title-text">
            👀 메뉴 한 눈에 보기
          </h1>
          <p>SKYVAPE만의 메뉴를 드래그하여 바로 둘러보세요!</p>
          <div class="content-div">
            <Swiper class="swiper-container" :options="swiperOptions">
              <SwiperSlide class="swiper-slide" v-for="(menuItem, menuIndex) in listOfCategoryItems" :key="menuIndex">
                <nuxt-link :to="menuItem.mainMenuItemRoute" class="menu-item" :style="{backgroundImage: `url(${menuItem.mainMenuItemImage})`}"></nuxt-link>
                <p>{{menuItem.mainMenuItemName}}</p>
              </SwiperSlide>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </Swiper>
          </div>
        </section>
      </article>
<!--      <button @click="testPayment">결제 테스트</button>-->
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            📈 인기 키워드
          </h1>
          <p>최근 많이 검색된 키워드를 살펴보세요!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{item}}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            👍 BEST 5 상품
          </h1>
          <p>제일 잘 나가는 5가지의 상품을 보여드립니다!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{item}}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-index-popular-tag-article">
        <section>
          <h1 class="title-text">
            🔥 빨리 확인해야 하는 핫딜
          </h1>
          <p>인기 상품을 최대 -50%의 가격으로 구매해보세요!</p>
          <div class="content-div">
            <div v-for="item in ['다류', '도화', '김포루', 'Karo_Kim', '카누랜드', 'Kanablere']" class="content-item-div">
              <p>#</p>
              <p>{{item}}</p>
            </div>
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
              <p>{{item}}</p>
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
              <p>{{item}}</p>
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
              <p>{{item}}</p>
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
              <p>{{item}}</p>
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
              <p>{{item}}</p>
            </div>
          </div>
        </section>
      </article>
    </main>
    <BaseFooter/>
    <MenuFAB />
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
            > p {
              font-size: 1.4rem;
              font-weight: 700;
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
