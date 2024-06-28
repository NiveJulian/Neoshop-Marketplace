import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAddress } from "../Redux/Actions/authActions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { uploadImages } from "../Redux/Actions/updateImageActions";

export const AdressUser = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themes.theme);
  const navigate = useNavigate()
  const img = useSelector((state) => state.updateImage.images); // Obtener la imagen del store

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const cartBackGround = theme === "dark" ? "#1c1c1c" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    adress_street: "",
    adress_nro: "",
    city: "",
    state: "",
    postalCode: "",
    phone_number: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        adress_street: user.adress_street || "",
        adress_nro: user.adress_nro || "",
        city: user.city || "",
        state: user.state || "",
        postalCode: user.postalCode || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      id_user: user.id_user,
      email: user.email,
      adress_street: formData.adress_street,
      adress_nro: formData.adress_nro,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      phone_number: formData.phone_number,
      picture: img ? img[0][0] : user.picture, // Si hay una imagen nueva, usarla; de lo contrario, mantener la actual del usuario
    };
    console.log(dataToSend);
    dispatch(updateUserAddress(dataToSend, navigate));
  };

  const handleImageUpload = async (event) => {
    setIsUploading(true);
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadImages(formData, t));

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
  };

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center"
      style={{ background: backgroundColor }}
    >
      <div
        className="container rounded-2xl max-w-4xl mx-auto"
        style={{ background: cartBackGround }}
      >
        <div className="text-center m-8" style={{ color: textColor }}>
          <h2 className="font-semibold text-3xl">{t('adressUser.edit')}</h2>
          <p className="font-medium text-lg mt-2">{t('adressUser.details')}</p>
          <p>{t('adressUser.please')}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded p-2 px-4 md:p-8 mt-6 mb-6 mx-auto max-w-3xl"
          style={{ background: cartBackGround, color: textColor }}
        >
          <div className="flex justify-center items-center">
            <div className="rounded-sm w-full py-2 px-4">
              <div className="mb-2 flex justify-center items-center gap-1">
                {isUploading && <p>{t("storeRegister.uploading")}</p>}
                {img && img.length > 0 ? (
                  <div
                    className="mt-4"
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={img[0][0]} // Mostrar la imagen del estado global img si está disponible
                      alt="User"
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                  </div>
                ) : (
                  <div
                    className="mt-4"
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={user.picture} // Mostrar la imagen actual del usuario si img está vacío
                      alt="User"
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="imageUploadInput"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple={false}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="full_name" style={{ color: textColor }}>
                    {t('adressUser.name')}
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600 cursor-not-allowed"
                    value={user.name + " " + (user.lastname || "")}
                    disabled
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email" style={{ color: textColor }}>
                    {t('adressUser.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-600 cursor-not-allowed"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="adress_street" style={{ color: textColor }}>
                    {t('adressUser.street')}
                  </label>
                  <input
                    type="text"
                    name="adress_street"
                    id="adress_street"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600"
                    value={formData.adress_street}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="adress_nro" style={{ color: textColor }}>
                    {t('adressUser.number')}
                  </label>
                  <input
                    type="text"
                    name="adress_nro"
                    id="adress_nro"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600"
                    value={formData.adress_nro}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="state" style={{ color: textColor }}>
                    {t('adressUser.state')}
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city" style={{ color: textColor }}>
                  {t('adressUser.city')}
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="postalCode" style={{ color: textColor }}>
                    {t('adressUser.postal')}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="phone_number" style={{ color: textColor }}>
                    {t('adressUser.contact')}
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-600"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 mt-6 text-white font-bold py-2 px-4 rounded"
                    >
                      {t('adressUser.save')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};