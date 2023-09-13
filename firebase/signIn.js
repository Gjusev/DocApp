
import { auth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

export default async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);

      const userDoc = await getDoc(doc(db, "users", userCredential.user.email));
      console.log(userDoc.data());
      const userRole = userDoc.data().userType;
      if (userRole === "Company") {
        console.log("Company");
      }

      console.log(`Login with email: ${email} and password: ${password}`);
    } catch (e) {
        error = e;
    }

    return { result, error };
}