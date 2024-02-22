<script lang="ts" setup>
defineProps<{
  title: string;
  slug: string;
  text: string;
  image: string;
  date: any;
  tags: string;
}>();
</script>

<template>
  <NuxtLink :to="`/news/${slug}`">
    <q-card
      flat
      class="tw-group tw-mx-auto tw-h-full tw-max-w-md tw-cursor-pointer hover:tw-shadow"
    >
      <div class="tw-overflow-hidden">
        <q-img
          v-if="image"
          :src="image"
          :ratio="4 / 3"
          class="tw-duration-300 group-hover:tw-scale-105"
        >
          <template #error>
            <div
              class="absolute-full text-white flex flex-center !tw-bg-gray-300"
            >
              <q-icon name="fa-regular fa-image" size="100px" />
            </div>
          </template>
        </q-img>
        <q-responsive v-else :ratio="4 / 3">
          <div
            class="text-white flex flex-center tw-bg-gray-300 tw-duration-300 group-hover:tw-scale-105"
          >
            <q-icon name="fa-regular fa-image" size="100px" />
          </div>
        </q-responsive>
      </div>

      <q-card-section class="!tw-px-0">
        <div class="tw-text-gray-600">
          {{ toLocalDate(date) }}
        </div>

        <h4
          class="tw-my-2 tw-line-clamp-2 tw-text-2xl tw-font-medium group-hover:tw-text-primary"
        >
          {{ title }}
        </h4>

        <p
          class="tw-mb-2 tw-mt-1 tw-line-clamp-4 tw-text-justify tw-text-base tw-text-gray-600"
        >
          {{ text }}
        </p>

        <div>
          <template v-for="(tag, index) in tags.split(',')" :key="index">
            <q-chip dense :label="tag" />
          </template>
        </div>
      </q-card-section>
    </q-card>
  </NuxtLink>
</template>
