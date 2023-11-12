<script setup lang="ts">
import {defineProps, ref, defineEmits} from "vue";
import {resetPasswordAPI} from "~/scripts/FirebaseAuth";

const props = defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(['close']);
const userInputEmail = ref('');

async function resetPassword() {
  const isAccepted = await resetPasswordAPI(userInputEmail.value);
  if (isAccepted) {
    emit('close');
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="isShowModal" class="modal-outer" @click.self="$emit('close')">
      <div class="modal-inner">
        <h1>가입하실 때 사용하신 이메일을 입력해주세요!</h1>
        <input type="email" v-model="userInputEmail" placeholder="이메일">
        <button @click="resetPassword">인증 이메일 보내기</button>
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

    > h1 {
      font-weight: 700;
      word-break: keep-all;
      text-align: center;
      font-size: 1.6rem;
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
    }

    > button {
      margin-top: 1.6rem;
       width: 100%;
       background-color: var(--color-accent);
       height: 3.6rem;
       border-radius: 0.8rem;
       font-weight: 700;
       font-size: 1.4rem;
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
