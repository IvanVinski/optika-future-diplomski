<script setup>
const rightDrawerOpen = ref(false);
const leftDrawerOpen = ref(false);
const isAdminLogged = ref(false);

const currentYear = new Date().getFullYear();

const route = useRoute();

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

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
        :is-drawer-open="rightDrawerOpen"
        @toggle-right-drawer="toggleRightDrawer()"
      />
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      elevated
      :width="200"
    >
      <q-toolbar class="!tw-my-2">
        <q-space />
        <q-btn
          dense
          flat
          round
          icon="close"
          size="lg"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
      <q-list padding class="text-center tw-text-xl tw-font-medium">
        <q-expansion-item
          expand-separator
          label="Webshop"
          expand-icon-class="!tw-pl-0"
        >
          <q-list class="tw-text-lg">
            <q-item v-close-popup clickable to="/products">
              <q-item-section>
                <q-item-label>Dioptrijski okviri</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-close-popup clickable to="/products">
              <q-item-section>
                <q-item-label>Sunčane naočale</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-close-popup clickable to="/products">
              <q-item-section>
                <q-item-label>Leće</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item v-ripple clickable to="/news">
          <q-item-section> Novosti </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/#o-nama" :active="false">
          <q-item-section> O nama </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/#kontakt" :active="false">
          <q-item-section> Kontakt </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-if="isAdminLogged"
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="200"
    >
      <q-toolbar class="text-h5 text-weight-medium justify-center q-my-xs">
        <q-btn
          dense
          flat
          round
          icon="close"
          class="lt-md"
          @click="toggleLeftDrawer"
        />
        <q-space class="lt-md" />
        <div>Admin panel</div>
      </q-toolbar>

      <q-separator />

      <q-list padding class="text-h6">
        <q-item v-ripple clickable to="/admin-panel/edit-news" exact>
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section> Članci </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/admin-panel/edit-offers">
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section> Proizvodi </q-item-section>
        </q-item>

        <q-item v-ripple clickable to="/admin-panel/edit-about-us">
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section> O nama </q-item-section>
        </q-item>

        <q-separator />

        <q-item v-ripple clickable @click="logOut()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Odjava </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <q-page-sticky v-if="isHomepage" expand position="top" class="tw-z-20">
          <Navbar
            homepage
            :is-drawer-open="rightDrawerOpen"
            @toggle-right-drawer="toggleRightDrawer()"
          />
        </q-page-sticky>
        <slot />
      </q-page>
    </q-page-container>

    <q-footer
      class="text-[#E9F3F3] !tw-bg-[#224B8D] tw-px-6 md:tw-px-12 lg:tw-px-24"
    >
      <div
        class="tw-flex tw-flex-col tw-justify-between tw-pb-12 tw-pt-16 md:tw-flex-row"
      >
        <img
          src="/logos/logo-light.svg"
          class="tw-mb-8 tw-h-12"
          alt="Optika Future Footer Logo"
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
