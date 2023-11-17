<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <TopBanner />
    <BasePCHeader />
    <main>
      <div>
        <article class="skyvape-ordinary-delivery-article">
          <section class="title-section">
            <h1>[택배사 배송]</h1>
          </section>
          <section class="cart-section">

          </section>
        </article>
        <article class="skyvape-direct-delivery-article">
          <section class="title-section">
            <h1>[업체 직배송]</h1>
          </section>
          <section class="cart-section">

          </section>
        </article>
      </div>
      <div>
        <div>
          <section>
            <h1>주문 상품</h1>
          </section>
        </div>
        asdf
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped lang="scss">
main {
  display: flex;
  gap: 1.6rem;

  > div {

    &:nth-child(1) {
      flex: 1;

    }

    > article {

      &.skyvape-ordinary-delivery-article {
        margin-top: 0;
      }

      > .title-section {
        padding-bottom: 1.6rem;
        border-bottom: 0.2rem solid var(--color-text);
        > h1 {
          font-size: 1.6rem;
        }
      }

      > .cart-section {
        margin-top: 1.6rem;
        border: 0.2rem solid var(--color-border-hover);
        padding: 1.6rem;
        border-radius: 0.8rem;
      }
    }

    > div {
      > section {
        padding: 1.6rem;
      }
    }
  }
}
</style>
