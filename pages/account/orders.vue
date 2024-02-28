<script lang="ts" setup>
import { type QTableColumn } from "quasar";

useSeoMeta({
  title: "Optika Future | Moje narudžbe",
});

const user = useUserStore();

const columns: QTableColumn[] = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: "id",
  },
  {
    name: "date",
    align: "left",
    label: "Datum narudžbe",
    field: (row: any) => toLocalDate(row.date),
    sortable: true,
  },
  { name: "status", label: "Status", field: "status", sortable: true },
  {
    name: "total",
    label: "Ukupno (€)",
    field: (row: any) => row.total.toFixed(2),
    sortable: true,
  },
  // { name: "action", label: "Akcije", field: "action" },
];
</script>

<template>
  <q-card flat bordered class="tw-w-full tw-p-6 md:tw-p-12">
    <h4 class="tw-mb-12 tw-text-3xl tw-font-medium">Moje narudžbe</h4>

    <div v-if="user.data && user.orders">
      <q-table
        flat
        bordered
        :rows="user.orders"
        :columns="columns"
        row-key="id"
        rows-per-page-label="Narudžbi po stranci"
      >
        <!-- <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn flat dense color="grey-7" icon="visibility" />
          </q-td>
        </template> -->
      </q-table>
    </div>

    <div v-else>Niste obavili niti jednu narudžbu.</div>
  </q-card>
</template>
