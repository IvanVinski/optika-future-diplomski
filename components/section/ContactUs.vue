<script lang="ts" setup>
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isFormSubmitted = ref(false);

const handleSubmit = () => {
  isFormSubmitted.value = true;
};
</script>

<template>
  <section
    id="kontakt"
    class="tw-bg-primary tw-px-6 tw-py-12 tw-text-white tw-transition-all sm:tw-p-24 xl:tw-py-36"
  >
    <div
      class="tw-mx-auto tw-grid tw-min-h-[370px] tw-max-w-xl tw-items-center tw-gap-x-24 tw-gap-y-12 lg:tw-max-w-7xl lg:tw-grid-cols-2 xl:tw-gap-x-48"
    >
      <div class="lg:tw-order-last">
        <h2 class="tw-mb-12 tw-text-4xl tw-font-bold xl:tw-text-5xl">
          Pošalji nam poruku
        </h2>

        <p class="tw-text-pretty tw-text-xl xl:tw-text-2xl">
          Ispunite obrazac da biste stupili u kontakt s nama. Tu smo da
          odgovorimo na sva vaša pitanja i da vam pružimo najbolje rješenje za
          vaš vid.
        </p>

        <div class="tw-text-center">
          <q-btn
            no-caps
            flat
            label="Pronađi poslovnice"
            icon-right="east"
            to="#poslovnice"
          />
        </div>
      </div>

      <ClientOnly v-if="!isFormSubmitted">
        <q-form
          class="contact tw-grid tw-gap-4 sm:tw-grid-cols-2"
          @submit.prevent="handleSubmit"
        >
          <q-input
            v-model="form.name"
            name="name"
            autocomplete="name"
            label="Ime"
            bg-color="white"
            lazy-rules="ondemand"
            outlined
            hide-bottom-space
            :rules="[(val) => (val && val.length > 0) || 'Ime je obavezno']"
          />

          <q-input
            v-model="form.email"
            name="email"
            autocomplete="email"
            label="Email"
            bg-color="white"
            outlined
            hide-bottom-space
            :rules="['email']"
            lazy-rules="ondemand"
            error-message="Molimo unsesite ispravnu email adresu."
          />

          <q-input
            v-model="form.subject"
            name="suject"
            label="Naslov"
            outlined
            bg-color="white"
            class="sm:tw-col-span-2"
          />

          <q-input
            v-model="form.message"
            name="message"
            type="textarea"
            label="Poruka"
            outlined
            bg-color="white"
            class="sm:tw-col-span-2"
            lazy-rules="ondemand"
            hide-bottom-space
            :rules="[
              (val) =>
                (val && val.length > 14) ||
                'Poruka se mora sasatojati od minimalno 15 znakova',
            ]"
            counter
            maxlength="500"
          />

          <q-btn
            type="submit"
            color="white"
            text-color="primary"
            size="16px"
            no-caps
            label="Pošalji"
            class="tw-w-40 tw-justify-self-end sm:tw-col-span-2"
          />
        </q-form>
      </ClientOnly>

      <div
        v-else
        class="tw-rounded-xl tw-border tw-p-6 tw-text-center tw-text-white"
      >
        <h3
          class="tw-text-balance tw-text-2xl tw-leading-snug md:tw-text-3xl xl:tw-text-4xl"
        >
          Hvala što ste kontaktirali Optiku Future!
        </h3>
        <p
          class="tw-my-8 tw-text-pretty tw-text-base md:tw-text-lg xl:tw-text-xl"
        >
          Odgovorit ćemo vam u najkraćem mogućem roku.
        </p>
        <q-btn
          flat
          no-caps
          label="Pošalji novu poruku"
          @click="isFormSubmitted = false"
        />
      </div>
    </div>
  </section>
</template>
