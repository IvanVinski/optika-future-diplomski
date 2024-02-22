<script lang="ts" setup>
import { type QTableColumn } from "quasar";

const product = useProductsStore();

const visibleColumns = ref([
  "name",
  "images",
  "itemsInStock",
  "price",
  "discount",
  "finalPrice",
  "category",
  "sex",
  "tags",
  "actions",
]);

const columns: QTableColumn[] = [
  { name: "id", label: "ID", field: "id", align: "left" },
  {
    name: "name",
    label: "Naziv",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "brand",
    label: "Brand",
    field: "brand",
    sortable: true,
    align: "left",
  },
  {
    name: "model",
    label: "Model",
    field: "model",
    sortable: true,
    align: "left",
  },
  {
    name: "price",
    label: "Cijena (€)",
    field: "price",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "discount",
    label: "Popust (%)",
    field: "discount",
    sortable: true,
  },
  {
    name: "finalPrice",
    label: "Konačna cijena (€)",
    field: "finalPrice",
    sortable: true,
  },
  { name: "images", label: "Slika", field: "images" },
  {
    name: "itemsInStock",
    label: "Količina",
    field: "itemsInStock",
    sortable: true,
  },
  {
    name: "category",
    label: "Kategorija",
    field: "category",
    sortable: true,
    align: "left",
    sort: (a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    },
  },
  {
    name: "sex",
    label: "Spol",
    field: "sex",
    sortable: true,
    align: "left",
    sort: (a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    },
  },
  {
    name: "tags",
    label: "Tagovi",
    field: "tags",
  },
  { name: "actions", label: "Akcije", field: "actions" },
];

const getProducts = computed(() => {
  return product.products;
});

const filter = ref("");
const selected = ref([]);

