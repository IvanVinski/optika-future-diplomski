<script lang="ts" setup>
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

const step = ref(1);
const pickedAddress = ref();
const isLoading = ref(false);

const title = ["Košarica", "Odabir adrese"];

const user = useUserStore();
const cart = useCartStore();
const db = useFirestore();

const handlePayment = async () => {
  if (user.data && pickedAddress.value) {
    isLoading.value = true;
    const newOrderRef = doc(collection(db, "orders"));
    const userRef = doc(db, "users", user.data.uid);

    const order = {
      id: newOrderRef.id,
      items: cart.items,
      total: cart.totalPrice,
      quantity: cart.itemsInCart,
      address: pickedAddress.value,
      user: userRef,
      date: Timestamp.now(),
      status: "U obradi",
    };
    await setDoc(newOrderRef, order);
    user.fetchOrders();
    cart.empty();
    await navigateTo("/account/orders");

    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="tw-mx-auto tw-max-w-md tw-px-6 tw-py-12 sm:tw-max-w-xl lg:tw-max-w-3xl"
  >
    <h1
      class="tw-mb-12 tw-text-4xl tw-font-medium tw-text-gray-800 md:tw-text-5xl"
    >
      {{ title[step - 1] }}
    </h1>

    <div v-if="step === 1">
      <ol v-if="cart.items.length">
        <li v-for="item in cart.items" :key="item.id" class="tw-font-semibold">
          <div class="tw-grid tw-grid-cols-3 tw-gap-x-6 sm:tw-gap-x-12">
            <q-img fit="contain" :src="item.images[0]" :alt="item.model" />

            <div class="tw-col-span-2 tw-flex">
              <div class="tw-grow">
                <h6 class="tw-text-sm tw-text-gray-500 sm:tw-text-lg">
                  {{ item.model }}
                </h6>
                <h5
                  class="tw-text-base tw-font-medium sm:tw-text-xl lg:tw-text-2xl"
                >
                  {{ item.brand }}
                </h5>
              </div>

              <div>
                <q-btn
                  flat
                  size="sm"
                  padding="0"
                  icon="fa-regular fa-trash-can"
                  class="!tw-text-gray-500"
                  @click="cart.deleteItem(item.id)"
                />
              </div>
            </div>

            <div
              class="tw-col-span-3 tw-grid tw-grid-cols-3 tw-items-center sm:tw-gap-x-12 sm:tw-text-xl lg:tw-text-2xl"
            >
              <div class="tw-text-center tw-font-medium tw-text-gray-500">
                {{ Number(item.finalPrice).toFixed(2) }} €
              </div>
              <div class="tw-flex tw-items-center tw-gap-2">
                <q-btn
                  dense
                  size="md"
                  flat
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

              <div class="tw-text-right">{{ item.sumPrice.toFixed(2) }} €</div>
            </div>
          </div>

          <q-separator class="!tw-my-6" />
        </li>
        <li
          class="tw-text-right tw-text-xl tw-font-semibold sm:tw-text-2xl lg:tw-text-3xl"
        >
          Ukupno:
          <span class="tw-ml-6">
            {{ Number(cart.totalPrice).toFixed(2) }} €
          </span>
        </li>

        <q-btn
          no-caps
          :disable="!user.data"
          color="primary"
          label="Nastavi"
          @click="step++"
        />
        <div v-if="!user.data" class="tw-mt-4 tw-font-medium tw-text-red-600">
          <NuxtLink to="/login" class="tw-underline">Prijavite se</NuxtLink>
          kako biste nastavili kupnju
        </div>
      </ol>
      <div v-else>Vaša košarica je prazna.</div>
    </div>
    <div v-if="step === 2">
      <q-list v-if="user?.data">
        <template v-for="(address, index) in user.data?.addresses" :key="index">
          <q-item v-ripple tag="label">
            <q-item-section avatar>
              <q-radio v-model="pickedAddress" :val="address" />
            </q-item-section>
            <q-item-section class="tw-font-medium md:tw-text-xl">
              <q-item-label>Ime i prezime: {{ user.data.name }}</q-item-label>
              <q-item-label>
                Adresa: {{ address.address }}, {{ address.postalCode }}
                {{ address.city }}
              </q-item-label>
              <q-item-label>Država: {{ address.country }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item class="tw-mt-4">
          <q-btn
            no-caps
            color="primary"
            size="md"
            icon="add"
            label="Dodaj novu adresu"
            to="/account/address"
          />
        </q-item>
      </q-list>

      <div class="tw-mt-12 tw-space-x-6">
        <q-btn
          no-caps
          flat
          label="Nazad"
          :disable="isLoading"
          @click="step--"
        />
        <q-btn
          color="primary"
          label="Plati"
          :loading="isLoading"
          :disable="!pickedAddress"
          @click="handlePayment"
        />
      </div>
    </div>
  </div>
</template>
