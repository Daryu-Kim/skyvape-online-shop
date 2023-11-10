<script setup lang="ts">
import TopBanner from "~/components/TopBanner.vue";
import BaseHeader from "~/components/BasePCHeader.vue";
import BaseFooter from "~/components/BaseFooter.vue";
import {onMounted, reactive, ref} from "vue";
import IconVisibleBtn from "~/components/icons/IconVisibleBtn.vue";
import {showErrorToast} from "~/scripts/Toast";

onMounted(function() {
  const acceptData = localStorage.getItem("JOIN_ACCEPT_EVENT_SMS");
  if (acceptData) return;
  else {
    showErrorToast("잘못된 접근입니다!");
    $nuxt.$router.replace("/join");
  }
})

const isShowTerms = ref(false),
  isShowPrivacy = ref(false),
  isShowEvent = ref(false);

const checkedAcceptItems = reactive({
  terms: false,
  privacy: false,
  event: false,
  sms: false
});

function checkAll(event: { target: { checked: boolean; }; }) {
  const isChecked = event.target.checked;
  checkedAcceptItems.terms = isChecked;
  checkedAcceptItems.privacy = isChecked;
  checkedAcceptItems.event = isChecked;
  checkedAcceptItems.sms = isChecked;
}

function confirmCheckTerms() {
  if (checkedAcceptItems.terms && checkedAcceptItems.privacy) {
    localStorage.setItem("JOIN_ACCEPT_EVENT_SMS", JSON.stringify({
      event: checkedAcceptItems.event,
      sms: checkedAcceptItems.sms
    }));
    $nuxt.$router.push("/join-form");
  } else {
    showErrorToast("필수 항목에 동의해주세요!");
    return;
  }
}

</script>

<template>
  <div class="wrapper">
    <TopBanner />
    <BaseHeader />
    <main>
      <article class="skyvape-join-msg-article">
        <section class="title-section">
          <h1>SKYVAPE 회원 가입을 위해<br/>회원님의 정보를 입력해주세요!</h1>
        </section>
      </article>
      <article class="skyvape-join-form-article">
        <section class="form-section">
          <div class="all-check-div">
            <input type=checkbox id="all-check" @change="checkAll">
            <label for="all-check">
              <div><p>✓</p></div>
              <p>전체 동의</p>
            </label>
          </div>
          <div class="border-div"></div>
          <div class="one-check-div">
            <div class="accept-btn">
              <input type=checkbox id="terms" v-model="checkedAcceptItems.terms">
              <label for="terms">
                <div><p>✓</p></div>
                <p>이용약관 동의 (필수)</p>
              </label>
              <button @click="isShowTerms = !isShowTerms"><IconVisibleBtn /></button>
            </div>
            <TermsComponent :isShowTerms="isShowTerms" @close="isShowTerms = false" />
            <div class="accept-btn">
              <input type=checkbox id="privacy" v-model="checkedAcceptItems.privacy">
              <label for="privacy">
                <div><p>✓</p></div>
                <p>개인정보처리방침 동의 (필수)</p>
              </label>
              <button @click="isShowPrivacy = !isShowPrivacy"><IconVisibleBtn /></button>
            </div>
            <PrivacyComponent :isShowPrivacy="isShowPrivacy" @close="isShowPrivacy = false" />
            <div class="accept-btn">
              <input type=checkbox id="event" v-model="checkedAcceptItems.event">
              <label for="event">
                <div><p>✓</p></div>
                <p>쇼핑정보 수신 동의 (선택)</p>
              </label>
              <button @click="isShowEvent = !isShowEvent"><IconVisibleBtn /></button>
            </div>
            <div class="accept-btn">
              <input type=checkbox id="sms" v-model="checkedAcceptItems.sms">
              <label for="sms">
                <div><p>✓</p></div>
                <p>SMS 수신 동의 (선택)</p>
              </label>
            </div>
            <EventComponent :isShowEvent="isShowEvent" @close="isShowEvent = false" />
          </div>
        </section>
        <section class="button-section">
          <button class="confirm" @click="confirmCheckTerms">다음</button>
          <button class="cancel" @click="$nuxt.$router.back()">취소</button>
        </section>
      </article>
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped lang="scss">

main {
  > .skyvape-join-msg-article {
    padding-bottom: 3.6rem;
    border-bottom: .1rem solid var(--color-border-hover);

    > .title-section {
      > h1 {
        font-weight: 700;
        font-size: 2.4rem;
        line-height: 3.2rem;
        word-break: keep-all;
      }
    }
  }

  > .skyvape-join-form-article {
    padding: 3.6rem 0;

    > .form-section {
      border: .1rem solid var(--color-border-hover);
      border-radius: 0.8rem;

      > .all-check-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.6rem;

        > label {
          height: 5.2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.4rem;

          > div {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            background: none;
            border: .1rem solid var(--color-border-hover);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;

            > p {
              font-weight: 900;
            }
          }

          > p {
            font-weight: 700;
          }

        }

        input[type=checkbox]:checked + label {
          > div {
            background-color: var(--color-accent);
            border: none;

            > p {
              color: black;
            }
          }
        }
      }

      > .border-div {
        border: .1rem solid var(--color-border-hover);
      }

      > .one-check-div {
        display: flex;
        flex-direction: column;
        padding: 0 1.6rem;

        > .accept-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          > label {
            height: 5.2rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-size: 1.4rem;

            > div {
              width: 2.4rem;
              height: 2.4rem;
              border-radius: 50%;
              background: none;
              border: .1rem solid var(--color-border-hover);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;

              > p {
                font-weight: 900;
              }
            }

            > p {
              font-weight: 500;
            }

          }

          > button {
            color: var(--color-text);
            width: 2rem;
            height: 2rem;
            cursor: pointer;
          }
        }

        input[type=checkbox]:checked + label {
          > div {
            background-color: var(--color-accent);
            border: none;

            > p {
              color: black;
            }
          }
        }
      }
    }

    > .button-section {
      margin-top: 3.6rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      > button {
        flex: 1;
        padding: 0 1.6rem;
        height: 4.2rem;
        border-radius: 0.8rem;
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--color-text);

        &.confirm {
          background-color: var(--color-accent);
          color: black;
        }

        &.cancel {
          border: .2rem solid var(--color-border);
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  main {
    margin: 0 auto;
    width: 100%;
    min-width: 36rem;
    max-width: 52rem !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  main {
    margin: 0 auto;
    width: 100%;
    max-width: 56rem !important;
  }
}

@media screen and (min-width: 1024px) {
  main {
    max-width: 52rem !important;
  }
}
</style>
