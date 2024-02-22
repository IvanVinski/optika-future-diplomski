<script lang="ts" setup>
import { doc, getDoc } from "firebase/firestore";

const db = useFirestore();
const route = useRoute();
const product = ref<ProductType>();

const docRef = doc(db, "products", String(route.params.id));
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  product.value = docSnap.data() as ProductType;
} else {
  console.log("No such document!");
}

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

const cart = useCartStore();

const size = ref("small");

const $q = useQuasar();

const addToCart = (product: ProductType) => {
  cart.add(product);
  $q.notify({
    message: "Proizvod je dodan u košaricu!",
    color: "green",
  });
};
</script>

<template>
  <div class="tw-bg-white tw-py-6 sm:tw-py-8 lg:tw-py-12">
    <div
      v-if="product"
      class="tw-mx-auto tw-max-w-screen-xl tw-px-4 md:tw-px-8"
    >
      <q-breadcrumbs class="tw-text-base sm:tw-text-lg">
        <q-breadcrumbs-el label="Početna" icon="home" to="/" />
        <q-breadcrumbs-el label="Webshop" to="/products" />
        <q-breadcrumbs-el :label="product.category.label" to="/products" />
        <q-breadcrumbs-el :label="`${product.name}`" />
      </q-breadcrumbs>
      <div class="tw-gap-24 lg:tw-grid lg:tw-grid-cols-2">
        <!-- images - start -->
        <div class="tw-mb-6">
          <Swiper
            :style="{
              '--swiper-navigation-color': '#224B8D',
              '--swiper-pagination-color': '#224B8D',
            }"
            :slides-per-view="1"
            :modules="[SwiperThumbs, SwiperNavigation]"
            :loop="true"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
          >
            <SwiperSlide v-for="image in product.images" :key="image">
              <img
                :src="image"
                class="tw-h-auto tw-w-full"
                alt="Slika naočala"
              />
            </SwiperSlide>
          </Swiper>
          <Swiper
            v-show="thumbsSwiper"
            :loop="true"
            :space-between="20"
            :slides-per-view="4"
            :watch-slides-progress="true"
            :center-insufficient-slides="true"
            :modules="[SwiperThumbs, SwiperNavigation]"
            class="mySwiper"
            @swiper="setThumbsSwiper"
          >
            <SwiperSlide v-for="image in product.images" :key="image">
              <img :src="image" alt="Slika naočala" class="tw-cursor-pointer" />
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- images - end -->

        <!-- content - start -->
        <div class="md:tw-py-8">
          <!-- name - start -->
          <div class="tw-mb-2 md:tw-mb-3">
            <span class="tw-mb-0.5 tw-inline-block tw-text-gray-500">{{
              product.model
            }}</span>
            <h2
              class="tw-text-2xl tw-font-bold tw-text-gray-800 lg:tw-text-3xl"
            >
              {{ product.brand }}
            </h2>
          </div>
          <!-- name - end -->

          <!-- description - start -->

          <div class="tw-mb-4 md:tw-mb-6">
            <!-- eslint-disable vue/no-v-html -->
            <span
              class="tw-mb-3 tw-inline-block tw-text-base tw-font-medium tw-text-gray-500 md:tw-text-lg"
              v-html="product.description"
            ></span>
            <!-- eslint-enable -->
          </div>

          <!-- description - end -->

          <!-- color - start -->
          <div class="tw-mb-4 md:tw-mb-6">
            <span
              class="tw-mb-3 tw-inline-block tw-text-sm tw-font-semibold tw-text-gray-500 md:tw-text-base"
              >Boja</span
            >

            <div class="tw-flex tw-flex-wrap tw-gap-2">
              <span
                class="tw-h-8 tw-w-8 tw-rounded-full tw-border tw-bg-gray-800 tw-ring-2 tw-ring-gray-800 tw-ring-offset-1 tw-transition tw-duration-100"
              ></span>

              <button
                type="button"
                class="tw-h-8 tw-w-8 tw-rounded-full tw-border tw-bg-gray-200 tw-ring-2 tw-ring-transparent tw-ring-offset-1 tw-transition tw-duration-100 hover:tw-ring-gray-200"
              ></button>
            </div>
          </div>

          <!-- color - end -->

          <!-- size - start -->
          <div class="tw-mb-8 md:tw-mb-10">
            <span
              class="tw-mb-3 tw-inline-block tw-text-sm tw-font-semibold tw-text-gray-500 md:tw-text-base"
              >Veličina</span
            >

            <div class="tw-flex tw-flex-wrap tw-gap-3">
              <q-btn-toggle
                v-model="size"
                toggle-color="primary"
                padding="6px 20px"
                :options="[
                  { label: 'S', value: 'small' },
                  { label: 'M', value: 'medium' },
                  { label: 'L', value: 'large' },
                ]"
              />
            </div>
          </div>

          <!-- size - end -->

          <!-- price - start -->
          <div class="tw-mb-4">
            <div class="tw-flex tw-items-end tw-gap-2">
              <span
                class="tw-text-xl tw-font-bold tw-text-gray-800 md:tw-text-2xl"
              >
                {{ product.finalPrice }} €
              </span>
              <span
                v-if="product.discount > 0"
                class="tw-mb-0.5 tw-text-red-500 tw-line-through"
              >
                {{ product.price }} €
              </span>
            </div>
          </div>

          <!-- price - end -->

          <!-- shipping notice - start -->
          <div
            class="tw-mb-6 tw-flex tw-items-center tw-gap-2 tw-text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="tw-h-6 tw-w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>

            <span class="tw-text-sm">1-3 radna dana</span>
          </div>
          <!-- shipping notice - end -->

          <q-btn
            no-caps
            size="18px"
            label="Dodaj u košaricu"
            color="primary"
            @click="addToCart(product)"
          />
        </div>
        <!-- content - end -->
      </div>
    </div>
    <div
      v-else
      class="tw-mx-auto tw-mt-20 tw-max-w-screen-xl tw-items-center tw-px-4 tw-text-center"
    >
      <h1
        class="tw-mb-12 tw-text-2xl tw-font-bold tw-text-gray-800 lg:tw-text-3xl"
      >
        Ovaj proizvod ne postoji ili je rasprodan.
      </h1>
      <q-btn
        no-caps
        color="primary"
        label="Povratak na proizvode"
        to="/products"
      />
    </div>
  </div>
</template>

<style>
.mySwiper .swiper-slide {
  opacity: 0.5;
}
.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
