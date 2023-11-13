<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {readDocumentDataOnce, readDocumentsDataOnce} from '~/scripts/FirebaseFirestore';
import {DocumentData} from 'firebase/firestore';
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import {auth} from "~/scripts/FirebaseAuth";
import {showErrorToast} from "~/scripts/Toast";

const listOfCartItems = ref([]);
const userData = ref({});
const userInputName = ref(''),
      userInputPostalCode = ref(''),
      userInputAddress1 = ref(''),
      userInputAddress2 = ref(''),
      userInputPhoneNumber = ref(''),
      userInputEmailAddress = ref(''),
      userInputMessage = ref(''),
      userInputDiscountCash = ref(''),
      userInputDiscountCoupon = ref(''),
      userInputDiscountCode = ref(''),
      userInputPaymentType = ref(0);
// const cartItemsData = re;
onMounted(async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      userData.value = await readDocumentDataOnce("USER", auth.currentUser?.uid as string) as DocumentData;
      if (userData.value) {
        userInputName.value = userData.value.userName;
        userInputPostalCode.value = userData.value.userPostalCode;
        userInputAddress1.value = userData.value.userAddress1;
        userInputAddress2.value = userData.value.userAddress2;
        userInputPhoneNumber.value = userData.value.userPhoneNumber;
        userInputEmailAddress.value = userData.value.userEmail;
      }
    }
  })
  // for (const item of userData.userCart) {
  //   const itemData = await readDocumentDataOnce("SETTING/PRODUCTS/PRODUCT_TEST_LIST", item.productId);
  //   listOfCartItems.value.push(itemData as never);
  // }
  // console.log("listOfCartItems: ", listOfCartItems.value);
  // console.log("listOfCartItems: ", listOfCartItems.value);
});

  function testPayment() {
    switch (userInputPaymentType.value) {
      case 0:
        $nuxt.$router.replace("/payment-success");
        break;
      case 1:
        requestPurchase("card");
        break;
      case 2:
        requestPurchase("vbank");
        break;
      case 3:
        requestPurchase("trans");
        break;
      default:
        showErrorToast("잘못된 요청입니다!");
        break;
    }
  }

  function requestPurchase(type: string) {
    IMP.init("imp14397622");
    IMP.request_pay({
      pg: "tosspayments",
      pay_method: type,
      merchant_uid: `${Date.now()}_${auth.currentUser?.uid}_${type}`,
      name: "TUMBLUCK",
      amount: 1,
      popup: true,
      buyer_name: userInputName.value,
      buyer_tel: userInputPhoneNumber.value,
      buyer_email: userInputEmailAddress.value,
      buyer_addr: `${userInputAddress1.value} ${userInputAddress2.value}`,
      buyer_postcode: userInputPostalCode.value,
    }, function (r: any) {
      console.log(r);
      if (r.error_code) {
        showErrorToast("결제 진행 중 오류가 발생하였습니다!");
        return;
      } else {
        $nuxt.$router.push("/payment-success");
      }
    });
  }

function onClickSearchAddress() {
  new window.daum.Postcode({
    oncomplete: (data: any) => {
      userInputPostalCode.value = data.zonecode;
      userInputAddress1.value = data.address;
      if (data.buildingName === '') {
        userInputAddress2.value = '';
      } else {
        userInputAddress2.value = (data.bname !== '' ? data.bname + ', ' : '') + (data.buildingName !== '' ? data.buildingName : '');
      }
    },
  }).open();
}
</script>

