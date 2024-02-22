<script lang="ts" setup>
import { type QTableColumn } from "quasar";

useSeoMeta({
  title: "Optika Future | Ponuda",
});

const route = useRoute();
const router = useRouter();
const product = useProductsStore();

function filterProducts(val: any) {
  const categories = val?.map((category: any) => category.value);
  router.push({
    path: "/products",
    query: { category: categories },
  });
}

const getProducts = computed(() => {
  if (route.query.category) {
    return product.products.filter((p) =>
      route.query.category?.includes(p.category.value),
    );
  }
  return product.products;
});

const columns: QTableColumn[] = [
  {
    name: "name",
    required: true,
    label: "Naziv",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "model",
    align: "center",
    label: "Model",
    field: "model",
    sortable: true,
  },
  { name: "images", label: "Slika", field: "images" },
  { name: "price", label: "Cijena", field: "price" },
  { name: "discount", label: "Popust", field: "discount" },
];

const pagination = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: "createdAt",
  descending: true,
});

const filter = ref();

const priceRange = ref({
  min: 0,
  max: 300,
});

const category = ref([]);
const categoryOptions = [
  {
    label: "Dioptrijski okviri",
    value: "dioptric",
  },
  {
    label: "Sunčane naočale",
    value: "sunglasses",
  },
  {
    label: "Kontaktne leće",
    value: "lenses",
  },
  {
    label: "Dodaci",
    value: "accessories",
  },
];

const sex = ref([]);
const sexOptions = [
  {
    label: "Dječje",
    value: "kids",
  },
  {
    label: "Muški",
    value: "male",
  },
  {
    label: "Ženski",
    value: "female",
  },
  {
    label: "Unisex",
    value: "unisex",
  },
];

const brand = ref([]);
const filteredBrandOptions = ref([
  {
    label: "Crullé",
    value: "crulle",
  },
  {
    label: "Guess",
    value: "guess",
  },
  {
    label: "Polaroid",
    value: "polaroid",
  },
  {
    label: "Police",
    value: "police",
  },
  {
    label: "Ray-Ban",
    value: "ray-ban",
  },
  {
    label: "Versace",
    value: "versace",
  },
]);
const brandOptions = [
  {
    label: "Crullé",
    value: "crulle",
  },
  {
    label: "Guess",
    value: "guess",
  },
  {
    label: "Polaroid",
    value: "polaroid",
  },
  {
    label: "Police",
    value: "police",
  },
  {
    label: "Ray-Ban",
    value: "ray-ban",
  },
  {
    label: "Versace",
    value: "versace",
  },
  {
    label: "Emporio Armani",
    value: "emporio-armani",
  },
];

const size = ref([]);
const sizeOptions = [
  {
    label: "S",
    value: "s",
  },
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
];

const sort = ref("Preporučeno");
const sortOptions = [
  "Preporučeno",
  "Abecedno",
  "Jeftinije prvo",
  "Skuplje prvo",
];

const filterFn = (val: string, update: any) => {
  update(
    () => {
      const needle = val.toLowerCase();
      filteredBrandOptions.value = brandOptions.filter((v) =>
        v.label.toLowerCase().includes(needle),
      );
    },
    (ref: any) => {
      if (val !== "" && ref.options.length > 0) {
        ref.setOptionIndex(-1);
        ref.moveOptionSelection(1, true);
      }
    },
  );
};
</script>

<template>
  <div
    class="tw-mx-auto tw-grid tw-max-w-7xl tw-gap-6 tw-px-2 tw-py-12 sm:tw-px-6 lg:tw-grid-cols-12 2xl:tw-max-w-[1500px]"
  >
    <div class="tw-col-span-9 lg:tw-col-span-3">
      <h4 class="tw-mb-2 tw-mt-6 tw-text-center tw-text-3xl">Filtriraj</h4>
      <ClientOnly>
        <div class="tw-grid tw-gap-4 tw-rounded-xl tw-border tw-p-4">
          <q-select
            v-model="category"
            outlined
            multiple
            clearable
            use-chips
            options-dense
            :options="categoryOptions"
            label="Kategorija"
            @update:model-value="filterProducts"
          >
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    size="sm"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="sex"
            outlined
            multiple
            clearable
            use-chips
            options-dense
            :options="sexOptions"
            label="Spol"
          >
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    size="sm"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="brand"
            outlined
            :options="filteredBrandOptions"
            multiple
            use-chips
            use-input
            options-dense
            label="Marka"
            @filter="filterFn"
          >
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    size="sm"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="size"
            outlined
            :options="sizeOptions"
            multiple
            use-chips
            options-dense
            label="Veličina"
          >
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    size="sm"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div
            class="tw-space-y-4 tw-rounded-xl tw-border tw-border-gray-300 tw-px-4 tw-py-2"
          >
            <div for="price_range" class="tw-text-base tw-text-black/60">
              Cijena
            </div>

            <div class="tw-grid tw-grid-cols-2 tw-gap-12">
              <q-input
                v-model="priceRange.min"
                type="number"
                label="Min"
                prefix="€"
                :min="0"
                outlined
                dense
              />
              <q-input
                v-model="priceRange.max"
                type="number"
                label="Max"
                prefix="€"
                :max="300"
                outlined
                dense
              />
            </div>

            <q-range
              id="price_range"
              v-model="priceRange"
              :min="0"
              :max="300"
              track-size="8px"
              thumb-size="26px"
              class="tw-px-3"
            />
          </div>
        </div>
      </ClientOnly>
    </div>

    <q-table
      grid
      :rows="getProducts"
      :columns="columns"
      :rows-per-page-options="[8]"
      row-key="model"
      title="Proizvodi"
      title-class="!tw-text-4xl !tw-font-medium"
      hide-header
      class="tw-col-span-9"
    >
      <template #top-right>
        <client-only>
          <q-select
            v-model="sort"
            :options="sortOptions"
            label="Sortiraj"
            outlined
            dense
            class="tw-mr-4"
          />
          <q-input
            v-model="filter"
            outlined
            dense
            debounce="300"
            placeholder="Traži"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </client-only>
      </template>

      <template #item="props">
        <div class="col-xs-6 col-md-4 col-lg-3 tw-p-1 sm:tw-p-2 md:tw-w-[33%]">
          <CardsProduct :product="props.row" />
        </div>
      </template>

      <template #bottom="props">
        <div class="full-width row flex-center q-my-md">
          <q-pagination
            v-model="pagination.page"
            size="16px"
            active-design="unelevated"
            :max="props.pagesNumber"
            direction-links
            boundary-links
          /></div
      ></template>
    </q-table>
  </div>
</template>
