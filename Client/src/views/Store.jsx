import React from "react";
import Nav from "../components/Nav/Nav";
import StoreList from "../components/Store/StoreList/StoreList";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const Store = () => {
  const { t } = useTranslation();
  const allSellers = useSelector((state) => state.store.store);
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";

  return (
    <>
      <div className="shadow-sm">
        <Nav color={"primary"} />
      </div>
      <div
        className="min-h-screen text-center bg-gray-100"
        style={{ background: backgroundColor }}
      >
        <div
          className="flex justify-center text-center flex-col py-8"
          style={{ background: backgroundColor }}
        >
          <h1 className="mb-7 text-4xl font-bold pb-2 text-gray-300 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
            {t("storeTitle")}
          </h1>
          <div>
            <StoreList allSellers={allSellers} />
          </div>
        </div>
      </div>
    </>
  );
};
