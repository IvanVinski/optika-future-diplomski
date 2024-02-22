<script lang="ts" setup>
import { type QTableColumn } from "quasar";

const $q = useQuasar();
const isLoading = ref(false);
const branch = useBranchStore();

const dialog = ref(false);
const dialogTitle = ref("Nova poslovnica");

const editingBranch = ref();
function getEmptyBranch() {
  return {
    id: "",
    name: "",
    coordinates: { lat: 0, lng: 0 },
    address: "",
    phone: "",
    email: "",
    working_hours: "",
  };
}

async function addUpdateBranch() {
  isLoading.value = true;

  if (!editingBranch.value.id) {
    await branch.add(editingBranch.value);
  } else {
    await branch.update(editingBranch.value);
  }

  isLoading.value = false;
  dialog.value = false;
}

function openAddEditDialog(currentBranch?: Branch) {
  editingBranch.value = getEmptyBranch();
  dialogTitle.value = "Nova poslovnica";

  if (currentBranch) {
    editingBranch.value = currentBranch;
    dialogTitle.value = "Uredi poslovnicu";
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
    await branch.deleteBranch(id);
    isLoading.value = false;
  });
}

const columns: QTableColumn[] = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "name", align: "left", label: "Ime", field: "name", sortable: true },
  {
    name: "coordinates",
    align: "left",
    label: "Koordinate",
    field: "coordinates",
    sortable: true,
    format: (val: any) => `${val.lat}, ${val.lng}`,
  },
  {
    name: "address",
    align: "left",
    label: "Adresa",
    field: "address",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Telefon",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "working_hours",
    align: "left",
    label: "Radno vrijeme",
    field: "working_hours",
    sortable: true,
  },
  { name: "actions", align: "left", label: "Akcije", field: "actions" },
];
</script>

<template>
  <div>
    <q-table
      flat
      bordered
      title="Poslovnice"
      :rows="branch.branches"
      :columns="columns"
      row-key="id"
      rows-per-page-label="Poslovnica po stranici"
      no-data-label="Nije pronađena niti jedna poslovnica"
      :loading="isLoading"
    >
      <template #top="props">
        <div class="tw-text-2xl tw-font-semibold">Poslovnice</div>

        <q-space />

        <q-btn
          no-caps
          unelevated
          size="md"
          color="primary"
          icon="add"
          label="Dodaj poslovnicu"
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

      <template #body="props">
        <q-tr :props="props">
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
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="coordinates" :props="props"
            >{{ props.row.coordinates.lat }},
            {{ props.row.coordinates.lng }}</q-td
          >
          <q-td
            key="address"
            :props="props"
            class="tw-max-w-[160px] tw-overflow-hidden tw-truncate"
          >
            {{ props.row.address }}
            <q-tooltip class="bg-primary !tw-text-xs" self="bottom middle">
              {{ props.row.address }}
            </q-tooltip>
          </q-td>
          <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
          <q-td
            key="email"
            :props="props"
            class="tw-max-w-[120px] tw-overflow-hidden tw-truncate"
          >
            {{ props.row.email }}
            <q-tooltip class="bg-primary !tw-text-xs" self="bottom middle">
              {{ props.row.email }}
            </q-tooltip>
          </q-td>
          <q-td key="working_hours" :props="props">
            {{ props.row.working_hours }}
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
      </template>

      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <q-card class="tw-w-full sm:tw-px-6 sm:tw-py-3">
        <q-card-section>
          <div class="tw-text-3xl tw-font-medium">{{ dialogTitle }}</div>
        </q-card-section>

        <q-card-section>
          <q-form class="tw-space-y-4" @submit.prevent="addUpdateBranch">
            <q-input
              v-model="editingBranch.name"
              outlined
              label="Ime poslovnice"
              :rules="[(val) => !!val || 'Obavezno polje']"
              hide-bottom-space
            />
            <div class="tw-grid tw-grid-cols-2 tw-gap-4">
              <q-input
                v-model="editingBranch.coordinates.lat"
                type="number"
                outlined
                label="Zemljopisna širina"
              />
              <q-input
                v-model="editingBranch.coordinates.lng"
                type="number"
                outlined
                label="Zemljopisna dužina"
              />
            </div>
            <q-input v-model="editingBranch.address" outlined label="Adresa" />
            <q-input v-model="editingBranch.phone" outlined label="Telefon" />
            <q-input
              v-model="editingBranch.email"
              outlined
              label="Email"
              :rules="['email']"
              hide-bottom-space
            />
            <q-input
              v-model="editingBranch.working_hours"
              outlined
              label="Radno vrijeme"
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
