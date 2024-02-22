<script lang="ts" setup>
useSeoMeta({
  title: "Optika Future | Moje narudžbe",
});

const user = useUserStore();
</script>

<template>
  <q-card flat bordered class="tw-w-full tw-p-6 md:tw-p-12">
    <h4 class="tw-mb-12 tw-text-3xl tw-font-medium">Moje narudžbe</h4>

    <div v-if="user.data && user.data.orders">
      <q-list>
        <q-item class="tw-font-semibold">
          <q-item-section>Broj narudžbe</q-item-section>
          <q-item-section>Datum</q-item-section>
          <q-item-section>Status</q-item-section>
          <q-item-section>Ukupan iznos</q-item-section>
          <q-item-section side>Akcije</q-item-section>
        </q-item>
        <q-item v-for="order in user.data.orders" :key="order.id">
          <q-item-section>{{ order.id }}</q-item-section>
          <q-item-section>{{ order.date }}</q-item-section>
          <q-item-section>{{ order.status }}</q-item-section>
          <q-item-section>{{ order.total }}</q-item-section>
          <q-item-section side>
            <q-btn dense flat icon="visibility" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-else>Niste obavili niti jednu narudžbu.</div>
  </q-card>
</template>
