<script lang="ts" setup>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref as fbRef, uploadBytes, getDownloadURL } from "firebase/storage";

const db = useFirestore();
const storage = useFirebaseStorage();

const aboutRef = doc(db, "general", "about-us");
const docSnap = await getDoc(aboutRef);
const about = ref<About>({
  title: "",
  content: "",
  image: "",
});

const isEdit = ref(false);
const isLoading = ref(false);
const image = ref();
const previewImage = ref();

if (docSnap.exists()) {
  about.value = docSnap.data() as About;
  previewImage.value = about.value.image;
}

const handleSubmit = async () => {
  isLoading.value = true;
  const storageRef = fbRef(storage, "general/about-us.jpg");

  const snapshot = await uploadBytes(storageRef, image.value);
  const url = await getDownloadURL(snapshot.ref);

  await updateDoc(aboutRef, {
    title: about.value.title,
    content: about.value.content,
    image: url,
  });

  isLoading.value = false;
  isEdit.value = false;
};

function createPreviewImage(file: any) {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result;
    };
    reader.readAsDataURL(file);
  } else previewImage.value = null;
}
</script>

<template>
  <div class="tw-p-5">
    <h3 class="tw-mb-12">O nama</h3>

    <q-form
      class="tw-mx-auto tw-grid tw-max-w-7xl tw-gap-6 lg:tw-grid-cols-3"
      @submit="handleSubmit"
    >
      <div class="tw-mb-6">
        <div v-if="isEdit">
          <label for="image" class="tw-text-lg tw-font-bold">Slika</label>
          <q-file
            v-model="image"
            name="image"
            for="image"
            outlined
            label="Odaberi sliku"
            clearable
            class="tw-mt-1"
            @update:model-value="createPreviewImage"
          >
            <template #prepend>
              <q-icon name="image" />
            </template>
          </q-file>
        </div>
        <div>
          <q-img
            v-if="previewImage"
            :src="previewImage"
            alt="Image Preview"
            class="tw-mt-6 tw-rounded-xl"
          >
            <template #error>
              <div
                class="absolute-full text-white flex flex-center !tw-bg-gray-300"
              >
                <q-icon name="fa-regular fa-image" size="100px" />
              </div>
            </template>
          </q-img>
          <q-responsive v-else :ratio="4 / 3">
            <div
              class="text-white flex flex-center tw-mt-6 tw-rounded-xl tw-bg-gray-300"
            >
              <q-icon name="fa-regular fa-image" size="100px" />
            </div>
          </q-responsive>
        </div>
      </div>

      <div class="tw-space-y-6 lg:tw-col-span-2">
        <div>
          <label for="title" class="tw-text-lg tw-font-bold">Naslov</label>
          <q-input
            v-model="about.title"
            for="title"
            outlined
            :readonly="!isEdit"
            class="tw-mt-1 !tw-text-lg"
          />
        </div>
        <div>
          <label class="tw-text-lg tw-font-bold">Sadržaj</label>
          <q-editor
            v-model="about.content"
            for="content"
            outlined
            :readonly="!isEdit"
            class="tw-mt-1 !tw-text-lg"
          />
        </div>
      </div>

      <div class="tw-text-right lg:tw-col-span-3 lg:tw-mt-6">
        <div v-if="isEdit">
          <q-btn no-caps flat label="Odustani" @click="isEdit = false" />
          <q-btn
            no-caps
            type="submit"
            color="primary"
            label="Spremi"
            :loading="isLoading"
          />
        </div>
        <q-btn
          v-else
          no-caps
          color="primary"
          icon="edit_note"
          label="Uredi"
          @click="isEdit = true"
        />
      </div>
    </q-form>
  </div>
</template>
