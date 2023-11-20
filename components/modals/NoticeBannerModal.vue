<script setup lang="ts">
import {defineProps, ref, defineEmits, onBeforeMount} from "vue";
import {loginEmailAndPasswordAPI, loginSocialAccountAPI, resetPasswordAPI} from "~/scripts/FirebaseAuth";
import IconGoogle from "~/components/icons/IconGoogle.vue";
import IconApple from "~/components/icons/IconApple.vue";
import IconFacebook from "~/components/icons/IconFacebook.vue";
import IconKakao from "~/components/icons/IconKakao.vue";
import UserJoinAcceptModal from "~/components/modals/UserJoinAcceptModal.vue";
import UserResetPasswordModal from "~/components/modals/UserResetPasswordModal.vue";
import {showInfoToast, showSuccessToast} from "~/scripts/Toast";
import UserJoinFormModal from "~/components/modals/UserJoinFormModal.vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import {DocumentData} from "firebase/firestore";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";

const props = defineProps({
  isShowModal: Boolean
});

const listOfNoticeItems = ref([]);
const emit = defineEmits(['close']);

const swiperOptions = ref({
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  }
});

onBeforeMount(async () => {
  const data = await readDocumentsDataOnce("SETTING/GENERAL_SETTING/NOTICE_MODAL_DATA") as DocumentData[];
  data.forEach((item) => {
    listOfNoticeItems.value.push(item as never);
  });
  console.log(listOfNoticeItems.value);
});

function setItemWithExpireTime(keyName: string, keyValue: string) {
  const obj = {value: keyValue, expire: Date.now() + 86400000}
  const objString = JSON.stringify(obj);
  localStorage.setItem(keyName, objString);
}

function onClickDontShow() {
  setItemWithExpireTime("SHOW_NOTICE_MODAL", "false");
  emit('close');
}


</script>

<template>
  <transition name="fade">
    <div v-if="isShowModal" class="modal-outer" @click.self="$emit('close')">
      <div class="modal-inner">
        <Swiper class="swiper-container" :options="swiperOptions">
          <SwiperSlide class="swiper-slide" v-for="(noticeItem, noticeIndex) in listOfNoticeItems" :key="noticeIndex">
            <div class="notice-image" :style="{backgroundImage: `url(${noticeItem.noticeImage})`}"
                 @click="$nuxt.$router.push(noticeItem.noticeRoute)"></div>
          </SwiperSlide>
          <div class="swiper-pagination" slot="pagination"/>
        </Swiper>
        <div class="notice-controller">
          <button @click="onClickDontShow">1일 동안 그만 보기</button>
          <button @click="$emit('close')">닫기</button>
        </div>
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
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > .modal-inner {
    background-color: var(--color-background-soft);
    border-radius: 0.8rem;
    width: 100%;

    > .swiper-container {

      .swiper-slide {

        > .notice-image {
          width: 100%;
          aspect-ratio: 1 / 1;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 0.8rem 0.8rem 0 0;
          cursor: pointer;
        }

      }

      .swiper-pagination-fraction {
        background-color: rgba(0, 0, 0, 0.8);
        width: auto;
        height: auto;
        font-size: 1.2rem;
        font-weight: 700;
        padding: 0.2rem 1.6rem;
        border-radius: 100rem;
        top: 1.6rem;
        bottom: unset;
        left: unset;
        right: 1.6rem;
      }
    }

    > .notice-controller {
      padding: 1.2rem 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > button {
        width: auto;
        height: auto;
        color: var(--color-text);

        &:nth-child(1) {
          color: var(--color-border);
        }

      }
    }

  }
}

@media screen and (max-width: 767px) {
  .modal-inner {
    max-width: 40rem;
    margin: 0 2.4rem !important;
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
