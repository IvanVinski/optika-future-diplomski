<script lang="ts" setup>
const blog = useBlogStore();

const getBlogs = computed(() => {
  return blog.blog.filter((b) => b.featured === true && b.published === true);
});

onMounted(async () => {});

const settings = {
  modules: [SwiperPagination],
  pagination: {
    el: ".news__pagination",
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 24,
  centerInsufficientSlides: true,
};
const breakpoints = {
  "640": {
    slidesPerView: 2,
    spaceBetween: 24,
  },
  "768": {
    slidesPerView: 2,
    spaceBetween: 48,
  },
  "1024": {
    slidesPerView: 3,
    spaceBetween: 48,
  },
  "1280": {
    slidesPerView: 3,
    spaceBetween: 80,
  },
  "1535": {
    slidesPerView: 4,
  },
};

const swiperRef = ref();
const getRef = (swiper: any) => {
  swiperRef.value = swiper;
};
</script>

<template>
  <section
    class="tw-mx-auto tw-my-24 tw-max-w-7xl md:tw-my-36 lg:tw-my-48 2xl:tw-max-w-[1500px]"
  >
    <div
      class="tw-mx-6 tw-flex tw-items-center tw-gap-4 sm:tw-mx-12 md:tw-mb-6 lg:tw-mb-16 lg:tw-gap-6"
    >
      <q-icon
        name="fa-solid fa-circle"
        color="primary"
        class="md:!tw-text-lg lg:!tw-text-2xl"
      />

      <h1 class="tw-text-3xl tw-font-medium md:tw-text-4xl lg:tw-text-5xl">
        Novosti
      </h1>

      <q-space class="max-sm:!tw-hidden" />

      <q-btn
        no-caps
        outline
        color="primary"
        label="Istraži više"
        to="/news"
        class="max-md:!tw-text-sm max-sm:!tw-hidden"
      />
    </div>

    <div class="tw-min-h-[410px] 2xl:tw-min-h-[480px]">
      <Swiper
        v-bind="settings"
        :breakpoints="breakpoints"
        class="!tw-p-6 md:!tw-mx-12"
        @swiper="getRef"
      >
        <SwiperSlide
          v-for="article in getBlogs"
          :key="article.title"
          class="!tw-h-auto"
        >
          <CardsPost
            :title="article.title"
            :slug="article.slug"
            :text="article.summary"
            :image="article.image"
            :date="article.createdAt"
            :tags="article.tags"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <div
      class="tw-mx-8 tw-grid tw-grid-cols-2 sm:tw-mx-12 md:tw-grid-cols-3 lg:tw-mt-6"
    >
      <div class="tw-self-center md:tw-col-start-2 md:tw-justify-self-center">
        <div class="news__pagination"></div>
      </div>

      <q-btn-group flat class="tw-justify-self-end">
        <q-btn
          outline
          size="md"
          padding="sm"
          color="primary"
          icon="navigate_before"
          :disable="swiperRef?.isBeginning"
          @click="swiperRef?.slidePrev()"
        />
        <q-btn
          outline
          size="md"
          padding="sm"
          color="primary"
          icon="navigate_next"
          :disable="swiperRef?.isEnd"
          @click="swiperRef?.slideNext()"
        />
      </q-btn-group>
    </div>
  </section>
</template>
