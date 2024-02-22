<script lang="ts" setup>
useSeoMeta({
  title: "Optika Future | Novosti",
});

const blog = useBlogStore();

const getBlogs = computed(() => {
  return blog.blog.filter((b) => b.published === true);
});
</script>

<template>
  <div class="tw-px-6">
    <div class="tw-mt-12 tw-text-center">
      <h3 class="tw-pb-6 tw-text-4xl tw-font-medium md:tw-text-5xl">
        Novosti i zanimljivosti
      </h3>
    </div>

    <div class="tw-mx-auto tw-my-12 tw-grid tw-max-w-md md:tw-max-w-7xl">
      <div v-for="post in getBlogs" :key="post.title">
        <div class="tw-grid tw-gap-12 md:tw-grid-cols-3">
          <q-img
            v-if="post.image"
            :src="post.image"
            class="tw-rounded-xl tw-duration-300 group-hover:tw-scale-105"
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
              class="text-white flex flex-center tw-rounded-xl tw-bg-gray-300 tw-duration-300 group-hover:tw-scale-105"
            >
              <q-icon name="fa-regular fa-image" size="100px" />
            </div>
          </q-responsive>

          <div class="tw-grid md:tw-col-span-2">
            <div class="tw-mb-2 tw-text-base">
              {{ toLocalDate(post.createdAt) }}
            </div>
            <h2 class="tw-mb-6 tw-text-3xl tw-font-bold lg:tw-text-4xl">
              {{ post.title }}
            </h2>
            <p
              class="tw-line-clamp-6 tw-text-justify tw-text-base md:tw-line-clamp-3 lg:tw-line-clamp-5 lg:tw-text-lg xl:tw-line-clamp-none"
            >
              {{ post.summary }}
            </p>
            <div class="tw-flex tw-flex-wrap tw-justify-between tw-gap-2">
              <div>
                <template
                  v-for="(tag, index) in post.tags.split(',')"
                  :key="index"
                >
                  <q-chip :label="tag" />
                </template>
              </div>

              <div class="tw-grow tw-text-right">
                <q-btn
                  no-caps
                  flat
                  label="Čitaj više"
                  class="!tw-font-bold"
                  icon-right="chevron_right"
                  color="primary"
                  :to="`/news/${post.slug}`"
                />
              </div>
            </div>
          </div>
        </div>
        <q-separator class="!tw-my-12" />
      </div>
    </div>
  </div>
</template>
