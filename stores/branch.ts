import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";

export const useBranchStore = defineStore("branch", () => {
  const db = useFirestore();

  const branches = ref<Branch[]>([]);

  async function fetchBranches() {
    const q = query(collection(db, "branches"), orderBy("name", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      branches.value.push(doc.data() as Branch);
    });
  }

  async function add(branch: Branch) {
    const newBranchRef = doc(collection(db, "branches"));
    const newBranchData = { ...branch, id: newBranchRef.id };

    await setDoc(newBranchRef, newBranchData);
    branches.value.push(newBranchData);
  }

  async function update(branch: Branch) {
    const branchRef = doc(db, "branches", branch.id);
    await updateDoc(branchRef, branch);

    const index = branches.value.findIndex((b) => b.id === branch.id);
    if (index !== -1) {
      branches.value[index] = branch;
    }
  }

  async function deleteBranch(id: string) {
    await deleteDoc(doc(db, "branches", id));
    branches.value = branches.value.filter((b) => b.id !== id);
  }

  return { branches, fetchBranches, add, update, deleteBranch };
});
