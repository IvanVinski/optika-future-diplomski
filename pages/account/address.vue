<script lang="ts" setup>
useSeoMeta({
  title: "Optika Future | Moje adrese",
});
const user = useUserStore();

const addresses = computed(() => {
  return user.data?.addresses ?? [];
});

const dialog = ref(false);
const isLoading = ref(false);
const dialogTitle = ref("Nova adresa");

const editingAddress = ref();
function getEmptyAddress() {
  return {
    city: "",
    country: "",
    address: "",
    postalCode: "",
  };
}

const currentIndex = ref();
function openAddEditDialog(currentAddress?: any, index?: number) {
  editingAddress.value = getEmptyAddress();
  dialogTitle.value = "Nova adresa";

  if (currentAddress) {
    editingAddress.value = currentAddress;
    currentIndex.value = index;
    dialogTitle.value = "Uredi adresu";
  }

  dialog.value = true;
}

async function addUpdateAddress() {
  isLoading.value = true;

  const oldAddresses = user.data?.addresses ?? [];

  if (currentIndex.value !== null && currentIndex.value !== undefined) {
    oldAddresses[currentIndex.value] = editingAddress.value;
  } else {
    oldAddresses.push(editingAddress.value);
  }

  await user.update({
    addresses: oldAddresses,
  });

  isLoading.value = false;
  dialog.value = false;
  currentIndex.value = null;
}

async function deleteAddress(index: number) {
  const oldAddresses = user.data?.addresses ?? [];
  oldAddresses.splice(index, 1);

  await user.update({
    addresses: oldAddresses,
  });
}
</script>

<template>
  <div class="tw-w-full">
    <q-card flat bordered class="tw-w-full tw-p-6 md:tw-p-12">
      <div
        class="tw-mb-6 tw-flex tw-flex-wrap tw-justify-between tw-gap-y-4 md:tw-mb-12"
      >
        <h4 class="tw-text-3xl tw-font-medium">Moje adrese</h4>

        <q-btn
          no-caps
          color="primary"
          icon="add"
          label="Nova adresa"
          @click="openAddEditDialog()"
        />
      </div>

      <div class="">
        <div
          v-for="(address, index) in addresses"
          :key="index"
          class="tw-grid tw-gap-4 sm:tw-grid-cols-2 md:tw-gap-6"
        >
          <h5 class="sm:tw-col-span-2">Adresa {{ index + 1 }}</h5>
          <div>
            <label :for="`address-${index}`" class="tw-text-lg tw-font-bold"
              >Ulica i kućni broj</label
            >
            <q-input
              v-model="address.address"
              :for="`address-${index}`"
              autocomplete="street-address"
              outlined
              readonly
              class="tw-mt-1 !tw-text-lg"
            />
          </div>

          <div>
            <label :for="`city-${index}`" class="tw-text-lg tw-font-bold"
              >Grad</label
            >
            <q-input
              v-model="address.city"
              :for="`city-${index}`"
              autocomplete="country-name"
              outlined
              readonly
              class="tw-mt-1 !tw-text-lg"
            />
          </div>

          <div>
            <label :for="`postal_code-${index}`" class="tw-text-lg tw-font-bold"
              >Poštanski broj</label
            >
            <q-input
              v-model="address.postalCode"
              :for="`postal_code-${index}`"
              autocomplete="postal-code"
              outlined
              readonly
              class="tw-mt-1 !tw-text-lg"
            />
          </div>

          <div>
            <label :for="`country-${index}`" class="tw-text-lg tw-font-bold"
              >Država</label
            >
            <q-input
              v-model="address.country"
              :for="`country-${index}`"
              autocomplete="country"
              outlined
              readonly
              class="tw-mt-1 !tw-text-lg"
            />
          </div>

          <div class="tw-flex tw-gap-2">
            <q-btn
              no-caps
              label="Uredi"
              color="primary"
              class="!tw-px-10"
              @click="openAddEditDialog(address, index)"
            />

            <q-btn
              no-caps
              flat
              label="Obriši"
              icon="delete"
              color="red-8"
              @click="deleteAddress(index)"
            />
          </div>

          <q-separator class="!tw-my-6 sm:tw-col-span-2" />
        </div>
      </div>
    </q-card>

    <q-dialog v-model="dialog" persistent>
      <q-card class="tw-w-full sm:tw-px-6 sm:tw-py-3">
        <q-card-section>
          <div class="tw-text-3xl tw-font-medium">{{ dialogTitle }}</div>
        </q-card-section>

        <q-card-section>
          <q-form class="tw-space-y-4" @submit.prevent="addUpdateAddress">
            <q-input
              v-model="editingAddress.address"
              outlined
              label="Adresa"
              autocomplete="address"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
            />
            <div class="tw-grid tw-grid-cols-2 tw-gap-4">
              <q-input
                v-model="editingAddress.city"
                autocomplete="address-level2"
                outlined
                label="Grad"
              />
              <q-input
                v-model="editingAddress.country"
                autocomplete="country"
                outlined
                label="Država"
              />
            </div>
            <q-input
              v-model="editingAddress.postalCode"
              outlined
              autocomplete="postal-code"
              label="Poštanski broj"
            />

            <div class="text-center">
              <q-btn
                v-close-popup
                no-caps
                flat
                label="Odustani"
                class="tw-mr-2"
              />
              <q-btn
                no-caps
                label="Spremi"
                type="submit"
                color="primary"
                :loading="isLoading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
