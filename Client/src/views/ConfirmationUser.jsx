import { ButtonClient } from "../components/ButtonsConfirmations/ButtonClient/ButtonClient";
import { ButtonStore } from "../components/ButtonsConfirmations/ButtonStore/ButtonStore";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ConfirmationUser() {
  // const theme = useSelector((state) => state.themes.theme); //todo
  const themeLocal = useState(localStorage.getItem("theme"));
  const theme = themeLocal[0];
  // const theme = 'light';

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6"; //todo
  const cartBackGround = theme === "dark" ? "#272727" : "#FFFFFF";
  const letrasFondoClaro = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";
  const azulOscuro = theme === "dark" ? "#212121" : "#0069AA";
  const azulClaro = theme === "dark" ? "#3B82F6" : "#3B82F6";

  console.log(theme);

  return (
    <div
      className="flex justify-center items-center h-screen flex-col"
      style={{ background: backgroundColor, color: textColor }}
    >
      <h1 className="text-3xl font-bold mb-8">
        What will you do within NeoShop?
      </h1>
      <div className="flex flex-row gap-20">
        <ButtonClient />
        <ButtonStore />
      </div>
    </div>
  );
}
