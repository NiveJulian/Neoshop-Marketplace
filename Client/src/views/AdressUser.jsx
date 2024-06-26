import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAddress } from "../Redux/Actions/authActions";
import { useTranslation } from "react-i18next";

export const AdressUser = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    adress_street: user.adress_street || "",
    adress_nro: user.adress_nro || "",
    city: user.city || "",
    state: user.state || "",
    postalCode: user.postalCode || "",
    phone_number: user.phone_number || "",
  });

  const { t, i18n } = useTranslation();

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
    };
    console.log(dataToSend);
    dispatch(updateUserAddress(dataToSend,t)); // Asegúrate de tener esta acción configurada para enviar los datos
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="text-center">
          <h2 className="font-semibold text-xl text-gray-600">{t('adress.edit')}
          </h2>
          <p className="font-medium text-lg mt-2">{t('adress.details')}</p>
          <p>{t('adress.please')}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow-lg p-2 px-4 md:p-8 mt-6 mb-6 mx-auto max-w-3xl"
        >
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
            <div className="text-gray-600 lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="full_name">{t('adress.name')}</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                    value={user.name + " " + user.lastname}
                    disabled
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email">{t('adress.email')}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="adress_street">{t('adress.street')}</label>
                  <input
                    type="text"
                    name="adress_street"
                    id="adress_street"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.adress_street}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="adress_nro">{t('adress.number')}</label>
                  <input
                    type="text"
                    name="adress_nro"
                    id="adress_nro"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.adress_nro}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="state">{t('adress.state')}</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="city">{t('adress.city')}</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="postalCode">{t('adress.postal')}</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="phone_number">{t('adress.contact')}</label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {t('adress.save')}
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