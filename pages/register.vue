<script lang="ts" setup>
const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const errorMessage = ref("");

const auth = useAuth();

const handleGoogleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;
  const res = await auth.googleLogin();

  if (res.error) {
    errorMessage.value = res.error;
  }
  isLoading.value = false;
};

const handleRegistration = async () => {
  errorMessage.value = "";
  isLoading.value = true;
  const res = await auth.register(form.email, form.password, form.name);

  if (res.error) {
    errorMessage.value = res.error;
  }
  isLoading.value = false;
};

const arePasswordsSame = computed(() => {
  return form.password === form.confirmPassword;
});
</script>

<template>
  <div class="tw-p-6 sm:tw-p-12">
    <q-card flat bordered class="tw-mx-auto tw-max-w-md tw-p-6 sm:tw-p-12">
      <h4 class="tw-mb-8 tw-text-center">Kreiraj račun</h4>

      <q-form class="tw-space-y-2" @submit="handleRegistration">
        <q-input
          v-model="form.name"
          outlined
          name="name"
          autocomplete="name"
          type="text"
          label="Ime i prezime"
          :rules="[(val) => !!val || 'Obavezno polje']"
        />
        <q-input
          v-model="form.email"
          outlined
          name="email"
          autocomplete="email"
          type="email"
          label="Email"
          error-message="Unesite ispravnu email adresu"
          :rules="['email']"
          lazy-rules
        />
        <q-input
          v-model="form.password"
          outlined
          name="password"
          autocomplete="new-password"
          type="password"
          label="Lozinka"
          :rules="[
            (val) => !!val || 'Obavezno polje',
            (val) =>
              val.length > 7 || 'Lozinka mora sadržavati minimalno 8 znakova',
          ]"
        />
        <q-input
          v-model="form.confirmPassword"
          outlined
          name="confirm-password"
          autocomplete="new-password"
          type="password"
          label="Potvrdi lozinku"
          :rules="[() => arePasswordsSame || 'Lozinke se ne podudaraju']"
        />

        <q-btn
          no-caps
          type="submit"
          color="primary"
          label="Registriraj se"
          :loading="isLoading"
          class="!tw-w-full"
        />
      </q-form>

      <div
        v-if="errorMessage"
        class="tw-mt-2 tw-text-center tw-font-semibold tw-text-red-500"
      >
        {{ errorMessage }}
      </div>

      <q-separator class="!tw-my-6" />

      <q-btn no-caps class="full-width tw-mb-6" @click="handleGoogleLogin">
        <q-avatar size="sm">
          <img src="~/assets/google.png" alt="Google G Logo" />
        </q-avatar>
        <span class="tw-ml-2">Nastavi uz Google</span>
      </q-btn>

      <div class="tw-text-center tw-text-base">
        Već imaš korisnički račun?
        <NuxtLink
          to="/login"
          class="tw-font-semibold tw-text-primary hover:tw-underline"
        >
          Prijavi se
        </NuxtLink>
      </div>
    </q-card>
  </div>
</template>
