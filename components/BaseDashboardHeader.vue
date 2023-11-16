<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import {auth} from "~/scripts/FirebaseAuth";
import {readDocumentDataOnce} from "~/scripts/FirebaseFirestore";
import {showErrorToast} from "~/scripts/Toast";
import IconHome from "~/components/icons/IconHome.vue";
import IconSetting from "~/components/icons/IconSetting.vue";
import IconMenuBtn from "~/components/icons/IconMenuBtn.vue";
import IconCloseBtn from "~/components/icons/IconCloseBtn.vue";
import IconHomeWidgets from "~/components/icons/IconHomeWidgets.vue";
import IconOrder from "~/components/icons/IconOrder.vue";
import IconProduct from "~/components/icons/IconProduct.vue";
import IconUserGroup from "~/components/icons/IconUserGroup.vue";
import IconDashboard from "~/components/icons/IconDashboard.vue";
import IconReviewQna from "~/components/icons/IconReviewQna.vue";
import IconBlog from "~/components/icons/IconBlog.vue";
import IconAnalytics from "~/components/icons/IconAnalytics.vue";

const isClickedMenu = ref(false);
const dataGeneralSetting = ref();
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
];

const dataManageSection = [
  {
    parentMenuName: "홈",
    parentMenuIcon: IconHomeWidgets,
    parentMenuRoute: "/dashboard/shop-home",
    childMenuList: [],
  },
  {
    parentMenuName: "주문",
    parentMenuIcon: IconOrder,
    parentMenuRoute: "/dashboard/shop-orders",
    childMenuList: [],
  },
  {
    parentMenuName: "상품",
    parentMenuIcon: IconProduct,
    parentMenuRoute: "/dashboard/shop-products",
    childMenuList: [],
  },
  {
    parentMenuName: "고객",
    parentMenuIcon: IconUserGroup,
    parentMenuRoute: "/dashboard/shop-customers",
    childMenuList: [],
  },
  {
    parentMenuName: "게시판",
    parentMenuIcon: IconDashboard,
    parentMenuRoute: "/dashboard/boards",
    childMenuList: [],
  },
  {
    parentMenuName: "후기와 질문",
    parentMenuIcon: IconReviewQna,
    parentMenuRoute: "/dashboard/board-productReviewQnaSetting",
    childMenuList: [],
  },
  {
    parentMenuName: "블로그",
    parentMenuIcon: IconBlog,
    parentMenuRoute: "/dashboard/blogs",
    childMenuList: [],
  },
  {
    parentMenuName: "통계",
    parentMenuIcon: IconAnalytics,
    parentMenuRoute: "/dashboard/analytics",
    childMenuList: [],
  },
];

onBeforeMount(async () => {
  dataGeneralSetting.value = await readDocumentDataOnce("SETTING", "GENERAL_SETTING");
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
  <div class="base-dashboard-header-wrapper">
    <aside>
      <header>
        <h1 v-if="dataGeneralSetting">{{dataGeneralSetting.siteName}}</h1>
        <button @click="isClickedMenu = !isClickedMenu">
          <IconCloseBtn v-if="isClickedMenu" />
          <IconMenuBtn v-else />
        </button>
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
        <section class="skyvape-dashboard-manage-section">
          <p>상점 관리하기</p>
          <nav>
            <ul>
              <li v-for="(item, index) in dataManageSection" :key="index">
                <button>
                  <div>
                    <component :is="item.parentMenuIcon" />
                  </div>
                  <p>{{item.parentMenuName}}</p>
                </button>
              </li>
            </ul>
          </nav>
        </section>
      </article>
      <footer>
        <p>asdf</p>
      </footer>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.base-dashboard-header-wrapper {
  width: 24rem;
  border-right: 0.2rem solid var(--color-border-hover);

  > aside {
    height: 100vh;
    display: flex;
    flex-direction: column;

    > header {
      width: 100%;
      padding: 1.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h1 {
        font-size: 2.4rem;
      }

      > button {
         width: 3.2rem;
         height: 3.2rem;
         background-color: var(--color-accent);
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 0.8rem;
        cursor: pointer;

        > svg {
          width: 2.4rem;
          height: 2.4rem;
        }
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
          width: auto;
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

      > .skyvape-dashboard-manage-section {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin-top: 2.4rem;

        > p {
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--color-border-hover);
        }

        > nav {
          margin-top: 0.8rem;
          > ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            > li {
              > button {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                cursor: pointer;

                > div {
                  width: 2.8rem;
                  height: 2.8rem;
                  background-color: var(--color-accent);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 0.8rem;

                  > svg {
                    width: 2rem;
                    height: 2rem;
                  }
                }

                > p {
                  color: var(--color-text);
                  font-weight: 500;
                  font-size: 1.2rem;
                }
              }
            }
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
