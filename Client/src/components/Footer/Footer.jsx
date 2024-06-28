import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Footer() {
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();
  const backgroundColor = theme === "dark" ? "#2b2b2b" : "#0069AA";
  const textColorH1 = theme === "dark" ? "#ff8000" : "#2b2b2b";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";

  return (
    <footer
      className="w-full py-8 bg-gray-800 text-white"
      style={{ background: backgroundColor }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <h5
              className="uppercase mb-6 font-bold"
              style={{ color: textColorH1 }}
            >
              NeoShop
            </h5>
            <p className="mb-4">{t("footer.tutienda")}</p>
          </div>
          <div className="w-full md:w-1/4">
            <h5
              className="uppercase mb-6 font-bold"
              style={{ color: textColorH1 }}
            >
              {t("footer.enlaces")}
            </h5>
            <ul className="mx-3 mb-4">
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.inicio")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.Tienda")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.sobren")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.contacto")}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5
              className="uppercase mb-6 font-bold"
              style={{ color: textColorH1 }}
            >
              {t("footer.contacto")}
            </h5>
            <ul className="mx-3 mb-4">
              <li>
                Email:{" "}
                <a
                  href="mailto:contacto@neoshop.com"
                  className="hover:underline"
                >
                  neoshop.henry@gmail.com
                </a>
              </li>
              <li>
                {t("footer.tel")}:{" "}
                <a href="tel:+123456789" className="hover:underline">
                  +123 456 789
                </a>
              </li>
              <li>{t("footer.dir")}</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5
              className="uppercase mb-6 font-bold"
              style={{ color: textColorH1 }}
            >
              {t("footer.hechopor")}
            </h5>
            <ul className="mx-3 mb-4">
              <li>
                <a
                  href="https://github.com/FacuMorales"
                  className="hover:underline"
                >
                  FacuMorales
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LMenesesTroche"
                  className="hover:underline"
                >
                  LMenesesTroche
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ManekiSyko"
                  className="hover:underline"
                >
                  ManekiSyko
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MatiJVillagran"
                  className="hover:underline"
                >
                  MatiJVillagran
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MichaelKMedina"
                  className="hover:underline"
                >
                  MichaelKMedina
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/NiveJulian"
                  className="hover:underline"
                >
                  NiveJulian
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h5
            className="uppercase mb-6 font-bold"
            style={{ color: textColorH1 }}
          >
            {t("footer.sigue")}
          </h5>
          <ul className="mx-3 flex justify-center">
            <li className="mx-3">
              <a href="#">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/124/124010.png"
                  alt="Facebook"
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
