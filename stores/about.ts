import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";

export const useAboutStore = defineStore("about", () => {
  const db = useFirestore();

  const data = ref({
    title: "",
    content: "",
    image: "",
  });

  async function fetch() {
    const docRef = doc(db, "general", "about-us");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      data.value = docSnap.data() as About;
    }
  }

  return { data, fetch };
});
