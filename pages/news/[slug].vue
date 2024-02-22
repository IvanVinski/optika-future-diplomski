<script lang="ts" setup>
const blog = useBlogStore();

const route = useRoute();

const post = blog.blog.find((b) => b.slug === route.params.slug);
</script>

<template>
  <div v-if="post" class="tw-p-6 md:tw-p-12 lg:tw-px-24 lg:tw-pb-24">
    <div class="tw-mx-auto tw-grid tw-max-w-6xl tw-gap-12">
      <q-breadcrumbs class="tw-text-lg">
        <q-breadcrumbs-el label="Početna" icon="home" to="/" />
        <q-breadcrumbs-el label="Novosti" to="/news" />
        <q-breadcrumbs-el :label="post.title" />
      </q-breadcrumbs>

      <div>
        <q-img :src="post.image" :ratio="16 / 9" class="tw-rounded-xl" />

        <div class="tw-mt-4 tw-text-lg">{{ toLocalDate(post.createdAt) }}</div>
      </div>
      <h1 class="tw-text-5xl tw-font-medium">{{ post.title }}</h1>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="tw-text-base md:tw-text-lg" v-html="post.content"></div>

      <div>
        <h6>Tagovi</h6>
        <template v-for="(tag, index) in post.tags.split(',')" :key="index">
          <q-chip :label="tag" />
        </template>
      </div>
    </div>
  </div>
</template>
