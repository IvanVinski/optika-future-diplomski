<script lang="ts" setup>
import { signOut } from "firebase/auth";

const user = useCurrentUser();

const props = defineProps<{
  homepage?: boolean;
  isDrawerOpen: boolean;
}>();

watch(
  () => props.isDrawerOpen,
  () => {
    if (!props.isDrawerOpen) lastScrollPosition.value = 0;
  },
);

const emit = defineEmits<{
  toggleRightDrawer: [];
}>();

const scrollPosition = ref(0);

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

const getLogo = computed(() => {
  return !props.homepage ||
    scrollPosition.value > 60 ||
    (props.isDrawerOpen && lastScrollPosition.value > 60)
    ? "/logos/logo-dark.svg"
    : "/logos/logo-light.svg";
});

const auth = useFirebaseAuth()!;

const handleSignOut = () => {
  signOut(auth).then(() => {
    navigateTo("/");
  });
};

const lastScrollPosition = ref(0);

const handleToggle = () => {
  lastScrollPosition.value = scrollPosition.value;
  emit("toggleRightDrawer");
};

const cart = useCartStore();
</script>

<template>
  <q-toolbar
    class="tw-text-white tw-transition tw-duration-300 xl:!tw-px-24"
    :class="[
      !homepage ||
      scrollPosition > 60 ||
      (isDrawerOpen && lastScrollPosition > 60)
        ? 'tw-bg-white/80 !tw-text-black tw-shadow tw-backdrop-blur-md'
        : '',
    ]"
  >
    <q-btn flat to="/" class="tw-my-2" size="lg">
      <img :src="getLogo" class="tw-h-10" alt="Optika Future Logo" />
    </q-btn>

    <q-space />

    <div v-if="$q.screen.gt.sm">
      <q-btn-dropdown flat no-caps size="16px" label="Webshop">
        <q-list class="tw-font-semibold">
          <q-item
            v-close-popup
            clickable
            active-class=""
            to="/products?category=dioptric"
          >
            <q-item-section>
              <q-item-label>Dioptrijski okviri</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-close-popup
            clickable
            active-class=""
            to="/products?category=sunglasses"
          >
            <q-item-section>
              <q-item-label>Sunčane naočale</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-close-popup
            clickable
            active-class=""
            to="/products?category=lenses"
          >
            <q-item-section>
              <q-item-label>Leće</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn flat no-caps size="16px" label="Novosti" to="/news" />

      <q-btn flat no-caps size="16px" label="O nama" to="/#o-nama" class="" />

      <q-btn flat no-caps size="16px" label="Kontakt" to="/#kontakt" />
    </div>

    <q-space />

    <div>
      <q-btn flat round icon="person">
        <q-menu v-if="!user">
          <q-list dense class="tw-font-bold">
            <q-item v-close-popup clickable to="/login">
              <q-item-section avatar>
                <q-avatar size="xl" icon="login" />
              </q-item-section>
              <q-item-section>Prijava</q-item-section>
            </q-item>

            <q-item v-close-popup clickable to="/register">
              <q-item-section avatar>
                <q-avatar size="xl" icon="person_add" />
              </q-item-section>
              <q-item-section>Registracija</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-menu v-else>
          <q-list dense class="tw-font-bold">
            <q-item v-close-popup clickable to="/account">
              <q-item-section avatar>
                <q-avatar size="xl" icon="account_box" />
              </q-item-section>
              <q-item-section>Moj račun</q-item-section>
            </q-item>

            <q-item v-close-popup clickable @click="handleSignOut">
              <q-item-section avatar>
                <q-avatar size="xl" icon="logout" />
              </q-item-section>
              <q-item-section>Odjava</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn flat round icon="shopping_cart">
        <q-badge color="primary" text-color="white" floating>
          {{ cart.itemsInCart }}
        </q-badge>
        <q-menu class="!tw-max-w-sm">
          <q-list class="tw-font-medium">
            <q-item v-for="item in cart.items" :key="item.id">
              <q-item-section avatar>
                <q-avatar rounded>
                  <img
                    :src="item.images[0]"
                    :alt="item.model"
                    class="tw-object-contain"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label
                  class="tw-overflow-hidden tw-text-ellipsis tw-text-nowrap"
                >
                  <span class="tw-mr-1.5 tw-font-bold tw-text-primary">
                    {{ item.name }}
                  </span>
                  <span class="tw-text-sm tw-text-gray-500">
                    {{ item.model }}
                  </span>
                </q-item-label>
                <q-item-label
                  class="tw-flex tw-items-center tw-justify-between tw-gap-6 tw-font-bold"
                >
                  <div class="tw-flex tw-items-center tw-gap-2">
                    <q-btn
                      dense
                      flat
                      size="md"
                      icon="remove"
                      @click="cart.remove(item.id)"
                    />
                    <span class="tw-text-black">{{ item.quantity }}</span>
                    <q-btn
                      dense
                      flat
                      size="md"
                      icon="add"
                      :disable="item.quantity >= 10"
                      @click="cart.add(item)"
                    />
                  </div>

                  {{ item.sumPrice.toFixed(2) }} €
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-btn
                  round
                  flat
                  size="10px"
                  icon="fa-regular fa-trash-can"
                  @click="cart.deleteItem(item.id)"
                />
              </q-item-section>
            </q-item>

            <q-item v-if="!cart.items.length">
              <q-item-section>Vaša košarica je prazna!</q-item-section>
            </q-item>

            <q-separator />

            <q-item>
              <q-item-section avatar> </q-item-section>
              <q-item-section>
                <q-item-label
                  class="tw-flex tw-justify-between tw-gap-4 tw-font-bold"
                >
                  <span> Ukupno: </span>
                  <span>{{ Number(cart.totalPrice).toFixed(2) }} €</span>
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="tw-size-[30px]"></div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-btn
                no-caps
                dense
                color="primary"
                icon-right="navigate_next"
                label="Košarica"
                class="full-width"
                to="/shopping-cart"
              />
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <q-btn
      v-if="$q.screen.lt.md"
      dense
      flat
      round
      icon="menu"
      size="lg"
      @click="handleToggle"
    />
  </q-toolbar>
</template>
