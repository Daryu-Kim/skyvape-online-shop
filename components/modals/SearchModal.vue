<script setup lang="ts">
import {defineProps, ref, defineEmits, onMounted} from "vue";
import {resetPasswordAPI} from "~/scripts/FirebaseAuth";
import IconSearchBtn from "~/components/icons/IconSearchBtn.vue";
import {readDocumentsDataOnce} from "~/scripts/FirebaseFirestore";
import {DocumentData} from "firebase/firestore";

const props = defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(['close']);
const userInputSearchKeyword = ref(''),
  listOfKeywordItems = ref([]);

onMounted(async() => {
  const keywordsData = await readDocumentsDataOnce('SETTING/KEYWORDS/KEYWORD_TEST_LIST') as DocumentData[],
    keywordsDataArr: never[] = [];

  keywordsData.forEach((item) => {
    keywordsDataArr.push(item as never);
  });

  listOfKeywordItems.value = keywordsDataArr.sort((a, b) => {
    if (a.keywordCount > b.keywordCount) return -1;
    if (a.keywordCount < b.keywordCount) return 1;
    return 0;
  });
  listOfKeywordItems.value = listOfKeywordItems.value.slice(0, 5);
});

</script>

<template>
  <transition name="fade">
    <div v-if="isShowModal" class="modal-outer" @click.self="$emit('close')">
      <div class="modal-inner">
        <div class="modal-content">
          <div class="search-div">
            <input v-model="userInputSearchKeyword" placeholder="검색하실 내용을 입력하세요!" />
            <button @click="$nuxt.$router.push(`/search/${userInputSearchKeyword}`)"><IconSearchBtn /></button>
          </div>
          <div class="keyword-div">
            <h1>추천 검색어</h1>
            <div>
              <button v-for="(item, index) in listOfKeywordItems" :key="index">
                <p>{{item.keywordName}} ({{ item.keywordCount }})</p>
              </button>
            </div>
          </div>
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
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  > .modal-inner {
    width: 100%;
    background-color: var(--color-background-soft);
    padding: 3.6rem 2.4rem;

    > .modal-content {
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      > .search-div {
        padding-bottom: 0.8rem;
        border-bottom: 0.2rem solid var(--color-text);
        display: flex;
        align-items: center;
        gap: 0.8rem;

        > input {
          flex: 1;
          background: none;
          color: var(--color-text);
          font-weight: 500;
          font-size: 1.4rem;
          height: 3.6rem;
          border: none;
          outline: none;

          &:focus-visible {
            border: none;
            outline: none;
          }

        }

        > button {

        }
      }
      > .keyword-div {
        margin-top: 2.4rem;

        > h1 {
          font-size: 1.6rem;
        }

        > div {
          margin-top: 0.8rem;
          display: flex;
          gap: 0.8rem;
          align-items: center;
          flex-wrap: wrap;

          > button {
            border-radius: 100rem;
            border: 0.2rem solid var(--color-accent);
            padding: 0.2rem 1.6rem;
            cursor: pointer;
            width: auto;
            height: auto;
            color: var(--color-text);

            &:hover {
              background-color: var(--color-accent);

              > p {
                color: black;
                font-weight: 700;
              }
            }

            > p {
              font-size: 1.2rem;
              font-weight: 500;
            }

          }
        }
      }
      > button {
        margin-top: 2.4rem;
        color: var(--color-border);
        width: auto;
        height: auto;
        align-self: flex-end;
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
  .modal-content {
    max-width: 40rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .modal-content {
    max-width: 36rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .modal-content {
    max-width: 32rem !important;
  }
}
</style>
