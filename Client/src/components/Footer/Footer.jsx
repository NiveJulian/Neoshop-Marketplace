import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Footer() {
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();
  const backgroundColor = theme === "dark" ? "#2b2b2b" : "#0069AA";
  const textColorH1 = theme === "dark" ? "#ff8000" : "#2b2b2b";
  // const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";

  return (
    <footer
      className={`w-full py-8 text-white ${
        theme === "dark" ? `${backgroundColor}` : "bg-blue-900"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <h5
              className={`uppercase mb-6 font-bold ${
                theme === "dark" ? `${textColorH1}` : ""
              }`}
            >
              NeoShop
            </h5>
            <p className="mb-4">{t("footer.tutienda")}</p>
          </div>
          <div className="w-full md:w-1/4">
            <h5
              className={`uppercase mb-6 font-bold ${
                theme === "dark" ? `${textColorH1}` : ""
              }`}
            >
              {t("footer.enlaces")}
            </h5>
            <ul className="mx-3 mb-4 flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2"
                >
                  {t("footer.inicio")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2"
                >
                  {t("footer.Tienda")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2"
                >
                  {t("footer.sobren")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2"
                >
                  {t("footer.contacto")}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">{t("footer.contacto")}</h5>
            <ul className="mx-3 mb-4 flex flex-col gap-4 hf border p-2 rounded-md">
              <li className="mt-2">
                Email:{" "}
                <a
                  href="mailto:contacto@neoshop.com"
                  className="hover:shadow-md"
                >
                  neoshop.henry@gmail.com
                </a>
              </li>
              <li className="border-t border-gray-300">
                {t("footer.tel")}:{" "}
                <a href="tel:+123456789" className="hover:shadow-md">
                  +123 456 789
                </a>
              </li>
              <li className="border-t border-gray-300">{t("footer.dir")}</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">{t("footer.hechopor")}</h5>
            <ul className="mx-3 mb-4 flex flex-col gap-2">
              <li>
                <a
                  href="https://github.com/FacuMorales"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2 hover:animate-pulse active:translate-y-[1px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  FacuMorales
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LMenesesTroche"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2 hover:animate-pulse active:translate-y-[1px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  LMenesesTroche
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MateoCornetti"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2 hover:animate-pulse active:translate-y-[1px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  MateoCornetti
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MatiJVillagran"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2 hover:animate-pulse active:translate-y-[1px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  MatiJVillagran
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MichaelKMedina"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2 hover:animate-pulse active:translate-y-[1px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  MichaelKMedina
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/NiveJulian"
                  className="hover:shadow-md shadow-sm gap-2 flex border border-gray-300 rounded-md p-2 hover:animate-pulse active:translate-y-[1px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  NiveJulian
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h5 className="uppercase mb-6 font-bold">{t("footer.sigue")}</h5>
          <ul className="mx-3 flex justify-center">
            <li className="mx-3">
              <a href="#">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/124/124010.png"
                  alt="Facebook"
                  className="bg-white"
                  style={{ width: "32px", height: "32px" }}
                />
              </a>
            </li>
            <li className="mx-3">
              <a href="#">
                <img
                  src="https://i.blogs.es/b4eb3e/x-linda/450_1000.jpeg"
                  alt="X"
                  style={{ width: "32px", height: "32px" }}
                />
              </a>
            </li>
            <li className="mx-3">
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png"
                  alt="Instagram"
                  style={{ width: "32px", height: "32px" }}
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 bg-gray-900 border border-white rounded-lg transition-colors duration-300 hover:bg-gray-700"
            onClick={() =>
              (window.location.href =
                "https://github.com/Proyecto-final-organization")
            }
          >
            <strong>GitHub</strong>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
