<script setup lang="ts">
import {defineProps, ref, defineEmits, reactive} from "vue";
import {loginEmailAndPasswordAPI, loginSocialAccountAPI, resetPasswordAPI} from "~/scripts/FirebaseAuth";
import IconGoogle from "~/components/icons/IconGoogle.vue";
import IconApple from "~/components/icons/IconApple.vue";
import IconFacebook from "~/components/icons/IconFacebook.vue";
import IconLock from "~/components/icons/IconLock.vue";
import IconKakao from "~/components/icons/IconKakao.vue";
import BaseFooter from "~/components/BaseFooter.vue";
import IconVisibleBtn from "~/components/icons/IconVisibleBtn.vue";
import {showErrorToast} from "~/scripts/Toast";

const props = defineProps({
  isShowModal: Boolean
});
const emit = defineEmits(['close']);
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
    sessionStorage.setItem("ACCEPT_ALERT", JSON.stringify({
      event: checkedAcceptItems.event,
      sms: checkedAcceptItems.sms
    }));
    checkedAcceptItems.terms = false;
    checkedAcceptItems.privacy = false;
    checkedAcceptItems.event = false;
    checkedAcceptItems.sms = false;
    emit('close', true);
  } else {
    showErrorToast("필수 항목에 동의해주세요!");
    return;
  }
}

async function cancelCheckTerms() {
  checkedAcceptItems.terms = false;
  checkedAcceptItems.privacy = false;
  checkedAcceptItems.event = false;
  checkedAcceptItems.sms = false;
  sessionStorage.removeItem("ACCEPT_ALERT");
  emit('close', false);
}
</script>

<template>
  <transition name="fade">
    <div v-if="isShowModal" class="modal-outer" @click.self="cancelCheckTerms">
      <div class="modal-inner">
        <article class="skyvape-join-msg-article">
          <section class="title-section">
            <h1>SKYVAPE 회원 가입을 위해<br/>이용 약관에 동의해주세요!</h1>
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
            <button class="cancel" @click="cancelCheckTerms">취소</button>
          </section>
        </article>
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

.modal-outer {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > .modal-inner {
    background-color: var(--color-background-soft);
    padding: 2.4rem;
    border-radius: 0.8rem;
    width: 100%;


    > .skyvape-join-msg-article {
      padding-bottom: 2.4rem;
      border-bottom: .1rem solid var(--color-border-hover);

      > .title-section {
        > h1 {
          font-weight: 700;
          font-size: 1.8rem;
          word-break: keep-all;
        }
      }
    }

    > .skyvape-join-form-article {
      padding-top: 2.4rem;

      > .form-section {
        border: .2rem solid var(--color-border-hover);
        border-radius: 0.8rem;

        > .all-check-div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.6rem;

          > label {
            height: 3.6rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 1.2rem;

            > div {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              background: none;
              border: .1rem solid var(--color-border-hover);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-size: 1.6rem;

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
              height: 3.6rem;
              display: flex;
              align-items: center;
              gap: 0.6rem;
              font-size: 1.2rem;

              > div {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background: none;
                border: .1rem solid var(--color-border-hover);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;

                > p {
                  font-weight: 900;
                  font-size: 1.6rem;
                }
              }

              > p {
                font-weight: 500;
              }

            }

            > button {
              color: var(--color-text);
              width: 1.6rem;
              height: 1.6rem;
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
        margin-top: 2.4rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        > button {
          flex: 1;
          padding: 0 1.6rem;
          height: 3.6rem;
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
}

@media screen and (max-width: 767px) {
  .modal-inner {
    max-width: 40rem;
    margin: 0 2.4rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .modal-inner {
    max-width: 36rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .modal-inner {
    max-width: 32rem !important;
  }
}
</style>
