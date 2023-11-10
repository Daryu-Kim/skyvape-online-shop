<script setup lang="ts">
import IconLock from "~/components/icons/IconLock.vue";
import IconApple from "~/components/icons/IconApple.vue";
import IconFacebook from "~/components/icons/IconFacebook.vue";
import IconGoogle from "~/components/icons/IconGoogle.vue";
import IconKakao from "~/components/icons/IconKakao.vue";
import TopBanner from "~/components/TopBanner.vue";
import {ref} from "vue";
import BaseFooter from "~/components/BaseFooter.vue";
import {
  loginEmailAndPasswordAPI,
  loginFacebookAccountAPI,
  loginSocialAccountAPI,
  resetPasswordAPI
} from "~/scripts/FirebaseAuth";

let userInputID = ref(''), userInputPW = ref('');
const isShowModal = ref(false);

async function joinSocialAccount(platform: string) {
  const resultLoginData = await loginSocialAccountAPI(platform);
  if (resultLoginData) {
    $nuxt.$router.back();
  }
}

async function loginEmailAccount() {
  const resultLoginData = await loginEmailAndPasswordAPI(userInputID.value, userInputPW.value);
  if (resultLoginData) {
    $nuxt.$router.back();
  }
}

</script>

<template>
  <div class="wrapper">
    <TopBanner />
    <BasePCHeader />
    <main>
      <article class="skyvape-join-msg-article">
        <section class="title-section">
          <h1>환영합니다, 고객님 :)</h1>
          <h1>SKYVAPE 입니다!</h1>
        </section>
        <section class="desc-section">
          <h2>회원가입을 하시면 다양하고 특별한 혜택이 준비되어 있습니다.</h2>
        </section>
      </article>
      <article class="skyvape-join-form-article">
        <section class="form-section">
          <input type="email" maxlength="50" placeholder="이메일" v-model="userInputID">
          <input type="password" maxlength="20" placeholder="패스워드" v-model="userInputPW">
          <div class="lock-div">
            <IconLock class="lock-ico" />
            <p>보안 접속중</p>
          </div>
          <button @click="loginEmailAccount">로그인</button>
          <div class="find-div">
            <button @click="isShowModal = true;">비밀번호를 잊으셨나요?</button>
          </div>
        </section>
        <section class="join-section">
          <button @click="$nuxt.$router.push('/join')">
            <p>아직 회원이 아니세요?</p>
            <p>회원가입 ></p>
          </button>
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
      </article>
    </main>
    <BaseFooter />
    <ResetPasswordModal :isShowModal="isShowModal" @close="isShowModal = false" />
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
      }
    }
    > .desc-section {
      margin-top: 0.8rem;
      > h2 {
        font-weight: 500;
        font-size: 1.4rem;
        color: var(--color-heading);
      }
    }
  }

  > .skyvape-join-form-article {
    padding: 3.6rem 0;

    > .form-section {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      > input {
        width: 100%;
        background: none;
        border: .2rem solid var(--color-border-hover);
        color: var(--color-text);
        padding: 0 1.6rem;
        height: 4.2rem;
        font-weight: 500;
        border-radius: 0.8rem;
        font-size: 1.4rem;

        &:focus-visible {
          border-color: var(--color-border) !important;
          border-width: .2rem;
          outline: none;
        }
      }

      > .lock-div {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        > svg {
          width: 2.4rem;
          height: 2.4rem;
        }

        > p {
          font-size: 1.2rem;
          font-weight: 700;
        }
      }

      > button {
        width: 100%;
        background-color: var(--color-accent);
        height: 4.2rem;
        border-radius: 0.8rem;
        font-weight: 700;
        font-size: 1.4rem;
      }

      > .find-div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.6rem;


        > button {
          width: auto;
          font-weight: 700;
          color: var(--color-border-hover);
          font-size: 1.2rem;
        }
      }

    }

    > .join-section {
      margin: 1.6rem 0;
      > button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.6rem;
        height: 4.2rem;
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
      margin-top: 3.6rem;

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
        margin-top: 2.4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
        > button {
          width: 100%;
          height: 4.2rem;
          border-radius: 0.8rem;
          font-weight: 500;
          font-size: 1.4rem;
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
            width: 2.4rem;
            height: 2.4rem;
          }
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
