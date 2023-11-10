<script setup lang="ts">
</script>

<template>
  <footer>
    <article class="skyvape-footer-contact">
      <section class="call">
        <a href="tel:010-5367-2568">
          010.5367.2568
        </a>
        <p>
          AM 10:00 - PM 07:00 (주말, 공휴일 휴무)
        </p>
      </section>
      <section class="link">
        <button>고객센터 ></button>
      </section>
    </article>
    <article class="skyvape-footer-company">
      <section>
        <details>
          <summary>스카이베이프 사업자 정보</summary>
          <ul>
            <li>대표자명 : 이규호</li>
            <li>사업자등록번호 : 000-00-00000</li>
            <li>통신판매업신고 : 2023-대전중구-0000</li>
            <li>주소 : 대전광역시</li>
            <li>전화번호 : 010-5367-2568</li>
            <li>Copyright SKYVAPE. All rights reserved.</li>
          </ul>
        </details>
        <div class="skyvape-footer-privacy">
          <nuxt-link to="/company-intro">회사소개</nuxt-link>
          <nuxt-link to="/company-terms">이용약관</nuxt-link>
          <nuxt-link to="/company-privacy">개인정보처리방침</nuxt-link>
          <nuxt-link to="/company-use">이용안내</nuxt-link>
        </div>
      </section>
    </article>
  </footer>
</template>

<style scoped lang="scss">
footer {
  > .skyvape-footer-contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.4rem 2.4rem;
    background-color: #001D3D;

    > .call {
      > a {
        font-size: 2.4rem;
        color: white;
        font-weight: 700;

        &:hover {
          color: var(--vt-c-accent-light);
          font-weight: 700;
        }
      }
      > p {
        font-size: 1.2rem;
        font-weight: 500;
        color: white;
      }
    }

    > .link {
      > button {
        color: white;
        width: auto;
        height: auto;
        border: .2rem solid white;
        padding: 0.8rem 1.6rem;
        border-radius: 100rem;
        font-weight: 700;
        font-size: 1.2rem;

        &:hover {
          background-color: var(--vt-c-accent-light);
          border-color: var(--vt-c-accent-light);
          color: var(--vt-c-text-light);
        }
      }
    }
  }
  > .skyvape-footer-company {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.4rem 2.4rem;
    background-color: #003566;

    > section {
      > details {
        > summary {
          font-size: 1.2rem;
          color: white;
          font-weight: 700;
          user-select: none;
          cursor: pointer;
          list-style: none;

          &:hover {
            color: var(--vt-c-accent-light);
            font-weight: 700;
          }

          &::-webkit-details-marker {
            display: none;
          }

          &::after {
            content: ' ►';
          }
        }
        > ul {
          margin-top: 0.4rem;
          > li {
            list-style: none;
            padding-left: 1.2rem;
            font-weight: 500;
            font-size: 1.2rem;
            color: white;
            line-height: 1.6;
          }
        }
      }

      > .skyvape-footer-privacy {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-top: 1.6rem;

        > a {
          color: white;

          &:hover {
            color: var(--vt-c-accent-light);
            font-weight: 700;
          }
        }
      }

      > details[open] summary:after {
        content: ' ▼';
      }
    }
  }
}
</style>
