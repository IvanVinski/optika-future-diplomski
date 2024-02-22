<script lang="ts" setup>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import moment from "moment";
import "moment/dist/locale/hr";

const config = useRuntimeConfig();
const infoWindow = ref(true);

const branches = [
  {
    id: 1,
    name: "Poslovnica Zagreb",
    center: {
      lat: 45.794202,
      lng: 15.949934,
    },
    address: "Zagrebačka avenija 10, 10 000 Zagreb",
    phone: "01/2345-678",
    email: "info-zg@optikafuture.com",
    working_hours: "PON - SUB: 08h - 20h",
  },
  {
    id: 2,
    name: "Poslovnica Rijeka",
    center: {
      lat: 45.326638,
      lng: 14.444744,
    },
    address: "Riječka avenija 50, 51 000 Rijeka",
    phone: "051/2345-678",
    email: "info-ri@optikafuture.com",
    working_hours: "PON - SUB: 08h - 20h",
  },
  {
    id: 3,
    name: "Poslovnica Karlovac",
    center: {
      lat: 45.490858,
      lng: 15.551209,
    },
    address: "Karlovačka avenija 47, 47 000 Karlovac",
    phone: "047/2345-678",
    email: "info-ka@optikafuture.com",
    working_hours: "PON - SUB: 08h - 20h",
  },
  {
    id: 4,
    name: "Poslovnica Split",
    center: {
      lat: 43.51333,
      lng: 16.448258,
    },
    address: "Splitska avenija 21, 21 000 Split",
    phone: "021/2345-678",
    email: "info-st@optikafuture.com",
    working_hours: "PON - SUB: 08h - 20h",
  },
];

const step = ref(1);
const done1 = ref(false);
const done2 = ref(false);
const done3 = ref(false);
const isReserved = ref(false);

const name = ref("");
const email = ref("");
const phone = ref("");

const branch = ref(null);
const branchOptions = [
  "Poslovnica Zagreb",
  "Poslovnica Rijeka",
  "Poslovnica Karlovac",
  "Poslovnica Split",
];

const time = ref(null);
const timeOptions = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const date = ref(null);

const currentDate = moment().format("YYYY-MM-DD");

const pastDates = (date: string) => {
  const dates = [];
  const today = moment();
  const nextYear = moment().add(1, "years");

  while (today.isBefore(nextYear)) {
    if (today.day() !== 0) {
      dates.push(today.format("YYYY/MM/DD"));
    }
    today.add(1, "days");
  }
  return dates.includes(date);
};

const formatDate = computed(() => {
  if (date.value)
    return moment(date.value, "YYYY/MM/DD")
      .locale("hr")
      .format("dddd, D. MMMM");
});
</script>

