<script lang="ts" setup>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

const branch = useBranchStore();

const config = useRuntimeConfig();
const mapRef = ref();

const getCenterWithOffset = (center: { lat: number; lng: number }) => {
  if (window.innerWidth < 768) {
    return {
      lat: center.lat + 0.002,
      lng: center.lng,
    };
  }
  return {
    lat: center.lat,
    lng: center.lng - 0.005,
  };
};

const center = ref(getCenterWithOffset(branch.branches[0].coordinates));

const onLocationChange = (e: any) => {
  const newCenter = branch.branches.find(
    (branch) => branch.name === e.srcElement.innerText,
  );
  if (newCenter) {
    mapRef.value.map.setCenter(getCenterWithOffset(newCenter.coordinates));
  }
};
</script>

<template>
  <div id="poslovnice" class="tw-relative">
    <div
      class="tw-absolute tw-left-1/2 tw-z-10 tw-w-full tw-max-w-md -tw-translate-y-24 tw-px-6 max-md:-tw-translate-x-1/2 md:tw-left-4 md:tw-top-1/2 md:-tw-translate-y-1/2 lg:tw-left-20"
    >
      <q-list
        class="tw-rounded-xl tw-bg-primary/80 tw-text-white tw-backdrop-blur-sm"
      >
        <template v-for="(item, index) in branch.branches" :key="item.id">
          <q-expansion-item
            group="branches"
            :label="item.name"
            :default-opened="index === 0"
            header-class="tw-text-xl tw-font-semibold"
            expand-icon-class="text-white"
            @before-show="(e) => onLocationChange(e)"
          >
            <q-list class="tw-pb-2 tw-text-base">
              <q-item v-ripple clickable class="q-px-lg">
                <q-item-section avatar>
                  <q-icon name="location_on" />
                </q-item-section>

                <q-item-section> {{ item.address }} </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="q-px-lg">
                <q-item-section avatar>
                  <q-icon name="alternate_email" />
                </q-item-section>

                <q-item-section> {{ item.email }} </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="q-px-lg">
                <q-item-section avatar>
                  <q-icon name="call" />
                </q-item-section>

                <q-item-section> {{ item.phone }} </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="q-px-lg">
                <q-item-section avatar>
                  <q-icon name="schedule" />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="tw-text-sm">Radno vrijeme</q-item-label>
                  <q-item-label> {{ item.working_hours }} </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-separator dark />
        </template>
      </q-list>
    </div>

    <GoogleMap
      ref="mapRef"
      :api-key="config.public.mapsApiKey"
      class="tw-h-[600px] tw-w-full md:tw-h-[600px]"
      :center="center"
      :zoom="16"
      :disable-default-ui="true"
    >
      <Marker
        v-for="marker in branch.branches"
        :key="marker.id"
        :options="{ position: marker.coordinates }"
      >
        <InfoWindow
          :options="{ position: marker.coordinates, content: marker.name }"
        />
      </Marker>
    </GoogleMap>
  </div>
</template>
