<script setup lang="ts">
import {defineProps, ref, defineEmits} from "vue";
import {resetPasswordAPI} from "~/scripts/FirebaseAuth";

const props = defineProps({
  isShowEvent: Boolean
});

const emit = defineEmits(['close']);
</script>

<template>
  <transition name="fade">
    <div v-if="isShowEvent" class="modal-outer" @click.self="$emit('close')">
      <div class="modal-inner">
        <h1>쇼핑정보 수신</h1>
        <p>
          할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다. 단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이 발송됩니다.
          <br>선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후 회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수 있습니다.
        </p>
        <button @click="$emit('close')">닫기</button>
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
    padding: 3.6rem;
    border-radius: 0.8rem;

    > h1 {
      font-weight: 700;
      word-break: keep-all;
      text-align: center;
      font-size: 2.4rem;
    }

    > p {
      margin-top: 2.4rem;
      color: var(--color-text);
      height: 70%;
      max-height: 36rem;
      font-weight: 500;
      font-size: 1.4rem;
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
    }

    > button {
      margin-top: 2.4rem;
       width: 100%;
       background-color: var(--color-accent);
       height: 4.2rem;
       border-radius: 0.8rem;
       font-weight: 700;
       font-size: 1.4rem;
     }
  }
}

@media screen and (max-width: 767px) {
  .modal-inner {
    width: 100%;
    min-width: 32rem;
    max-width: 36rem !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .modal-inner {
    width: 100%;
    max-width: 56rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .modal-inner {
    max-width: 56rem !important;
  }
}
</style>
