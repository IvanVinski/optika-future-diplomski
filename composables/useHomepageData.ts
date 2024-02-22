import { collection, getDocs, query, where } from "firebase/firestore";
export const useHomepageData = () => {
  const db = useFirestore();

  const products = ref<Product[]>([]);

  onMounted(async () => {
    const q = query(
      collection(db, "products"),
      where("showOnHomepage", "==", true),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => products.value.push(doc.data() as Product));
  });

  return { products };
};
