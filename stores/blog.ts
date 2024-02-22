import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref as fbRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { defineStore } from "pinia";

export const useBlogStore = defineStore("Blog", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const blog = ref<Blog[]>([]);

  async function fetchBlog() {
    const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      blog.value.push(doc.data() as Blog);
    });
  }

  async function add(data: Blog, image: any) {
    const storageRef = fbRef(storage, `blog/${data.slug}/${image.name}`);

    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);

    const newBlogRef = doc(collection(db, "blog"));
    const newBlogData = {
      ...data,
      id: newBlogRef.id,
      image: url,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(newBlogRef, newBlogData);
    blog.value.push(newBlogData);
  }

  async function update(data: Blog, image: any) {
    const newData = data;

    if (image) {
      const oldImageRef = fbRef(storage, data.image);

      await deleteObject(oldImageRef);

      const storageRef = fbRef(storage, `blog/${data.slug}/${image.name}`);

      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      newData.image = url;
    }

    newData.updatedAt = Timestamp.now();

    const blogRef = doc(db, "blog", data.id);
    await updateDoc(blogRef, newData);

    const index = blog.value.findIndex((b) => b.id === data.id);
    if (index !== -1) {
      blog.value[index] = newData;
    }
  }

  async function deleteBlog(id: string) {
    await deleteDoc(doc(db, "blog", id));
    blog.value = blog.value.filter((b) => b.id !== id);
  }

  return { blog, fetchBlog, add, update, deleteBlog };
});
