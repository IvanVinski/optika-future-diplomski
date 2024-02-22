<script lang="ts" setup>
const features = [
  {
    title: "Stručna dijagnostika",
    description:
      "Iskoristite naše iskustvo i profesionalne uređaje za točnu procjenu vašeg vida.",
    image: "/images/eye-check.jpg",
  },
  {
    title: "Personalizirani savjeti",
    description:
      "Dobit ćete personalizirane preporuke za vaš vizualni komfor i zdravlje očiju.",
    image: "/images/expert-explaining.jpg",
  },
  {
    title: "Najnovija tehnologija",
    description:
      "Koristimo samo najmodernije metode i uređaje za pregled vašeg vida.",
    image: "/images/optometry.jpg",
  },
  {
    title: "Bez obaveza",
    description:
      "Naš besplatni pregled vida nudi vam uvid u vaše trenutno stanje vida bez ikakvih obaveza.",
    image: "/images/happy-customer.jpg",
  },
];

const settings = {
  modules: [SwiperNavigation, SwiperPagination],
  pagination: {
    el: ".features__pagination",
    clickable: true,
  },
  navigation: true,
  touchEventsTarget: "container",
  slidesPerView: 1,
  spaceBetween: 48,
};

const breakpoints = {
  "640": {
    slidesPerView: 2,
  },
  "1024": {
    slidesPerView: 3,
  },
  "1280": {
    slidesPerView: 4,
  },
};
</script>

<template>
  <section
    class="tw-mx-auto tw-max-w-[1400px] md:tw-mb-24 lg:tw-mb-48 xl:tw-px-24"
  >
    <h1
      class="tw-mb-12 tw-px-6 tw-text-3xl tw-font-bold md:tw-text-4xl lg:tw-mb-24 lg:tw-px-12 xl:tw-px-0 xl:tw-text-5xl"
    >
      Zašto rezervirati besplatan pregled?
    </h1>

    <Swiper
      v-bind="settings"
      :breakpoints="breakpoints"
      class="!tw-px-6 lg:!tw-px-12 xl:!tw-px-0"
    >
      <SwiperSlide
        v-for="feature in features"
        :key="feature.title"
        class="!tw-h-auto"
      >
        <div
          class="tw-mx-auto tw-flex tw-h-full tw-max-w-sm tw-flex-col tw-justify-between"
        >
          <div>
            <h4 class="tw-flex tw-text-2xl tw-font-bold md:tw-text-3xl">
              <span>{{ feature.title }}</span>
            </h4>
            <p class="tw-my-6 tw-text-balance tw-text-base">
              {{ feature.description }}
            </p>
          </div>
          <div class="tw-px-">
            <q-img :src="feature.image" :ratio="4 / 3" class="tw-rounded-xl" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="features__pagination tw-mt-4 tw-text-center"></div>
  </section>
</template>
