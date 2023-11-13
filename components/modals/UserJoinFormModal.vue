<script setup lang="ts">
import {defineProps, ref, defineEmits, reactive, onMounted} from "vue";
import {
  joinEmailAndPasswordAPI
} from "~/scripts/FirebaseAuth";
import {clearAllToast, showErrorToast, showInfoToast, showSuccessToast} from "~/scripts/Toast";

const props = defineProps({
  isShowModal: Boolean
});
const emit = defineEmits(['close']);
const isCheckedUserInfo = ref(false),
  userInputName = ref(''),
  userInputPhoneNumber = ref(''),
  userInputEmail = ref(''),
  userInputPassword = ref(''),
  userInputRePassword = ref(''),
  userInputPostalCode = ref(''),
  userInputAddress1 = ref(''),
  userInputAddress2 = ref(''),
  userInputInvitor = ref('');

function onClickUserAuth() {
  const regexName = /^[가-힣]{2,6}$/;
  const regexPhoneNumber = /^010?([0-9]{3,4})?([0-9]{4})$/;
  if (userInputName.value.length !== 0) {
    if (userInputPhoneNumber.value.length !== 0) {
      if (regexName.test(userInputName.value)) {
        if (regexPhoneNumber.test(userInputPhoneNumber.value)) {
          IMP.init("imp29272276");
          IMP.certification({
            pg: "inicis_unified",
            merchant_uid: "test_lou7t268",
            min_age: 19,
            name: userInputName.value,
            phone: userInputPhoneNumber.value,
            company: "SKYVAPE",
            popup: true,
          }, function (response: any) {
            console.log(response);
            if (response.success) {
              isCheckedUserInfo.value = true;
            }
          });
          return;
        } else {
          showErrorToast("유효한 휴대폰 번호를 입력해주세요!");
          return;
        }
      } else {
        showErrorToast("유효한 이름을 입력해주세요!");
        return;
      }
    } else {
      showErrorToast("휴대폰 번호를 입력해주세요!");
      return;
    }
  } else {
    showErrorToast("이름을 입력해주세요!");
    return;
  }
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

function resetInputValue() {
  isCheckedUserInfo.value = false;
  userInputName.value = '';
  userInputPhoneNumber.value = '';
  userInputEmail.value = '';
  userInputPassword.value = '';
  userInputRePassword.value = '';
  userInputPostalCode.value = '';
  userInputAddress1.value = '';
  userInputAddress2.value = '';
  userInputInvitor.value = '';
}

function cancelFormInput() {
  resetInputValue();
  emit('close', false);
}

async function confirmFormInput() {
  showInfoToast("회원가입 진행중입니다!");
  const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regexPassword = /^[A-Za-z0-9]{8,20}$/;

  if (isCheckedUserInfo.value) {
    if (regexEmail.test(userInputEmail.value)) {
      if (regexPassword.test(userInputPassword.value)) {
        if (userInputPassword.value === userInputRePassword.value) {
          if (userInputPostalCode.value.length !== 0) {
            const isCreatedUser = await joinEmailAndPasswordAPI(
              userInputEmail.value,
              userInputPassword.value,
              userInputPostalCode.value,
              userInputAddress1.value,
              userInputAddress2.value,
              userInputInvitor.value,
              userInputName.value,
              userInputPhoneNumber.value
            );
            if (isCreatedUser) {
              clearAllToast();
              showSuccessToast("회원 가입이 완료되었습니다!");
              emit('close', true);
              return;
            } else {
              clearAllToast();
              showErrorToast("회원 가입에 오류가 발생하였습니다!");
              emit('close', false);
              return;
            }
          } else {
            clearAllToast();
            showErrorToast("주소가 입력되지 않았습니다!");
            return;
          }
        } else {
          clearAllToast();
          showErrorToast("두 비밀번호가 서로 일치하지 않습니다!");
          return;
        }
      } else {
        clearAllToast();
        showErrorToast("비밀번호 형식이 맞지 않습니다!");
        return;
      }
    } else {
      clearAllToast();
      showErrorToast("이메일 형식이 맞지 않습니다!");
      return;
    }
  } else {
    clearAllToast();
    showErrorToast("실명 인증을 진행해주세요!");
    return;
  }
}
// emit('close', true);
</script>

<template>
  <transition name="fade">
    <div v-if="isShowModal" class="modal-outer" @click.self="cancelFormInput">
      <div class="modal-inner">
        <article class="skyvape-join-msg-article">
          <section class="title-section">
            <h1>SKYVAPE 회원 가입을 위해<br/>회원님의 정보를 입력해주세요!</h1>
          </section>
        </article>
        <div class="border-div"></div>
        <article class="skyvape-join-form-article">
          <section class="form-section">
            <h2>회원 인증</h2>
            <div class="form-div">
              <h2 class="form-title">이름</h2>
              <div class="form-input-div">
                <input type="text" :disabled="isCheckedUserInfo" v-model="userInputName" placeholder="주민등록 상의 이름을 입력해주세요!">
              </div>
            </div>
            <div class="form-div">
              <h2 class="form-title">휴대폰 번호</h2>
              <div class="form-input-div">
                <input type="tel" :disabled="isCheckedUserInfo" v-model="userInputPhoneNumber" placeholder="[- 제외] 본인 명의의 휴대폰 번호를 입력해주세요!">
              </div>
            </div>
            <button class="auth" :disabled="isCheckedUserInfo" @click="onClickUserAuth">{{ isCheckedUserInfo ? "실명 인증완료" : "실명 인증하기"}}</button>
          </section>
          <section class="form-section">
            <h2>필수 정보</h2>
            <div class="form-div">
              <h2 class="form-title">이메일</h2>
              <div class="form-input-div">
                <input type="email" v-model="userInputEmail" maxlength="50" placeholder="이메일 형식으로 최대 50자 이내">
              </div>
            </div>
            <div class="form-div">
              <h2 class="form-title">비밀번호</h2>
              <div class="form-input-div">
                <input type="password" v-model="userInputPassword" maxlength="20" placeholder="문자, 숫자 포함 20자 이내">
              </div>
            </div>
            <div class="form-div">
              <h2 class="form-title">비밀번호 확인</h2>
              <div class="form-input-div">
                <input type="password" v-model="userInputRePassword" maxlength="20" placeholder="상단의 입력한 비밀번호 재입력">
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
          </section>
          <section class="form-section">
            <h2>선택 정보</h2>
            <div class="form-div">
              <h2 class="form-title">추천인</h2>
              <div class="form-input-div">
                <input type="email" v-model="userInputInvitor" maxlength="50" placeholder="추천인 이메일을 입력해주세요!">
              </div>
            </div>
          </section>
        </article>
        <section class="button-section">
          <button class="confirm" @click="confirmFormInput">가입하기</button>
          <button class="cancel" @click="cancelFormInput">취소</button>
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


    > .skyvape-join-msg-article {

      > .title-section {
        > h1 {
          font-weight: 700;
          font-size: 1.8rem;
          word-break: keep-all;
        }
      }
    }

    > .border-div {
      border: 0.1rem solid var(--color-border-hover);
      margin: 1.6rem 0;
    }

    > .skyvape-join-form-article {
      height: 28rem;
      overflow-y: scroll;
      padding-right: 0.8rem;


      &::-webkit-scrollbar {
        width: 0.6rem;
        display: unset;
      }

      &::-webkit-scrollbar-track {
        background: var(--color-background-mute); /* 트랙 색상 */
        border-radius: 100rem;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--color-text); /* 핸들 색상 */
        border-radius: 100rem;
        height: 4.8rem;
      }

      > .form-section {
        margin-top: 2.4rem;

        &:nth-child(1) {
          margin-top: 0;
        }

        > h2 {
          font-size: 1.6rem;
          font-weight: 700;
        }

        > button {
          width: 100%;
          padding: 0 1.6rem;
          color: black;
          font-weight: 700;
          background-color: var(--color-accent);
          margin-top: 0.8rem;
          border-radius: 0.8rem;
          height: 3.6rem;

          &:disabled {
            color: white;
            background-color: var(--color-border-hover);
          }

          &.auth {
            margin-top: 2.4rem;
          }
        }

        > .form-div {
          margin-top: 1.6rem;

          &:nth-child(1) {
            margin-top: 0;
          }

          > h2 {
            font-size: 1.4rem;
            font-weight: 700;
          }

          > div.form-input-div {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-top: 0.8rem;
            padding: 0;
            border: none;

            input {
              border: 0.2rem solid var(--color-border-hover);
              border-radius: 0.8rem;
              line-height: 3.6rem;
              padding: 0 1.6rem;
              background: none;
              font-size: 1.2rem;
              color: var(--color-text);
              flex: 1;

              &:focus-visible {
                outline: none;
                border-color: var(--color-border);
              }
            }

            > div {
              display: flex;
              align-items: center;
              gap: 0.8rem;
              > button {
                width: auto;
                background-color: var(--color-accent);
                color: black;
                padding: 0 1.6rem;
                height: 3.6rem;
                border-radius: 0.8rem;
                font-size: 1.2rem;
                font-weight: 700;
              }
            }
          }
        }
      }
    }

    > .button-section {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-top: 2.4rem;
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
