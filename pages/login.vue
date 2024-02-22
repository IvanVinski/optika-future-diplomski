<script lang="ts" setup>
const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
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

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;
  const res = await auth.login(form.email, form.password);

  if (res.error) {
    errorMessage.value = res.error;
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="tw-p-6 sm:tw-p-12">
    <q-card flat bordered class="tw-mx-auto tw-max-w-md tw-p-6 sm:tw-p-12">
      <h4 class="tw-mb-8 tw-text-center">Prijava</h4>

      <q-form class="tw-space-y-2" @submit="handleLogin">
        <q-input
          v-model="form.email"
          outlined
          name="email"
          autocomplete="email"
          type="email"
          label="Email"
          error-message="Unesite ispravnu email adresu"
          :rules="['email']"
          hint="Test email: kupac@test.com ili admin@test.com"
        />
        <q-input
          v-model="form.password"
          outlined
          name="password"
          autocomplete="current-password"
          type="password"
          label="Lozinka"
          lazy-rules="ondemand"
          :rules="[(val) => !!val || 'Unesite lozinku']"
          hint="Test lozinka: kupac123 ili admin123"
        />

        <div class="!tw-mb-5 tw-flex tw-items-center tw-justify-between">
          <q-checkbox v-model="form.rememberMe" dense label="Zapamti me" />

          <NuxtLink
            to="/forgot-password"
            class="tw-text-primary hover:tw-underline"
          >
            Zaboravili ste lozinku?
          </NuxtLink>
        </div>

        <q-btn
          no-caps
          type="submit"
          color="primary"
          label="Prijavi se"
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
        Nemaš račun?
        <NuxtLink
          to="/register"
          class="tw-font-semibold tw-text-primary hover:tw-underline"
        >
          Registriraj se
        </NuxtLink>
      </div>
    </q-card>
  </div>
</template>
