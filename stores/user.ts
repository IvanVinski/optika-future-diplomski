import { doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const db = useFirestore();

  const user = useCurrentUser();
  const data = ref<User>();

  async function fetch() {
    if (user.value) {
      const docRef = doc(db, "users", user.value.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        data.value = docSnap.data() as User;
        return true;
      } else return false;
    }
  }

  async function update(data: any) {
    if (user.value) {
      const docRef = doc(db, "users", user.value.uid);
      await updateDoc(docRef, data);
      await fetch();
    }
  }

  return { data, fetch, update };
});
