import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ButtonClient = () => {
  const themeLocal = useState(localStorage.getItem("theme"));
  const theme = themeLocal[0];
  const { t, i18n } = useTranslation();

  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  
  return (
    <Link
      to={"/"}
      className="flex flex-col hover:shadow-lg active:translate-y-[5%] cursor-pointer items-center justify-center border border-gray-300 rounded-lg shadow-md p-6"
      style={{ width: "300px", height: "200px", color: textColor }}
    >
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-lg flex items-center flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <span>{t('confirmation.client')}</span>
      </button>
      <p
        className="text-gray-600 mt-2 text-center"
        style={{ color: textColor }}
      >
        {t('confirmation.clientDetail')}
      </p>
    </Link>
  );
};
