<script lang="ts" setup>
defineProps<{
  product: ProductType;
}>();
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`">
    <q-card
      flat
      bordered
      class="tw-group tw-flex tw-h-full tw-cursor-pointer tw-flex-col tw-overflow-hidden tw-duration-300"
    >
      <q-img
        :src="product.images[0]"
        fit="contain"
        :ratio="16 / 9"
        class="tw-transition group-hover:tw-scale-105"
      />

      <q-card-section class="tw-flex tw-grow tw-flex-col tw-justify-between">
        <div class="text-center">
          <div class="text-caption text-grey-9">
            {{ product.model }}
          </div>
          <h3
            class="tw-text-lg tw-font-medium group-hover:tw-text-primary sm:tw-text-xl md:tw-text-2xl"
          >
            {{ product.brand }}
          </h3>
        </div>

        <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-2">
          <div
            class="tw-text-2xl md:tw-text-3xl"
            :class="{ 'text-red': product.discount > 0 }"
          >
            {{ product.finalPrice }} €
          </div>

          <div
            v-if="product.discount > 0"
            class="tw-flex tw-flex-wrap tw-items-center tw-gap-x-2.5"
          >
            <span class="text-grey-7 tw-text-base tw-line-through">
              {{ product.price }} €
            </span>
            <span
              class="bg-red text-white tw-rounded-xl tw-px-2.5 tw-py-0.5 tw-text-sm"
            >
              -{{ product.discount }} %
            </span>
          </div>
        </div>
      </q-card-section>

      <div
        v-if="product.tags.length > 0"
        class="text-white tw-absolute tw-right-3 tw-top-0 tw-flex tw-gap-1 tw-opacity-90"
      >
        <div
          v-for="tag in product.tags"
          :key="tag.value"
          class="tw-rounded-b-xl tw-px-2.5 tw-py-0.5"
          :class="{
            'bg-red': tag.value === 'sale',
            'bg-primary': tag.value === 'new',
            'bg-green': tag.value === 'trending',
            'bg-orange': tag.value === 'promotion',
          }"
        >
          {{ tag.label }}
        </div>
      </div>
    </q-card>
  </NuxtLink>
</template>
