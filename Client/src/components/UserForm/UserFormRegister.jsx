import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import validationRegister from "./validationRegister";
import toast from "react-hot-toast";
import { register } from "../../Redux/Actions/authActions";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'; // Importa useTranslation desde react-i18next

export default function UserFormRegister({ title = "Register" }) {
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Usa el hook useTranslation para acceder a las traducciones
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    password: "",
    city: "",
    state: "",
    email: "",
    nro_document: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const cartBackGround = theme === "dark" ? "#272727" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const memoizedErrors = useMemo(() => {
    return validationRegister(formData);
  }, [formData]);

  useEffect(() => {
    setErrors(memoizedErrors);
  }, [memoizedErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(memoizedErrors).length === 0) {
      try {
        dispatch(register(formData,t));
      } catch (error) {
        toast.error(t('signUp.registerFailed')); // Traduce el mensaje de error de registro
      }
    }
  };

  return (
    <div
      className="flex relative top-0 left-0 bg-opacity-100 md:w-screen sm:w-screen sm:h-screen items-center justify-center w-full h-screen"
      style={{ background: backgroundColor }}
    >
      <form
        className="max-w-sm p-4 h-auto bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
        style={{ background: cartBackGround }}
      >
        <h1 className="text-center mx-4 mb-4 text-3xl text-primary border-b-2">
          <strong>{t('signUp.registerTitle')}</strong>
        </h1>
        <div className="flex flex-wrap mx-2 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-first-name"
              style={{ color: textColor }}
            >
              {t('personalDetails.name')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.name && errors.name
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-first-name"
              type="text"
              placeholder={t('personalDetails.placeHolder.name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-last-name"
              style={{ color: textColor }}
            >
              {t('personalDetails.lastname')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                touched.lastname && errors.lastname
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-last-name"
              type="text"
              placeholder={t('personalDetails.placeHolder.lastName')}
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastname && errors.lastname && (
              <p className="text-red-500 text-xs italic">{errors.lastname}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mx-2 mb-1">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-password"
              style={{ color: textColor }}
            >
              {t('personalDetails.password')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-password"
              type="password"
              placeholder={t('personalDetails.placeHolder.password')}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mx-2 mb-1">
          <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-city"
              style={{ color: textColor }}
            >
              {t('personalDetails.city')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.city && errors.city
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-city"
              type="text"
              placeholder={t('personalDetails.placeHolder.city')}
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.city && errors.city && (
              <p className="text-red-500 text-xs italic">{errors.city}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-state"
              style={{ color: textColor }}
            >
              {t('personalDetails.state')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                touched.state && errors.state
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-state"
              type="text"
              placeholder={t('personalDetails.placeHolder.state')}
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.state && errors.state && (
              <p className="text-red-500 text-xs italic">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mx-2 mb-1">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-nro_document"
              style={{ color: textColor }}
            >
              {t('personalDetails.document')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.nro_document && errors.nro_document
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-nro_document"
              type="text"
              placeholder={t('personalDetails.placeHolder.documentNumber')}
              name="nro_document"
              value={formData.nro_document}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.nro_document && errors.nro_document && (
              <p className="text-red-500 text-xs italic">
                {errors.nro_document}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mx-2 mb-1">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="grid-email"
              style={{ color: textColor }}
            >
              {t('personalDetails.email')}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="grid-email"
              type="email"
              placeholder={t('personalDetails.placeHolder.email')}
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {t('register')}
          </button>
        </div>
      </form>
    </div>
  );
}
