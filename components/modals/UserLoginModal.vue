<script setup lang="ts">
import {defineProps, ref, defineEmits} from "vue";
import {loginEmailAndPasswordAPI, loginSocialAccountAPI, resetPasswordAPI} from "~/scripts/FirebaseAuth";
import IconGoogle from "~/components/icons/IconGoogle.vue";
import IconApple from "~/components/icons/IconApple.vue";
import IconFacebook from "~/components/icons/IconFacebook.vue";
import IconKakao from "~/components/icons/IconKakao.vue";
import UserJoinAcceptModal from "~/components/modals/UserJoinAcceptModal.vue";
import UserResetPasswordModal from "~/components/modals/UserResetPasswordModal.vue";
import {showInfoToast, showSuccessToast} from "~/scripts/Toast";
import UserJoinFormModal from "~/components/modals/UserJoinFormModal.vue";

const props = defineProps({
  isShowModal: Boolean
});

const isShowFindModal = ref(false),
  isShowJoinTermsModal = ref(false),
  isShowJoinFormModal = ref(false),
  isShowJoinCompleteModal = ref(false);

const emit = defineEmits(['close']);
const userInputEmail = ref(''),
  userInputPassword = ref('');

async function joinSocialAccount(platform: string) {
  const resultLoginData = await loginSocialAccountAPI(platform);
  if (resultLoginData) {
    emit('close');
    $nuxt.$router.go(0);
  }
}

async function loginEmailAccount() {
  const resultLoginData = await loginEmailAndPasswordAPI(userInputEmail.value, userInputPassword.value);
  if (resultLoginData) {
    emit('close');
    $nuxt.$router.go(0);
  }
}

function checkClosedJoinAcceptModal(modalStatus: boolean) {
  isShowJoinTermsModal.value = false;
  if (modalStatus) {
    isShowJoinFormModal.value = true;
  } else {
    showInfoToast("회원 가입을 취소하셨습니다!");
  }
}

function checkClosedJoinFormModal(modalStatus: boolean) {
  isShowJoinFormModal.value = false;
  if (modalStatus) {
    isShowJoinCompleteModal.value = true;
  } else {
    showInfoToast("회원 가입을 취소하셨습니다!");
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="isShowModal" class="modal-outer" @click.self="$emit('close')">
      <div class="modal-inner">
        <section class="form-section">
          <h1>내 계정에 로그인</h1>
          <h2>이메일과 비밀번호를 입력하십시오 :</h2>
          <input type="email" maxlength="50" v-model="userInputEmail" placeholder="이메일" @keyup.enter="loginEmailAccount">
          <input type="password" maxlength="20" v-model="userInputPassword" placeholder="비밀번호" @keyup.enter="loginEmailAccount">
          <button class="login" @click="loginEmailAccount">로그인</button>
          <button class="find" @click="isShowFindModal = true;">비밀번호를 잊으셨나요?</button>
          <UserResetPasswordModal :isShowModal="isShowFindModal" @close="isShowFindModal = false" />
          <button class="join" @click="isShowJoinTermsModal = true">
            <p>아직 회원이 아니세요?</p>
            <p>회원가입 ></p>
          </button>
          <UserJoinAcceptModal :isShowModal="isShowJoinTermsModal" @close="checkClosedJoinAcceptModal" />
          <UserJoinFormModal :isShowModal="isShowJoinFormModal" @close="checkClosedJoinFormModal" />
        </section>
        <section class="social-section">
          <div class="title-div">
            <div></div>
            <p>1초 만에 소셜 로그인</p>
            <div></div>
          </div>
          <div class="button-div">
            <button class="apple hide">
              <IconApple />
              <p>Apple 계정으로 로그인</p>
            </button>
            <button class="facebook" @click="joinSocialAccount('facebook')">
              <IconFacebook />
              <p>Facebook 계정으로 로그인</p>
            </button>
            <button class="google" @click="joinSocialAccount('google')">
              <IconGoogle />
              <p>Google 계정으로 로그인</p>
            </button>
            <button class="kakao hide">
              <IconKakao />
              <p>Kakao 계정으로 로그인</p>
            </button>
          </div>
        </section>
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

    > section {

      > h1 {
        font-weight: 700;
        word-break: keep-all;
        text-align: center;
        font-size: 1.6rem;
      }

      > h2 {
        margin-top: 0.8rem;
        font-weight: 500;
        word-break: keep-all;
        text-align: center;
        font-size: 1.4rem;
      }

      > input {
        margin-top: 2.4rem;
        width: 100%;
        background: none;
        border: .2rem solid var(--color-border-hover);
        color: var(--color-text);
        padding: 0 1.6rem;
        height: 3.6rem;
        font-weight: 500;
        border-radius: 0.8rem;
        font-size: 1.4rem;

        &:focus-visible {
          border-color: var(--color-border) !important;
          border-width: .2rem;
          outline: none;
        }

        &:nth-child(4) {
          margin-top: 0.8rem;
        }
      }

      > button.login {
        margin-top: 2.4rem;
        width: 100%;
        background-color: var(--color-accent);
        height: 4.2rem;
        border-radius: 0.8rem;
        font-weight: 700;
        font-size: 1.4rem;
      }

      > button.find {
        width: 100%;
        font-weight: 700;
        color: var(--color-border-hover);
        font-size: 1.2rem;
        text-align: center;
        margin-top: 0.8rem;
      }

      > button.join {
        margin-top: 0.8rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.6rem;
        height: 3.6rem;
        border: .2rem solid var(--color-border);
        border-radius: 0.8rem;
        font-size: 1.2rem;
        color: var(--color-text);

        > p:last-child {
          font-weight: 700;
        }
      }

    }

    > .social-section {
      margin-top: 2.4rem;

      > .title-div {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        > p {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-text);
        }

        > div {
          flex: 1;
          height: .1rem;
          background-color: var(--color-border-hover);
        }
      }

      > .button-div {
        margin-top: 1.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        > button {
          width: 100%;
          height: 3.6rem;
          border-radius: 0.8rem;
          font-weight: 500;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;

          &.apple {
            background-color: var(--color-text);
            color: var(--color-text-inverse);
          }

          &.facebook {
            background-color: #2374F2;
            color: white;
          }

          &.google {
            background-color: white;
            color: black;
            border: .2rem solid black;
          }

          &.kakao {
            background-color: #fee500;
            color: black;
          }

          > svg {
            width: 1.6rem;
            height: 1.6rem;
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
