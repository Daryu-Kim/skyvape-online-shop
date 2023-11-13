<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <TopBanner/>
    <BasePCHeader/>
    <main>
      <h1 style="font-size: 1.6rem; font-weight: 700; color: white">결제 완료!</h1>
<!--      <h2 style="font-size: 1.2rem; font-weight: 700; color: white"></h2>-->
    </main>
    <BaseFooter/>
    <MenuFAB />
  </div>
</template>

<style lang="scss">
main {

  article {
    margin-top: 3.6rem;

    > section {
      > div {
        margin-top: 1.6rem;
      }

      > p {
        font-weight: 500;
        font-size: 1.2rem;
        color: var(--color-border);
      }

      > h1 {
        font-weight: 700;
        font-size: 2rem;
      }
    }

    &.skyvape-index-category-article {
      margin-top: 0;
      > section {
        > div > .swiper-container {

          .swiper-button-next, .swiper-button-prev {
            width: 3.6rem;
            height: 3.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-background-mute);
            border-radius: 50%;

            &::after {
              font-size: 1.2rem;
              font-weight: 900;
              color: var(--color-accent);
            }
          }

          .swiper-slide {
            width: auto;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .menu-item {
              display: block;
              width: 6.4rem !important;
              height: 6.4rem !important;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border-radius: 50%;
            }

            > p {
              color: var(--color-text);
              font-size: 1.2rem;
              font-weight: 700;
              text-align: center;
              margin-top: 0.8rem;
            }
          }
        }
      }
    }

    &.skyvape-index-popular-tag-article {
      > section {
        > div {
          display: flex;
          gap: 0.8rem;
          align-items: center;
          flex-wrap: wrap;
          > div {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            border-radius: 100rem;
            border: 0.2rem solid var(--color-accent);
            padding: 0.2rem 1.6rem;
            cursor: pointer;

            &:hover {
              background-color: var(--color-accent);
              > p {
                color: black;
              }
            }

            > p {
              font-size: 1.4rem;
              font-weight: 700;
            }
          }
        }
      }
    }

    &.skyvape-index-best5-article {
      > section {
        > div {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          > details {
            border-radius: 0.8rem;
            width: 100%;
            height: auto;
            padding: 1.2rem 2rem;
            border: 0.2rem solid var(--color-border-hover);
            > .title-div {
              display: flex;
              align-items: center;
              gap: 0.8rem;
              font-size: 1.4rem;
              cursor: pointer;
              > .title-index-text {
                font-weight: 700;
                color: var(--color-accent);
              }

              > .title-text {
                font-weight: 500;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 1;
              }
            }

            > .content-div {
              > .border-div {
                border: 0.1rem solid var(--color-border-hover);
                margin: 1.2rem 0;
              }

              > .item-div {
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 1.6rem;
                > .item-thumbnail {
                  aspect-ratio: 1 / 1;
                  width: 9.6rem;
                  border-radius: 0.8rem;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover;
                }

                > .item-info-div {
                  > p {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  }

                  > .product-name-text {
                    font-size: 1.4rem;
                    -webkit-line-clamp: 1;
                  }

                  > .product-tag-text {
                    font-size: 1.2rem;
                    color: var(--color-border-hover);
                    -webkit-line-clamp: 1;
                  }

                  > .product-description-text {
                    font-size: 1.2rem;
                    color: var(--color-accent);
                    word-break: keep-all;
                    -webkit-line-clamp: 2;
                  }

                  > .product-price-text {
                    font-size: 1.6rem;
                    font-weight: 700;
                    -webkit-line-clamp: 1;
                  }
                }
              }
            }

            > summary {
              position: relative;
              list-style: none;
            }

            > summary::-webkit-details-marker {
              display: none;
            }

            > summary .arrow {
              position: absolute;
              right: 0;
              transition: transform 0.3s ease-in-out;
              font-size: 1rem;
            }

            &[open] > summary .arrow {
              transform: rotate(90deg);
            }
          }

        }
      }
    }

    &.skyvape-index-hotdeal-article {
      > section {
        > div > .swiper-container {
          width: 100%;
          .swiper-button-next, .swiper-button-prev {
            width: 3.6rem;
            height: 3.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-background-mute);
            border-radius: 50%;

            &::after {
              font-size: 1.2rem;
              font-weight: 900;
              color: var(--color-accent);
            }
          }

          .swiper-slide {
            width: auto;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--color-background-mute);
            border-radius: 0.8rem;
            padding: 0.8rem;

            .menu-item {
              display: block;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border-radius: 50%;

              > .product-thumbnail {
                aspect-ratio: 1 / 1;
                width: 16rem;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                border-radius: 0.8rem;
              }

              > .product-info {

              }
            }

            > p {
              color: var(--color-text);
              font-size: 1.2rem;
              font-weight: 700;
              text-align: center;
              margin-top: 0.8rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  main {
    width: 100%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  main {
    max-width: 56rem;
  }
}

@media screen and (min-width: 1024px) {
  main {
    max-width: 72rem;
  }
}
</style>
