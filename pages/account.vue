<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const user = useUserStore();
await user.fetch();
</script>

<template>
  <div class="tw-mx-auto tw-max-w-7xl tw-overflow-hidden tw-py-12">
    <div class="tw-px-6">
      <div
        class="tw-mb-12 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-y-4"
      >
        <h2 class="tw-text-4xl tw-font-medium">Moj račun</h2>
        <q-btn
          v-if="user.data?.role === 'admin'"
          no-caps
          color="primary"
          label="Admin dashboard"
          to="/admin"
        />
      </div>

      <div class="tw-flex tw-flex-col tw-gap-6 lg:tw-flex-row lg:tw-gap-12">
        <div class="tw-min-w-60">
          <q-list
            bordered
            padding
            class="tw-rounded-xl tw-text-lg tw-font-medium"
          >
            <q-item v-ripple clickable to="/account" exact>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>Moji podaci</q-item-section>
            </q-item>

            <q-item v-ripple clickable to="/account/address">
              <q-item-section avatar>
                <q-icon name="location_on" />
              </q-item-section>

              <q-item-section>Moje adrese</q-item-section>
            </q-item>

            <q-item v-ripple clickable to="/account/orders">
              <q-item-section avatar>
                <q-icon name="bookmark" />
              </q-item-section>

              <q-item-section>Moje narudžbe</q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item v-ripple clickable to="/account/settings">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>Postavke</q-item-section>
            </q-item>
          </q-list>
        </div>

        <NuxtPage />
      </div>
    </div>
  </div>
</template>