<template>
  <section class="tw-relative">
    <div
      class="tw-relative tw-z-10 tw-mx-auto tw-w-full tw-max-w-xl tw-translate-y-48 tw-px-6 md:tw-absolute md:tw-left-4 md:tw-top-1/2 md:-tw-translate-y-1/2 lg:tw-left-20"
    >
      <q-card v-if="isReserved" class="!tw-bg-white/70 tw-backdrop-blur-md">
        <h2
          class="tw-py-6 tw-text-center tw-text-3xl tw-font-bold md:tw-text-4xl"
        >
          Rezervacija potvrđena
        </h2>
        <ol class="tw-px-12 tw-text-lg">
          <li class="tw-mb-2 tw-text-2xl tw-font-bold">Vaš odabir:</li>
          <li class="tw-mb-2 tw-font-semibold">{{ branch }}</li>
          <li>
            Termin:
            <span class="tw-font-semibold"
              >{{ formatDate }} u {{ time }} sati</span
            >
          </li>
          <q-separator class="!tw-my-4" />
          <li class="tw-mb-4 tw-text-xl tw-font-bold">Osobni podaci:</li>
          <li>
            Ime: <span class="tw-font-semibold">{{ name }}</span>
          </li>
          <li class="tw-my-2">
            Kontakt email:
            <span class="tw-font-semibold">{{ email }}</span>
          </li>
          <li>
            Kontakt broj: <span class="tw-font-semibold">{{ phone }}</span>
          </li>
        </ol>

        <q-separator class="!tw-my-6" />

        <div class="tw-px-12 tw-pb-6 tw-text-base">
          U slučaju otkazivanja ili promjene termina molimo Vas da nam se javite
          na broj <b>01/2345-678</b> ili putem email adrese
          <b>info@optikafuture.com</b>.
        </div>
      </q-card>
      <q-stepper
        v-else
        ref="stepper"
        v-model="step"
        animated
        vertical
        class="!tw-bg-white/70 tw-backdrop-blur-md"
      >
        <h2
          class="tw-py-6 tw-text-center tw-text-3xl tw-font-bold md:tw-text-4xl"
        >
          Rezervacija termina
        </h2>
        <q-step
          :name="1"
          :title="branch ? `Vaš odabir: ${branch}` : 'Odabir poslovnice'"
          icon="map"
          :done="done1"
        >
          <q-select
            v-model="branch"
            :options="branchOptions"
            label="Poslovnica"
            outlined
            behavior="menu"
          />

          <q-stepper-navigation>
            <q-btn
              no-caps
              color="primary"
              label="Nastavi na odabir datuma"
              size="md"
              @click="
                () => {
                  done1 = true;
                  step = 2;
                }
              "
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          :title="date ? `Odabrani datum: ${formatDate}` : 'Odabir datuma'"
          icon="calendar_month"
          :done="done2"
        >
          <q-btn icon="event" round color="primary">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
                flat
                bordered
                class="!tw-w-[320px]"
                :title="formatDate"
                first-day-of-week="1"
                :navigation-min-year-month="
                  moment(currentDate).format('YYYY/MM')
                "
                :navigation-max-year-month="
                  moment(currentDate).add(1, 'y').format('YYYY/MM')
                "
                :options="pastDates"
                :locale="{
                  daysShort: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
                  months: [
                    'Siječanj',
                    'Veljača',
                    'Ožujak',
                    'Travanj',
                    'Svibanj',
                    'Lipanj',
                    'Srpanj',
                    'Kolovoz',
                    'Rujan',
                    'Listopad',
                    'Studeni',
                    'Prosinac',
                  ],
                  monthsShort: [
                    'Siječanj',
                    'Veljača',
                    'Ožujak',
                    'Travanj',
                    'Svibanj',
                    'Lipanj',
                    'Srpanj',
                    'Kolovoz',
                    'Rujan',
                    'Listopad',
                    'Studeni',
                    'Prosinac',
                  ],
                }"
              >
                <div class="tw-text-right">
                  <q-btn
                    v-close-popup
                    no-caps
                    label="Potvrdi"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          <span class="tw-ml-6 tw-text-lg tw-font-semibold">
            {{ formatDate }}
          </span>

          <q-stepper-navigation>
            <q-btn
              no-caps
              size="md"
              color="primary"
              label="Natavi na odabir vremena"
              @click="
                () => {
                  done2 = true;
                  step = 3;
                }
              "
            />
            <q-btn
              flat
              no-caps
              size="md"
              color="primary"
              label="Natrag"
              class="q-ml-sm"
              @click="step = 1"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          :title="time ? `Odabrano vrijeme: ${time} h` : 'Odabir vremena'"
          icon="schedule"
          :done="done3"
        >
          <q-select
            v-model="time"
            :options="timeOptions"
            label="Odaberi vrijeme pregleda"
            outlined
            options-dense
            behavior="menu"
          />

          <q-stepper-navigation>
            <q-btn
              no-caps
              size="md"
              color="primary"
              label="Natavi na unos osobnih podataka"
              @click="
                () => {
                  done3 = true;
                  step = 4;
                }
              "
            />
            <q-btn
              flat
              no-caps
              size="md"
              color="primary"
              label="Natrag"
              class="q-ml-sm"
              @click="step = 2"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="4"
          title="Unos osobnih podataka"
          icon="person"
          :done="done3"
        >
          <div class="tw-grid tw-gap-4">
            <q-input v-model="name" label="Ime i prezime" outlined />

            <q-input v-model="email" label="Email" outlined />

            <q-input v-model="phone" label="Kontak broj" outlined />
          </div>

          <q-stepper-navigation>
            <q-btn
              no-caps
              color="primary"
              label="Rezerviraj"
              @click="isReserved = true"
            />
            <q-btn
              flat
              no-caps
              size="md"
              color="primary"
              label="Natrag"
              class="q-ml-sm"
              @click="step = 3"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>

    <ClientOnly>
      <GoogleMap
        ref="mapRef"
        :api-key="config.public.mapsApiKey"
        class="tw-h-[600px] tw-w-full"
        :center="branches[0].center"
        :zoom="16"
        :disable-default-ui="true"
      >
        <Marker
          v-for="marker in branches"
          :key="marker.id"
          :options="{ position: marker.center }"
        >
          <InfoWindow
            v-model="infoWindow"
            :options="{ position: marker.center }"
          >
            <div id="content">
              <q-list dense class="tw-text-base tw-font-normal">
                <q-item v-ripple clickable class="tw-text-lg tw-font-bold">
                  <q-item-section>{{ marker.name }}</q-item-section>
                </q-item>
                <q-item v-ripple clickable>
                  <q-item-section>
                    {{ marker.address }}
                  </q-item-section>
                </q-item>
                <q-item v-ripple clickable>
                  <q-item-section>
                    {{ marker.email }}
                  </q-item-section>
                </q-item>
                <q-item v-ripple clickable>
                  <q-item-section>
                    {{ marker.phone }}
                  </q-item-section>
                </q-item>
                <q-item v-ripple clickable>
                  <q-item-section>
                    {{ marker.working_hours }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </ClientOnly>
  </section>
</template>

<style>
.swiper-button-prev {
  @apply tw-ml-4;
}
.swiper-button-next {
  @apply tw-mr-4;
}
</style>
