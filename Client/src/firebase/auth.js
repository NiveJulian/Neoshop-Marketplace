import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "./firebase";
import store from "../Redux/Store/Store";
import { loginWithFacebook, loginWithGoogle } from "../Redux/Actions/Actions";

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const doSignInWithEmailAndPassowrd = async (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("result en funcion del auth:", result);
    const token = await result.user.getIdToken();

    // Envía el token al backend
    const response = await fetch("http://localhost:3001/login/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const userInfo = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
      };

      store.dispatch(loginWithGoogle(userInfo));
      localStorage.setItem("authToken", token);
      window.location.href = "/Home";
    } else {
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const doSignWithFacebook = async () => {
  try {
    console.log("hola");
    const provider = new FacebookAuthProvider();
    console.log("provider de facebook:", provider);
    const result = await signInWithPopup(auth, provider);
    console.log('result de facebook:', result);
    const token = await result.user.getIdToken()
    console.log("token de facebook:", token);

    const response = await fetch("http://localhost:3001/login/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const userInfo = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
      };

      store.dispatch(loginWithFacebook(userInfo));
      localStorage.setItem("authToken", token);
      window.location.href = "/Home";
    } else {
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error:", error);
  }  
};



export const doSignOut = () => {
  return auth.signOut();
};
// Funciones en caso de usarse despues: PasswordReset, PasswordChange, EmailVerification

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/Home`,
//     });
// };