import { useState, useEffect } from "react";
import validationLogin from "./validationLogin";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { doSignWithFacebook, doSignInWithGoogle } from "../../firebase/auth";
import {
  login,
  resetPassword,
  sendNewPassword,
} from "../../Redux/Actions/authActions";

export default function UserFormLogin({ title, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    token: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    token: "",
  });
  const [view, setView] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
      setFormData((prevState) => ({ ...prevState, token }));
      setView("reset");
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validationLogin({ ...formData, [name]: value }, errors, setErrors);

    // Si se está cambiando la contraseña nueva o la confirmación
    if (name === "newPassword" || name === "confirmPassword") {
      if (name === "newPassword") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "", // Limpiar el error al cambiar la nueva contraseña
        }));
      }
      if (name === "confirmPassword") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword:
            value !== formData.newPassword ? "Passwords do not match" : "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationLogin(formData, errors, setErrors);
    const noErrors = Object.keys(errors).every((key) => errors[key] === "");

    if (noErrors && formData.newPassword === formData.confirmPassword) {
      try {
        if (view === "login") {
          dispatch(login(formData));
        } else if (view === "reset") {
          dispatch(sendNewPassword(formData));
        }

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error("Operation failed. Please try again.");
        console.log(error.message);
      }
    } else {
      toast.error("Please fix the errors before submitting the form.");
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (formData.email) {
      dispatch(resetPassword(formData.email));
      setView("reset");
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email.",
      }));
    }
  };

  const onFacebookSignIn = async (e) => {
    e.preventDefault();
    dispatch(doSignWithFacebook());
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    dispatch(doSignInWithGoogle());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        className="bg-white text-center shadow-md p-2 rounded-xl w-full max-w-sm space-y-6"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="flex top-0 right-0 text-3xl text-gray-800 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="text-center text-2xl text-primary border-b-2 pb-2">
          <strong>{title}</strong>
        </h1>
        {view === "login" && (
          <>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  id="email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  id="password"
                  type="password"
                  placeholder=""
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView("forgotPassword")}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Forgot your password?
              </button>
              <Link
                to="/signup"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Register
              </Link>
            </div>
            <div className="mt-6 flex justify-center gap-2 items-center flex-col">
              <button
                onClick={onGoogleSignIn}
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span className="block w-max ml-1 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
              <button
                onClick={onFacebookSignIn}
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                    className="absolute left-0 w-5"
                    alt="Facebook logo"
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Facebook
                  </span>
                </div>
              </button>
            </div>
          </>
        )}
        {view === "forgotPassword" && (
          <>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Enter your email to reset password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  id="email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePasswordReset}
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setView("login")}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Back to login
              </button>
            </div>
          </>
        )}
        {view === "reset" && (
          <>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="token"
                >
                  Please enter the token that you have received via email.
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.token ? "border-red-500" : ""
                  }`}
                  id="token"
                  type="text"
                  placeholder="Enter your token"
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                />
                {errors.token && (
                  <p className="text-red-500 text-xs italic">{errors.token}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                  id="newPassword"
                  type="password"
                  placeholder=""
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  id="confirmPassword"
                  type="password"
                  placeholder=""
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={() => setView("login")}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
