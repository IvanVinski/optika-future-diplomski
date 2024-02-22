<script lang="ts" setup>
const branch = useBranchStore();
const product = useProductsStore();
const about = useAboutStore();
const blog = useBlogStore();

await callOnce(branch.fetchBranches);
await callOnce(product.fetchProducts);
await callOnce(blog.fetchBlog);
await callOnce(about.fetch);
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
