import { Link } from "react-router-dom";
import UserFormLogin from "../components/UserForm/UserFormLogin";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lg:inline-flex h-full text-white">
        <div className="w-[450px] shadow-md shadow-gray-400 h-full bg-primary px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            {/* <img src={'#'} alt="logoImg" className="w-28" /> */}
            Logo
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
              Accede fácilmente a todas tus tiendas favoritas y descubre nuevas
              ofertas cada día.
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
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        <UserFormLogin title={"Login"} />
      </div>
    </div>
  )
}
