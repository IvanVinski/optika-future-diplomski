<script lang="ts" setup>
import { type QTableColumn } from "quasar";

const $q = useQuasar();
const isLoading = ref(false);
const blog = useBlogStore();

const dialog = ref(false);
const dialogTitle = ref("Novi blog post");

const editingBlog = ref();
const newBlogImage = ref();
function getEmptyBlog() {
  return {
    id: "",
    title: "",
    slug: "",
    summary: "",
    content: "",
    tags: "",
    featured: false,
    published: false,
  };
}

const previewImage = ref();
function createPreviewImage(file: any) {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result;
    };
    reader.readAsDataURL(file);
  }
}

function generateSlug(title: string) {
  return title
    .toLowerCase() // Convert to lower case
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/č/g, "c") // Replace č with c
    .replace(/ć/g, "c") // Replace ć with c
    .replace(/ž/g, "z") // Replace ž with z
    .replace(/š/g, "s") // Replace š with s
    .replace(/đ/g, "d") // Replace đ with d
    .replace(/[^\w-]+/g, "") // Remove all non-word chars (punctuation, special characters)
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Trim hyphen from start
    .replace(/-+$/, ""); // Trim hyphen from end
}
function updateSlug(val: any) {
  editingBlog.value.slug = generateSlug(val);
}

async function addUpdateBlog() {
  isLoading.value = true;

  if (!editingBlog.value.id) {
    await blog.add(editingBlog.value, newBlogImage.value);
  } else {
    await blog.update(editingBlog.value, newBlogImage.value);
  }

  isLoading.value = false;
  dialog.value = false;
}

function openAddEditDialog(currentBlog?: Blog) {
  editingBlog.value = getEmptyBlog();
  previewImage.value = "";
  dialogTitle.value = "Novi blog post";

  if (currentBlog) {
    previewImage.value = currentBlog.image;
    editingBlog.value = currentBlog;
    dialogTitle.value = "Uredi post";
  }

  dialog.value = true;
}

function openDeleteDialog(id: string) {
  $q.dialog({
    title: "Potvrda",
    message: "Želite li izbrisati ovu poslovnicu?",
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
    await blog.deleteBlog(id);
    isLoading.value = false;
  });
}

const columns: QTableColumn[] = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "title",
    required: true,
    label: "Naslov",
    align: "left",
    field: (row) => row.title,
    sortable: true,
  },
  { name: "slug", align: "left", label: "Slug", field: "slug", sortable: true },
  {
    name: "createdAt",
    align: "left",
    label: "Datum objave",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "updatedAt",
    align: "left",
    label: "Datum ažuriranja",
    field: "updatedAt",
    sortable: true,
  },
  { name: "tags", label: "Tagovi", field: "tags", align: "left" },
  { name: "image", label: "Slika", field: "image" },
  { name: "actions", label: "Akcije", field: "actions" },
];
</script>

<template>
  <div>
    <q-table
      flat
      bordered
      title="Blog"
      :rows="blog.blog"
      :columns="columns"
      row-key="id"
      rows-per-page-label="Blog postova po stranici"
      no-data-label="Nije pronađen niti jedan blog"
      :loading="isLoading"
    >
      <template #top="props">
        <div class="tw-text-2xl tw-font-semibold">Blog</div>

        <q-space />

        <q-btn
          no-caps
          unelevated
          size="md"
          color="primary"
          icon="add"
          label="Dodaj blog"
          @click="openAddEditDialog()"
        />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          class="tw-ml-2"
          @click="props.toggleFullscreen"
        />
      </template>

      <template #header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              :icon="props.expand ? 'remove' : 'add'"
              @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td
            key="id"
            :props="props"
            class="tw-max-w-[100px] tw-overflow-hidden tw-truncate"
          >
            {{ props.row.id }}
            <q-tooltip class="bg-primary !tw-text-xs" self="bottom middle">
              {{ props.row.id }}
            </q-tooltip>
          </q-td>
          <q-td
            key="title"
            :props="props"
            class="tw-max-w-[150px] tw-overflow-hidden tw-truncate"
          >
            {{ props.row.title }}
            <q-tooltip class="bg-primary !tw-text-xs" self="bottom middle">
              {{ props.row.title }}
            </q-tooltip>
          </q-td>
          <q-td
            key="slug"
            :props="props"
            class="tw-max-w-[150px] tw-overflow-hidden tw-truncate"
          >
            {{ props.row.slug }}
            <q-tooltip class="bg-primary !tw-text-xs" self="bottom middle">
              {{ props.row.slug }}
            </q-tooltip>
          </q-td>
          <q-td key="createdAt" :props="props">
            {{ toLocalDate(props.row.createdAt) }}
          </q-td>
          <q-td key="updatedAt" :props="props">
            {{ toLocalDate(props.row.updatedAt) }}
          </q-td>
          <q-td key="tags" :props="props">
            <div
              v-if="props.row.tags"
              class="tw-flex tw-max-w-[200px] tw-flex-wrap tw-gap-1"
            >
              <template
                v-for="(tag, index) in props.row.tags.split(',')"
                :key="index"
              >
                <q-chip dense class="!tw-m-0">
                  {{ tag }}
                </q-chip>
              </template>
            </div>
          </q-td>
          <q-td key="image" :props="props">
            <q-img
              :src="props.row.image"
              class="!tw-size-10 tw-rounded-xl tw-transition hover:tw-z-20 hover:tw-scale-[2.5]"
              :alt="props.row.title"
            />
          </q-td>
          <q-td key="actions" :props="props">
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
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="tw-text-wrap tw-text-base">
              <div>
                <h6>Sažetak</h6>
                {{ props.row.summary }}
              </div>

              <q-separator spaced="20px" />

              <h6>Sadržaj bloga</h6>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="props.row.content"></div>
            </div>
          </q-td>
        </q-tr>
      </template>

      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <q-card class="!tw-w-full !tw-max-w-5xl sm:tw-px-6 sm:tw-py-3">
        <q-card-section>
          <div class="tw-text-3xl tw-font-medium">{{ dialogTitle }}</div>
        </q-card-section>

        <q-card-section>
          <q-form class="tw-space-y-4" @submit.prevent="addUpdateBlog">
            <q-input
              v-model="editingBlog.title"
              outlined
              label="Naslov"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
              @update:model-value="updateSlug"
            />

            <q-input
              v-model="editingBlog.slug"
              outlined
              label="Slug"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
            />

            <q-input
              v-model="editingBlog.summary"
              type="textarea"
              outlined
              label="Sažetak"
            />
            <q-file
              v-model="newBlogImage"
              outlined
              label="Odaberi sliku"
              counter
              hint="Max 5MB"
              max-total-size="5000000"
              accept=".jpg, image/*"
              @update:model-value="createPreviewImage"
            />

            <q-img
              v-if="previewImage"
              :src="previewImage"
              alt="Slika za blog post"
              class="tw-rounded-xl"
            />

            <q-editor
              v-model="editingBlog.content"
              placeholder="Sadržaj bloga"
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

            <q-input v-model="editingBlog.tags" outlined label="Tagovi" />

            <q-toggle
              v-model="editingBlog.featured"
              label="Prikaži na početnoj stranici"
              class="tw-mr-4"
            />

            <q-toggle
              v-model="editingBlog.published"
              label="Prikaži/sakrij blog"
            />

            <div class="text-center">
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
