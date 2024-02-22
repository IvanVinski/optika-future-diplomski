<script lang="ts" setup>
useSeoMeta({
  title: "Optika Future | Moj račun",
});

const user = useUserStore();

const form = ref({
  name: user.data?.name.split(" ")[0],
  surname: user.data?.name.split(" ")[1],
  phone: user.data?.phoneNumber,
  email: user.data?.email,
  uid: user.data?.uid,
});

const isLoading = ref(false);

const saveUser = async () => {
  isLoading.value = true;

  const newData = {
    name: `${form.value.name} ${form.value.surname}`,
    phoneNumber: form.value.phone,
    email: form.value.email,
    uid: form.value.uid,
  };

  await user.update(newData);
  isLoading.value = false;
};
</script>

<template>
  <q-card flat bordered class="tw-w-full tw-p-6 md:tw-p-12">
    <h4 class="tw-mb-6 tw-text-3xl tw-font-medium md:tw-mb-12">Moji podaci</h4>

    <q-form
      class="tw-grid tw-gap-4 sm:tw-grid-cols-2 lg:tw-gap-12"
      @submit="saveUser"
    >
      <div>
        <label for="name" class="tw-text-lg tw-font-bold">Ime</label>
        <q-input
          v-model="form.name"
          for="name"
          autocomplete="given-name"
          outlined
          class="tw-mt-1 !tw-text-lg"
        />
      </div>

      <div>
        <label for="surname" class="tw-text-lg tw-font-bold">Prezime</label>
        <q-input
          v-model="form.surname"
          for="surname"
          autocomplete="family-name"
          outlined
          class="tw-mt-1 !tw-text-lg"
        />
      </div>

      <div>
        <label for="phone" class="tw-text-lg tw-font-bold">Broj mobitela</label>
        <q-input
          v-model="form.phone"
          for="phone"
          autocomplete="tel"
          outlined
          class="tw-mt-1 !tw-text-lg"
        />
      </div>

      <div>
        <label for="email" class="tw-text-lg tw-font-bold">Email adresa</label>
        <q-input
          v-model="form.email"
          for="email"
          autocomplete="email"
          outlined
          class="tw-mt-1 !tw-text-lg"
        />
      </div>

      <q-btn
        no-caps
        type="submit"
        label="Spremi"
        color="primary"
        :loading="isLoading"
        class="!tw-w-fit !tw-px-10"
      />
    </q-form>
  </q-card>
</template>
