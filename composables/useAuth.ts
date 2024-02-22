import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const db = useFirestore();
  const auth = useFirebaseAuth()!;
  const provider = new GoogleAuthProvider();
  const userStore = useUserStore();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      userStore.fetch();
      await navigateTo("/account");
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,
        name,
        email: user.user.email,
        photoURL: user.user.photoURL,
        role: "customer",
      });

      userStore.fetch();

      await navigateTo("/account");

      if (auth.currentUser) sendEmailVerification(auth.currentUser);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  const googleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      const res = await userStore.fetch();

      if (!res) {
        await setDoc(doc(db, "users", user.user.uid), {
          uid: user.user.uid,
          name: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL,
          role: "customer",
        });
      }

      await navigateTo("/account");
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  return { login, register, googleLogin };
};