<template>
  <div class="wrapper">
    <TopBanner/>
    <BasePCHeader/>
    <main>
      <article class="skyvape-payment-address-article">
        <section>
          <h1 class="title-text">
            배송지
          </h1>

          <div class="form-div">
            <h2 class="form-title">수취인명</h2>
            <div class="form-input-div">
              <input type="text" v-model="userInputName" placeholder="이름">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">주소</h2>
            <div class="form-input-div">
              <div>
                <input type="number" v-model="userInputPostalCode" maxlength="5" placeholder="우편번호" disabled>
                <button @click="onClickSearchAddress">검색</button>
              </div>
              <input type="text" v-model="userInputAddress1" placeholder="기본 주소" disabled>
              <input type="text" v-model="userInputAddress2" placeholder="나머지 주소">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">휴대전화</h2>
            <div class="form-input-div">
              <input type="tel" v-model="userInputPhoneNumber" placeholder="휴대전화">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">이메일</h2>
            <div class="form-input-div">
              <input type="email" v-model="userInputEmailAddress" placeholder="이메일 주소">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">배송 메시지</h2>
            <div class="form-input-div">
              <input type="text" v-model="userInputMessage" placeholder="배송 메시지 (최대 50자)" maxlength="50">
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-delivery-article">
        <section>
          <h1 class="title-text">
            배송방법
          </h1>
          <div class="form-div">
            <input type="radio" name="delivery-type" id="type1" checked>
            <label for="type1">택배</label>
            <input type="radio" name="delivery-type" id="type2">
            <label for="type2">방문수령</label>
            <input type="radio" name="delivery-type" id="type3">
            <label for="type3">퀵</label>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-cart-article">
        <section>
          <h1 class="title-text">
            주문상품
          </h1>
          <div class="form-div">
            <div v-for="item in 3">
              {{item}}
            </div>
            <div class="delivery-price">
              2,500원
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-discount-article">
        <section>
          <h1 class="title-text">
            적립금 / 쿠폰 / 할인코드 사용
          </h1>

          <div class="form-div">
            <h2 class="form-title">적립금</h2>
            <div class="form-input-div">
              <input type="number" v-model="userInputDiscountCash" placeholder="적립금">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">쿠폰</h2>
            <div class="form-input-div">
              <input type="email" v-model="userInputDiscountCoupon" placeholder="쿠폰">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">할인코드</h2>
            <div class="form-input-div">
              <input type="email" v-model="userInputDiscountCode" placeholder="할인코드">
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">적용금액</h2>
            <div class="form-input-div">
              <p>-0원</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-info-article">
        <section>
          <h1 class="title-text">
            결제정보
          </h1>

          <div class="form-div">
            <h2 class="form-title">주문상품</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">배송비</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">적립금 / 쿠폰 / 할인코드 사용</h2>
            <div class="form-input-div">
              <p>-0원</p>
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">최종 결제 금액</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-type-article">
        <section>
          <h1 class="title-text">
            결제수단 선택
          </h1>

          <div class="form-div">
            <h2 class="form-title">결제수단 선택</h2>
            <div class="form-input-div" v-for="(item, index) in ['무통장입금', '신용카드 [테스트 API 적용]', '가상계좌 [테스트 API 적용]', '실시간 계좌이체 [테스트 API 적용]']">
              <input type="radio" :id="`payment-${index}`" name="purchase-type" @change="userInputPaymentType = index" :checked="index === 0">
              <label :for="`payment-${index}`">{{item}}</label>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-point-article">
        <section>
          <h1 class="title-text">
            적립 혜택
          </h1>

          <div class="form-div">
            <h2 class="form-title">상품별 적립금</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">회원 적립금</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">쿠폰 적립금</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>

          <div class="form-div">
            <h2 class="form-title">적립 예정금액</h2>
            <div class="form-input-div">
              <p>0원</p>
            </div>
          </div>
        </section>
      </article>
      <article class="skyvape-payment-confirm-article">
        <section>
          <h1 class="title-text">주문 내용을 확인하였으며 약관에 동의합니다.</h1>
          <button @click="testPayment">0원 결제하기</button>
        </section>
      </article>
<!--      <div v-for="(item, index) in listOfCartItems" :key="index">-->
<!--        <p>item.productName</p>-->
<!--      </div>-->
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
            background-color: var(--color-background-mute);
            border-radius: 0.8rem;
            padding: 0.8rem;

            .menu-item {
              display: block;
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
              }

              > .product-info {

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
