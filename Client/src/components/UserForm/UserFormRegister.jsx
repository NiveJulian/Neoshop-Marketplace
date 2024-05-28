import React, { useState } from "react";
import validationRegister from "./validationRegister"; // Importa tu función de validación

export default function UserFormRegister({ title = "Register" }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    password: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    password: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validationRegister({ ...formData, [name]: value }, errors, setErrors);
  };

  return (
    <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center mb-4 text-gray-900">{title}</h1>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
            id="grid-first-name"
            type="text"
            placeholder="Juan Paco"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
              errors.lastname ? "border-red-500" : "border-gray-200"
            }`}
            id="grid-last-name"
            type="text"
            placeholder="Delamar"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs italic">{errors.lastname}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
            id="grid-password"
            type="password"
            placeholder="******************"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            City
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
              errors.city ? "border-red-500" : "border-gray-200"
            }`}
            id="grid-city"
            type="text"
            placeholder="Albuquerque"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && (
            <p className="text-red-500 text-xs italic">{errors.city}</p>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative">
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                errors.state ? "border-red-500" : "border-gray-200"
              }`}
              id="grid-state"
              type="text"
              placeholder="New Mexico"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && (
              <p className="text-red-500 text-xs italic">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Postal Code
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
              errors.postalCode ? "border-red-500" : "border-gray-200"
            }`}
            id="grid-zip"
            type="text"
            placeholder="90210"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-xs italic">{errors.postalCode}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            id="grid-email"
            type="email"
            placeholder="example@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
      </div>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="/login"
      >
        Sing In
      </a>
    </form>
  );
}
