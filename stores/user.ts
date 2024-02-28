import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const db = useFirestore();

  const user = useCurrentUser();
  const data = ref<User>();
  const orders = ref<Order[]>([]);

  async function fetch() {
    if (user.value) {
      const docRef = doc(db, "users", user.value.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        data.value = docSnap.data() as User;
        fetchOrders();
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

  async function fetchOrders() {
    if (user.value) {
      orders.value = [];
      const userRef = doc(db, "users", user.value.uid);
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("user", "==", userRef));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        orders.value.push(doc.data() as Order);
      });
    }
  }

  return { data, fetch, update, orders, fetchOrders };
});
