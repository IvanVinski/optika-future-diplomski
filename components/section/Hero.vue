<script lang="ts" setup></script>

<template>
  <section class="tw-relative tw-h-svh tw-min-h-[600px]">
    <q-img
      src="/images/women_eyeglasses.jpg"
      class="tw-h-full"
      alt="Fotografija žene s naočalama"
    />

    <div class="tw-absolute tw-inset-0 tw-bg-primary/80">
      <div
        class="tw-mx-auto tw-flex tw-h-full tw-max-w-4xl tw-flex-col tw-justify-center tw-gap-12 tw-px-6 lg:tw-max-w-5xl"
      >
        <h1
          class="tw-text-pretty tw-text-center tw-text-4xl tw-font-bold tw-leading-normal tw-text-white md:tw-text-5xl lg:tw-text-7xl"
        >
          Otkrijte kristalno čisti vid
        </h1>

        <p
          class="tw-text-pretty tw-text-center tw-text-xl tw-text-white md:tw-text-xl lg:tw-text-2xl"
        >
          Rezervirajte termin za besplatan pregled vida već danas.
        </p>

        <div class="tw-text-center">
          <q-btn
            no-caps
            color="white"
            text-color="primary"
            size="lg"
            label="Rezervirajte sada"
            to="/book-eye-test"
          />
        </div>
      </div>
    </div>
  </section>
</template>
