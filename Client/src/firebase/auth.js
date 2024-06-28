import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import store from "../Redux/Store/Store";
import { loginWithFacebook, loginWithGoogle } from "../Redux/Actions/authActions";
import rutaBack from "../Redux/Actions/rutaBack";

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await fetch(`${rutaBack}/login/auth/third`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    console.log("Response sing in Google: "+ response)

    if (response.ok) {
      const data = await response.json();
      console.log("Data where response is ok: "+data);

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
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken()

    const response = await fetch(`${rutaBack}/login/auth/third`, {
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