function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""} selected of ${product.products.length}`;
}

function getEmptyProduct() {
  return {
    id: "",
    name: "",
    brand: "",
    model: "",
    description: "",
    price: 0,
    discount: 0,
    finalPrice: "0.00",
    itemsInStock: 0,
    images: [""],
    tags: [{ value: "", label: "" }],
    category: { value: "", label: "" },
    sex: { value: "", label: "" },
    featured: false,
  };
}

const previewImages = ref<any>([]);
function createPreviewImages(files: any) {
  previewImages.value = [];
  files.forEach((file: any, index: number) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push({ src: e.target?.result, id: index });
      };
      reader.readAsDataURL(file);
    }
  });
}

const isLoading = ref(false);
const dialog = ref(false);
const editingProduct = ref();
const productImages = ref();
const dialogTitle = ref("Novi proizvod");

const setName = () => {
  editingProduct.value.name =
    editingProduct.value.brand + " " + editingProduct.value.model;
};

const setFinalPrice = () => {
  editingProduct.value.finalPrice = (
    (editingProduct.value.price * (100 - editingProduct.value.discount)) /
    100
  ).toFixed(2);
};

const categoryOptions = [
  {
    value: "dioptric",
    label: "Dioptrijski okviri",
  },
  {
    value: "sunglasses",
    label: "Sunčane naočale",
  },
  {
    value: "lenses",
    label: "Kontaktne leće",
  },
  {
    value: "accessories",
    label: "Dodaci",
  },
];
const sexOptions = [
  {
    value: "kids",
    label: "Dječje",
  },
  {
    value: "unisex",
    label: "Unisex",
  },
  {
    value: "female",
    label: "Ženske",
  },
  {
    value: "male",
    label: "Muške",
  },
];
const tagsOptions = [
  {
    value: "new",
    label: "Novo",
  },
  {
    value: "sale",
    label: "Akcija",
  },
  {
    value: "promotion",
    label: "Promocija",
  },
  {
    value: "trending",
    label: "U trendu",
  },
];

function openAddEditDialog(currentProduct?: ProductType) {
  editingProduct.value = getEmptyProduct();
  dialogTitle.value = "Novi proizvod";
  productImages.value = null;

  if (currentProduct) {
    editingProduct.value = currentProduct;
    dialogTitle.value = "Uredi proizvod";
  }

  dialog.value = true;
}

async function addUpdateProduct() {
  isLoading.value = true;

  if (!editingProduct.value.id) {
    await product.add(editingProduct.value, productImages.value);
  } else {
    await product.update(editingProduct.value);
  }

  isLoading.value = false;
  dialog.value = false;
}

const $q = useQuasar();
function openDeleteDialog(id: string) {
  $q.dialog({
    title: "Potvrda",
    message: "Želite li izbrisati oovaj proizvod?",
    cancel: {
      label: "Odustani",
      noCaps: true,
      flat: true,
    },
    ok: {
      label: "Izbriši",
      noCaps: true,
    },
  }).onOk(async () => {
    isLoading.value = true;
    await product.deleteProduct(id);
    isLoading.value = false;
  });
}

function onRejected(er: any) {
  let message = "Dogodila se greška prilikom dodavanja slike.";
  if (er[0].failedPropValidation === "duplicate")
    message = "Odabrana slika je već dodana.";
  if (er[0].failedPropValidation === "max-files")
    message = "Moguće je dodati maksimalno 6 slika proizvoda.";
  if (er[0].failedPropValidation === "max-total-size")
    message = "Ukupna veličina odabranih slike nesmije prelazit 10MB.";

  $q.notify({
    type: "negative",
    message,
  });
}

const filePicker = ref();

const sortPreviewImages = computed(() => {
  return previewImages.value.sort((a: any, b: any) => a.id - b.id);
});

const handleMoveLeft = (id: number) => {
  previewImages.value[id].id--;
  previewImages.value[id - 1].id++;
};
const handleMoveRight = (id: number) => {
  previewImages.value[id].id++;
  previewImages.value[id + 1].id--;
};
function removeImage(index: number) {
  filePicker.value.removeAtIndex(index);
}
</script>

<template>
  <div class="tw-space-y-6">
    <q-table
      v-model:selected="selected"
      bordered
      flat
      title="Proizvodi"
      :rows="getProducts"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      :visible-columns="visibleColumns"
      selection="multiple"
      :filter="filter"
      rows-per-page-label="Proizvoda po stranici"
    >
      <template #top="props">
        <div class="tw-text-2xl tw-font-semibold">Proizvodi</div>

        <q-space />

        <div class="tw-flex tw-gap-2">
          <q-select
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            display-value="Prikaži/sakrij"
            emit-value
            map-options
            :options="columns"
            :filter="filter"
            option-value="name"
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

          <q-btn
            no-caps
            unelevated
            color="primary"
            icon="add"
            size="md"
            @click="openAddEditDialog()"
          >
            Dodaj novi proizvod
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
        </div>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td v-if="visibleColumns.includes('id')" key="id">
            {{ props.row.id }}
          </q-td>
          <q-td
            v-if="visibleColumns.includes('name')"
            key="name"
            :props="props"
            class="tw-max-w-[150px] tw-overflow-hidden tw-truncate"
          >
            {{ props.row.name }}
            <q-tooltip class="bg-primary !tw-text-xs" self="bottom middle">
              {{ props.row.name }}
            </q-tooltip>
          </q-td>
          <q-td v-if="visibleColumns.includes('model')" key="model">
            {{ props.row.model }}
          </q-td>
          <q-td v-if="visibleColumns.includes('brand')" key="brand">
            {{ props.row.brand }}
          </q-td>
          <q-td
            v-if="visibleColumns.includes('price')"
            key="price"
            class="tw-text-right"
          >
            {{ props.row.price }}
          </q-td>
          <q-td
            v-if="visibleColumns.includes('discount')"
            key="discount"
            class="tw-text-right"
          >
            {{ props.row.discount }}
          </q-td>
          <q-td
            v-if="visibleColumns.includes('finalPrice')"
            key="finalPrice"
            class="tw-text-right"
          >
            {{ props.row.finalPrice }}
          </q-td>
          <q-td
            v-if="visibleColumns.includes('images')"
            key="images"
            class="tw-z-50"
          >
            <q-img
              :src="props.row.images[0]"
              :alt="props.row.name"
              class="!tw-size-10 tw-rounded-xl tw-transition hover:tw-scale-[3]"
              fit="contain"
            />
          </q-td>
          <q-td
            v-if="visibleColumns.includes('itemsInStock')"
            key="itemsInStock"
            class="tw-text-right"
          >
            {{ props.row.itemsInStock }}
          </q-td>
          <q-td v-if="visibleColumns.includes('category')" key="category">
            {{ props.row.category.label }}
          </q-td>
          <q-td v-if="visibleColumns.includes('sex')" key="sex">
            {{ props.row.sex.label }}
          </q-td>
          <q-td v-if="visibleColumns.includes('tags')" key="tags">
            <div
              v-if="props.row.tags"
              class="tw-flex tw-max-w-[200px] tw-flex-wrap tw-gap-1"
            >
              <template v-for="tag in props.row.tags" :key="tag.value">
                <q-chip dense class="!tw-m-0">
                  {{ tag.label }}
                </q-chip>
              </template>
            </div>
          </q-td>
          <q-td v-if="visibleColumns.includes('actions')" key="actions">
            <q-btn
              flat
              dense
              size="md"
              icon="edit"
              color="grey-8"
              @click="openAddEditDialog(props.row)"
            />
            <q-btn
              flat
              dense
              size="md"
              icon="delete"
              color="grey-8"
              @click="openDeleteDialog(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <q-card class="!tw-max-w-2xl sm:tw-px-6 sm:tw-py-3">
        <q-card-section>
          <div class="tw-text-3xl tw-font-medium">{{ dialogTitle }}</div>
        </q-card-section>

        <q-card-section>
          <q-form
            class="tw-grid tw-grid-cols-2 tw-gap-4"
            @submit.prevent="addUpdateProduct"
          >
            <q-input
              v-model="editingProduct.brand"
              outlined
              label="Brand"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
              @update:model-value="setName"
            />
            <q-input
              v-model="editingProduct.model"
              outlined
              label="Model"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
              @update:model-value="setName"
            />
            <q-input
              v-model="editingProduct.name"
              outlined
              label="Naziv"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
              class="tw-col-span-2"
            />

            <q-editor
              v-model="editingProduct.description"
              placeholder="Opis proizvoda"
              :dense="$q.screen.lt.md"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify'],
                  },
                ],
                ['bold', 'italic', 'strike', 'underline', 'hr', 'link'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                ],

                ['undo', 'redo', 'fullscreen'],
              ]"
              class="tw-col-span-2"
            />

            {{ editingProduct.description }}

            <q-file
              ref="filePicker"
              v-model="productImages"
              label="Odabir slika"
              outlined
              use-chips
              multiple
              counter
              append
              max-files="6"
              max-total-size="10000000"
              accept=".jpg, image/*"
              class="tw-col-span-2"
              @rejected="onRejected"
              @update:model-value="createPreviewImages"
            />

            <TransitionGroup
              tag="ul"
              name="list"
              class="tw-relative tw-col-span-2 tw-grid tw-grid-cols-4 tw-gap-2"
            >
              <li v-for="img in sortPreviewImages" :key="img" class="tw-group">
                <q-img
                  :src="img.src"
                  alt="Slika proizvoda"
                  class="tw-z-10 tw-max-h-40 tw-rounded-xl"
                />

                <div
                  class="tw-flex -tw-translate-y-8 tw-justify-between tw-self-end tw-opacity-0 tw-transition tw-duration-300 group-hover:tw-translate-y-0 group-hover:tw-opacity-100"
                >
                  <q-btn
                    dense
                    flat
                    color="grey-8"
                    icon="chevron_left"
                    :disable="img.id === 0"
                    @click="handleMoveLeft(img.id)"
                  />
                  <q-btn
                    dense
                    flat
                    size="md"
                    color="grey-8"
                    icon="delete"
                    @click="removeImage(img.id)"
                  />
                  <q-btn
                    dense
                    flat
                    color="grey-8"
                    icon="chevron_right"
                    :disable="img.id === previewImages.length - 1"
                    @click="handleMoveRight(img.id)"
                  />
                </div>
              </li>
            </TransitionGroup>

            <ul class="tw-col-span-2 tw-grid tw-grid-cols-4 tw-gap-2">
              <li v-for="img in editingProduct.images" :key="img">
                <q-img
                  :src="img"
                  alt="Slika proizvoda"
                  class="tw-max-h-40 tw-rounded-xl"
                >
                  <div class="bg-transparent tw-absolute tw-right-0 !tw-p-0">
                    <q-btn dense flat color="red" icon="delete" />
                  </div>
                </q-img>
              </li>
            </ul>

            <div class="tw-col-span-2 tw-grid tw-grid-cols-3 tw-gap-4">
              <q-input
                v-model="editingProduct.price"
                outlined
                label="Cijena"
                suffix="€"
                fill-mask="0"
                reverse-fill-mask
                mask="#.##"
                input-class="text-right"
                @update:model-value="setFinalPrice"
              />
              <q-input
                v-model="editingProduct.discount"
                type="number"
                suffix="%"
                outlined
                label="Popust"
                min="0"
                max="100"
                input-class="text-right"
                @update:model-value="setFinalPrice"
              />
              <q-input
                v-model="editingProduct.finalPrice"
                suffix="€"
                outlined
                readonly
                label="Cijena s popustom"
                input-class="text-right"
              />
            </div>

            <q-select
              v-model="editingProduct.category"
              outlined
              :options="categoryOptions"
              label="Kategorija"
            />
            <q-select
              v-model="editingProduct.sex"
              outlined
              :options="sexOptions"
              label="Spol"
            />

            <q-select
              v-model="editingProduct.tags"
              outlined
              multiple
              use-chips
              :options="tagsOptions"
              label="Tagovi"
            />

            <q-input
              v-model="editingProduct.itemsInStock"
              type="number"
              min="0"
              outlined
              label="Dostupna količina"
            />
            <q-toggle
              v-model="editingProduct.featured"
              label="Prikaži na početnoj stranici"
              class="tw-col-span-2"
            />

            <div class="text-center tw-col-span-2">
              <q-btn
                v-close-popup
                no-caps
                flat
                label="Odustani"
                class="tw-mr-2"
              />
              <q-btn
                no-caps
                label="Spremi"
                type="submit"
                color="primary"
                :loading="isLoading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
.q-table th {
  font-size: 16px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
