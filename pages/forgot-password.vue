<script lang="ts" setup>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const email = ref("");
const dialog = ref(false);

const handlePassReset = () => {
  sendPasswordResetEmail(auth, email.value).then(() => {
    dialog.value = true;
  });
};
</script>

<template>
  <div class="tw-p-6 sm:tw-p-12 lg:tw-p-24">
    <q-form @submit="handlePassReset">
      <q-card class="tw-mx-auto tw-max-w-md">
        <q-card-section>
          <h3 class="tw-mb-3 tw-text-center tw-text-xl tw-font-bold">
            Zaboravili ste lozinku?
          </h3>
          <p class="tw-mb-6 tw-text-pretty tw-text-center tw-text-gray-600">
            Unesite email adresu koju ste koristili za registraciju, a mi ćemo
            vam poslati link za ponovo postavljanje lozinke.
          </p>
          <q-input v-model="email" label="Email" outlined :rules="['email']" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            no-caps
            type="submit"
            color="primary"
            label="Resetiraj lozinku"
          />
        </q-card-actions>
      </q-card>
    </q-form>

    <q-dialog v-model="dialog" persistent>
      <q-card class="q-pa-sm">
        <q-card-section class="text-center">
          Poslali smo vam email s uputama za resetiranje vaše lozinke.
          Provjerite vaš inbox te slijedite upute za resetiranje lozinke.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" to="/login" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
