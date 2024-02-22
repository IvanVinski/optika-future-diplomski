<script lang="ts" setup>
import { getAuth, updatePassword } from "firebase/auth";
import { useQuasar } from "quasar";

useSeoMeta({
  title: "Optika Future | Postavke",
});

const auth = getAuth();
const user = auth.currentUser;

const form = ref({
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
});

const $q = useQuasar();
function deleteAccount() {
  $q.dialog({
    title: "Dali ste sigurni da želite obrisati vaš korisnički račun?",
    message: "Ovom radnjom više nećete biti u mogućnosti vratiti vaš račun!",
    cancel: "Odustani",
  }).onOk(() => {});
}

const handlePasswordUpdate = () => {
  if (user) {
    updatePassword(user, form.value.newPassword)
      .then(() => {
        $q.notify({
          message: "Vaša lozinka je uspješno promijenjena!",
          icon: "check",
          color: "green",
        });
      })
      .catch((error) => {
        $q.notify({
          message: error.message,
          icon: "warning",
          color: "red",
        });
      });
  }
};
</script>

<template>
  <q-card flat bordered class="tw-w-full tw-p-6 md:tw-p-12">
    <h4 class="tw-mb-6 tw-text-3xl tw-font-medium md:tw-mb-12">Postavke</h4>

    <div class="tw-mb-4 tw-text-xl tw-font-medium">Promjena lozinke</div>

    <q-form class="tw-max-w-xs tw-space-y-4" @submit="handlePasswordUpdate">
      <q-input v-model="form.oldPassword" outlined label="Trenutna lozinka" />

      <q-input v-model="form.newPassword" outlined label="Nova lozinka" />

      <q-input
        v-model="form.newPasswordConfirm"
        outlined
        label="Potvrdi novu lozinku"
      />

      <q-btn no-caps type="submit" color="primary" label="Ažuriraj lozinku" />
    </q-form>

    <q-separator class="!tw-my-6" />

    <div>
      <p class="tw-mb-2 tw-font-medium">
        Ovdje možete zatražiti brisanje svog korisničkog računa.
      </p>
      <p>
        Brisanjem korisničkog računa svi vaši podaci se trajno brišu te više
        nećete biti u mogućnosti vratiti svoj račun.
      </p>
      <q-btn
        no-caps
        color="red-8"
        label="Obriši korisnički račun"
        @click="deleteAccount"
      />
    </div>
  </q-card>
</template>
