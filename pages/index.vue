<script lang="ts" setup>
const about = useAboutStore();
const products = useProductsStore();

const getFeaturedDioptrics = computed(() => {
  return products.products.filter(
    (product) =>
      product.featured === true && product.category.value === "dioptric",
  );
});

const getFeaturedSunglasses = computed(() => {
  return products.products.filter(
    (product) =>
      product.featured === true && product.category.value === "sunglasses",
  );
});
</script>

<template>
  <div>
    <SectionHero />

    <SectionOffers
      id="frames"
      :products="getFeaturedDioptrics"
      title="Dioptijski okviri"
    />

    <SectionAboutUs :about="about.data" />

    <SectionOffers
      id="sunglasses"
      :products="getFeaturedSunglasses"
      title="Sunčane naočale"
    />

    <SectionContactUs />

    <SectionNews />

    <!-- <ClientOnly>
      <SectionReviews />
    </ClientOnly> -->

    <ClientOnly>
      <SectionLocations />
    </ClientOnly>
  </div>
</template>
