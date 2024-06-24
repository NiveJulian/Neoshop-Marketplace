import { Link } from "react-router-dom";
import FormRegisterStore from "../components/UserForm/FormRegisterStore";
import { useSelector } from "react-redux";
import UserFormLogin from "../components/UserForm/UserFormLogin";
import { useEffect, useState } from "react";

export default function CreateStore() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [showRegisterStoreForm, setShowRegisterStoreForm] = useState(false);
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
  useEffect(() => {
    if (isAuth) {
      setShowRegisterStoreForm(true);
    }
  }, [isAuth]);
  console.log(theme)
  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ background: backgroundColor }}>
      {!isAuth ? (
        <UserFormLogin title={"First, log in to your account"} />
      ) : showRegisterStoreForm ? (
        // Si está autenticado, mostrar el formulario de registro de tienda
        <>
          <div className="w-1/2 hidden lg:inline-flex h-screen text-white" >
            <div className="w-[450px] shadow-md shadow-gray-400 h-full bg-primary px-10 flex flex-col gap-6 justify-center"
            style={{ background: azulOscuro }}>
              <Link to="/">
                <img
                  src={"neoshoplogo.jpeg"}
                  alt="logoImg"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              <div className="flex flex-col gap-1 -mt-1">
                <h1 className="font-titleFont text-2xl font-bold">
                  ¡Regístrate y accede a tus tiendas favoritas!
                </h1>
                <p className="text-base">
                  Disfruta de las mejores ofertas y precios en un solo lugar.
                </p>
              </div>
              <div className="w-[300px] flex items-start gap-3">
                <span className="text-green-500 mt-1">
                  {/* <BsCheckCircleFill /> */}
                </span>
                <p className="text-base text-gray-300">
                  <span className="text-white font-semibold font-titleFont">
                    Empieza rápido con NeoShop
                  </span>
                  <br />
                  Accede fácilmente a todas tus tiendas favoritas y descubre
                  nuevas ofertas cada día.
                </p>
              </div>
              <div className="w-[300px] flex items-start gap-3">
                <span className="text-green-500 mt-1">
                  {/* <BsCheckCircleFill /> */}
                </span>
                <p className="text-base text-gray-300">
                  <span className="text-white font-semibold font-titleFont">
                    Acceso a todos los servicios de NeoShop
                  </span>
                  <br />
                  Obtén acceso exclusivo a promociones, descuentos y mucho más.
                </p>
              </div>
              <div className="w-[300px] flex items-start gap-3">
                <span className="text-green-500 mt-1">
                  {/* <BsCheckCircleFill /> */}
                </span>
                <p className="text-base text-gray-300">
                  <span className="text-white font-semibold font-titleFont">
                    Confiado por compradores en línea
                  </span>
                  <br />
                  Únete a miles de usuarios que ya disfrutan de las ventajas de
                  NeoShop.
                </p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <Link to="/">
                  <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
                    © NeoShop
                  </p>
                </Link>
                <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
                  Términos
                </p>
                <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
                  Privacidad
                </p>
                <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
                  Seguridad
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
            <FormRegisterStore user={user} />
          </div>
        </>
      ) : null}
    </div>
  );
}
