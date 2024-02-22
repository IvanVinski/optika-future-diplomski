<script setup>
const leftDrawerOpen = ref(false);

const currentYear = new Date().getFullYear();

const route = useRoute();

// function toggleRightDrawer() {
//   document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";

//   leftDrawerOpen.value = !leftDrawerOpen.value;

//   setTimeout(() => {
//     document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
//   }, 50);
// }

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const isHomepage = computed(() => {
  return route.name === "index";
});
</script>

<template>
  <q-layout view="hHh Lpr ffr">
    <q-header v-if="!isHomepage" class="bg-transparent">
      <Navbar
        :is-drawer-open="leftDrawerOpen"
        @toggle-right-drawer="toggleLeftDrawer()"
      />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      bordered
      :width="220"
    >
      <q-list padding class="tw-text-xl tw-font-semibold">
        <q-item v-ripple clickable to="/admin" exact>
          <q-item-section avatar>
            <q-icon name="fa-regular fa-file-lines" />
          </q-item-section>
          <q-item-section> Općenito </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/admin/branches">
          <q-item-section avatar>
            <q-icon name="location_on" />
          </q-item-section>
          <q-item-section> Poslovnice </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/admin/products">
          <q-item-section avatar>
            <q-icon name="o_inventory_2" />
          </q-item-section>
          <q-item-section> Proizvodi </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/admin/blog">
          <q-item-section avatar>
            <q-icon name="fa-regular fa-newspaper" />
          </q-item-section>
          <q-item-section> Blog </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <slot />
      </q-page>
    </q-page-container>

    <q-footer
      v-if="false"
      class="text-[#E9F3F3] !tw-bg-[#224B8D] tw-px-6 md:tw-px-12 lg:tw-px-24"
    >
      <div class="tw-pb-12 tw-pt-16">
        <img
          src="/logos/logo-light.svg"
          class="tw-mx-auto tw-mb-8 tw-h-12"
          alt="Logo"
        />
        <div class="tw-text-center">
          <q-btn
            flat
            no-caps
            label="O nama"
            to="/#o-nama"
            class="max-sm:!tw-px-3"
          />
          <q-btn
            flat
            no-caps
            label="Novosti"
            to="/news"
            class="max-sm:!tw-px-3"
          />
          <q-btn
            flat
            no-caps
            label="Ponuda"
            to="/products"
            class="max-sm:!tw-px-3"
          />
          <q-btn
            flat
            no-caps
            label="Kontakt"
            to="/#kontakt"
            class="max-sm:!tw-px-3"
          />
        </div>
      </div>

      <q-separator color="white" />

      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-y-4 tw-py-5 sm:tw-flex-row-reverse"
      >
        <div>
          <q-btn
            flat
            round
            icon="fa-brands fa-x-twitter"
            href="https://www.facebook.com"
            target="_blank"
            size="md"
          />
          <q-btn
            flat
            round
            icon="fa-brands fa-facebook"
            href="https://www.twitter.com"
            target="_blank"
            size="md"
          />
          <q-btn
            flat
            round
            icon="fa-brands fa-instagram"
            href="https://www.instagram.com"
            target="_blank"
            size="md"
          />
        </div>

        <div>Sva prava pridržana © {{ currentYear }}. Optika Future</div>
      </div>
    </q-footer>
  </q-layout>
</template>
