<script setup lang="ts">
import {onMounted} from "vue";
import {auth} from "~/scripts/FirebaseAuth";
import {readDocumentDataOnce} from "~/scripts/FirebaseFirestore";
import {showErrorToast} from "~/scripts/Toast";
import IconHome from "~/components/icons/IconHome.vue";
import IconSetting from "~/components/icons/IconSetting.vue";

const dataShopSection = [
  {
    titleIcon: IconHome,
    titleText: "내 상점 바로가기",
    goToRoute: "/"
  },
  {
    titleIcon: IconSetting,
    titleText: "상점 설정",
    goToRoute: "/store-setting/basic"
  }
]

onMounted(async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userData = await readDocumentDataOnce("USER", user.uid);
      if (!userData.isAdmin) {
        showErrorToast("접근 권한이 없습니다!");
        $nuxt.$router.back();
        return;
      }
    } else {
      showErrorToast("접근 권한이 없습니다!");
      $nuxt.$router.back();
      return;
    }
  });
})
</script>

<template>
  <div class="wrapper">
    <aside>
      <header>
        <h1>SKYVAPE</h1>
      </header>
      <article>
        <section class="skyvape-dashboard-shop-section">
          <button v-for="(item, index) in dataShopSection" :key="index" @click="$nuxt.$router.push(item.goToRoute)">
            <div>
              <component :is="item.titleIcon" />
            </div>
            <p>{{item.titleText}}</p>
          </button>
        </section>
        <section class="skyvape-dashboard-"></section>
      </article>
      <footer>
        <p>asdf</p>
      </footer>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 24rem;
  border-right: 0.2rem solid var(--color-border-hover);

  > aside {
    height: 100vh;
    display: flex;
    flex-direction: column;

    > header {
      padding: 1.6rem;

      > h1 {
        font-size: 2.4rem;
      }
    }

    > article {
      flex: 1;
      padding: 1.6rem;
      overflow-y: scroll;

      > .skyvape-dashboard-shop-section {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        > button {
          width: 100%;
          height: auto;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;

          > div {
            width: 3.2rem;
            height: 3.2rem;
            background-color: var(--color-accent);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.8rem;
          }

          > p {
            color: var(--color-text);
            font-weight: 700;
            font-size: 1.4rem;
          }
        }
      }
    }

    > footer {
      padding: 1.6rem;

    }
  }
}
</style>
