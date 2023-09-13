import { auth, db } from './firebase';


export default async function signUp(email,password,userType){
    let result = null,
    error = null;
    try {

      await auth.createUserWithEmailAndPassword(email, password);
      await db.collection("users").doc(email).set({
        email: email,
        userType: userType,
      });
      console.log(`Sign up with email: ${email} and password: ${password} and userType: ${userType}`);
    } catch (error) {
      console.log(error);
    }
    return { result, error };
}