import { auth, db, storage } from "./firebase"; // Assuming you have a storage object in your firebase setup
import { doc, getDoc } from "firebase/firestore";

export default async function signUp(
  email,
  password,
  userType,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  isCompanyEmailAvailable,
  photoURL
) {
  let result = null,
    error = null;
  try {
    // Create user with email and password
    await auth.createUserWithEmailAndPassword(email, password);
    console.log(
      "email",
      email,
      "password",
      password,
      "userType",
      userType,
      "companyAddress",
      companyAddress,
      "companyEmail",
      companyEmail,
      "companyPhone",
      companyPhone,
      "isCompanyEmailAvailable",
      isCompanyEmailAvailable,
      "photoURL",
      photoURL
    );
    // Set basic user data
    const userDoc = db.collection("users").doc(email);
    await db.collection("users").doc(email).set({
      email: email,
      userType: userType,
      companyName,
      companyAddress: companyAddress,
      companyEmail: companyEmail,
      companyPhone: companyPhone,
      photoURL: photoURL, // Store the photo URL in the database
    });

    // Handle linked users
    if (userType === "normal" && isCompanyEmailAvailable) {
      // Normal user linked to company
      const companyDoc = await getDoc(doc(db, "users", companyEmail));
      console.log("companyDoc", companyDoc);
      await userDoc.update({
        companyName: companyDoc.data().companyName,
        companyPhone: companyDoc.data().companyPhone,
        companyAddress: companyDoc.data().companyAddress,
        photoURL: companyDoc.data().photoURL,
      });
    }

    console.log(
      `Sign up with email: ${email} and password: ${password} and userType: ${userType}`
    );
  } catch (error) {
    console.log(error);
  }
  return { result, error };
}
