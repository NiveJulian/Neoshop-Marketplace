import Nav from "../components/Nav/Nav";
import Footer from '../components/Footer/Footer'
import Testimonials from "../components/Testimonials/Testimonials";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const store = useSelector((state) => state.store.store);
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();

  const backgroundColor = theme === "dark" ? "#171717" : "#F3F4F6";
  const textColorH1 = theme === "dark" ? "#b3b3b3" : "#FFFFFF";
  const textColor = theme === "dark" ? "#b3b3b3" : "#2b2b2b";
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800"
      style={{ background: backgroundColor }}
    >
      <Nav />
      <header className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-primary">
        {/* Fondo de animaciones */}
        {theme !== "dark" ? (
          <div className="header-background"></div>
        ) : (
          <div className="header-background-dark"></div>
        )}
        {/* <div className="header-background" ></div>  */}
        {/* Marcas flotantes */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <div className="floating-logos">
            {store.map((store, index) => (
              <Link
                key={index}
                className="floating-logo"
                to={`/store/${store.id_store}`}
              >
                <img src={store.logo} alt={`logo ${index}`} />
              </Link>
            ))}
          </div>
        </div>
        {/* Contenido de bienvenida */}
        <div className="header-content">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: textColorH1 }}
          >
            {t("Welcome")}
          </h1>
          <p
            className="text-lg font-semibold mb-6"
            style={{ color: textColorH1 }}
          >
            {t("WelcomeText")}
          </p>
          <button
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg transform transition-transform duration-100 active:translate-y-[5%] hover:shadow-sm active:shadow-2xl"
            onClick={() => (window.location.href = "/home")}
          >
            <strong>{t("StoreButtonLanding")}</strong>
          </button>
        </div>
      </header>
      <section
        id="features"
        className="py-12 px-6 bg-gray-100 shadow-md mt-6"
        style={{ background: backgroundColor }}
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: textColor }}
        >
          {t("whyNeoShop")}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div
            className="bg-gray-100 border border-secondary rounded-lg p-6 max-w-sm shadow-lg"
            style={{ background: backgroundColor }}
          >
            <h3
              className="text-xl font-bold flex gap-2 mb-4"
              style={{ color: textColor }}
            >
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              {t("personalized")}
            </h3>
            <p style={{ color: textColor }}>
            {t("personalizedText")}
              
            </p>
          </div>
          <div
            className="bg-gray-100 border border-secondary rounded-lg p-6 max-w-sm shadow-lg"
            style={{ background: backgroundColor }}
          >
            <h3
              className="text-xl flex gap-2 font-bold mb-4"
              style={{ color: textColor }}
            >
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
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              {t("secure")}

    
            </h3>
            <p style={{ color: textColor }}>
            {t("secureText")}        
            </p>
          </div>
          <div
            className="bg-gray-100 border border-secondary rounded-lg p-6 max-w-sm shadow-lg"
            style={{ background: backgroundColor }}
          >
            <h3
              className="text-xl flex gap-2 font-bold mb-4"
              style={{ color: textColor }}
            >
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
                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                />
              </svg>
              {t("easy")}        

              
            </h3>
            <p style={{ color: textColor }}>
            {t("easyText")}        
              
            </p>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-6 px-6">
        <Testimonials />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
