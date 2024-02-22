<script setup lang="ts">
defineProps<{
  about: About;
}>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section
    id="o-nama"
    class="tw-bg-primary tw-px-6 tw-py-12 tw-text-white tw-transition-all sm:tw-p-24 xl:tw-py-36"
  >
    <div
      class="tw-mx-auto tw-grid tw-max-w-7xl tw-items-center tw-gap-12 sm:tw-gap-24 lg:tw-grid-cols-2"
    >
      <div class="tw-mx-auto tw-w-full tw-max-w-md lg:tw-max-w-xl">
        <q-img :src="about.image" class="tw-rounded-xl" alt="About Us Image" />
      </div>

      <div>
        <h1 class="tw-mb-6 tw-text-5xl tw-font-bold md:tw-text-6xl">
          {{ about.title }}
        </h1>
        <div class="tw-text-lg md:tw-text-xl" v-html="about.content"></div>
      </div>
    </div>
  </section>
</template>
