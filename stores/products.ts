import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref as fbRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const products = ref<ProductType[]>([]);

  async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      products.value.push(doc.data() as ProductType);
    });
  }

  async function add(product: ProductType, images: any) {
    const newProductRef = doc(collection(db, "products"));

    const uploadPromises = images.map(async (img: any) => {
      const storageRef = fbRef(
        storage,
        `products/${product.name}-${newProductRef.id}/${img.name}`,
      );

      const snapshot = await uploadBytes(storageRef, img);
      return getDownloadURL(snapshot.ref);
    });

    const imageUrls = await Promise.all(uploadPromises);

    const data = product;
    data.images = imageUrls;

    const newProduct = { ...data, id: newProductRef.id };

    await setDoc(newProductRef, newProduct);
    products.value.push(newProduct);
  }

  async function update(product: ProductType) {
    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, product);

    const index = products.value.findIndex((b) => b.id === product.id);
    if (index !== -1) {
      products.value[index] = product;
    }
  }

  async function deleteProduct(id: string) {
    await deleteDoc(doc(db, "products", id));
    products.value = products.value.filter((b) => b.id !== id);
  }

  return { products, fetchProducts, add, update, deleteProduct };
});
