import Link from "next/link";
import img from "../assets/img/neoshoplogo.jpeg";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Nav({ show, userId, user }) {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + "  bg-highlight text-primary rounded-md";
  const inactiveIcon = "w-6 h-6";
  const activeIcon = inactiveIcon + " text-primary";
  const router = useRouter();
  const { pathname } = router;

  return (
    <div
      className={`bg-gray-900 text-slate-300 w-64 fixed h-screen md:static md:w-auto transition-all ${
        show ? "left-0" : "-left-full"
      }`}
    >
      <div className="my-4 px-6">
        <div className="flex flex-row gap-2">
          <Image src={img} className="w-8 h-8 rounded-full" alt="" />
          <h1 className="text-lg md:text-2xl font-bold text-white">
            Neo<span className="text-blue-500">shop</span>.
          </h1>
        </div>
        <p className="text-slate-500 text-sm">
          Manage your actions and activities
        </p>
      </div>
      <div className="px-6 py-10">
        <p className="text-slate-500">Welcome back,</p>
        <div className="inline-flex space-x-2 items-center">
          <span>
            {/* <img
              className="rounded-full w-8 h-8"
              src={'#'}
              alt=""
            /> */}
          </span>
          <span className="text-sm md:text-base font-bold">{user?.name}</span>
        </div>
      </div>
      <div className="w-full px-6">
        <nav className="flex flex-col gap-2">
          <Link
            href={`/dashboard/${userId}`}
            className={
              pathname === "/dashboard/[id]" ? activeLink : inactiveLink
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={pathname === "/" ? activeIcon : inactiveIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Dashboard
          </Link>

          <Link
            href={`/products/${userId}`}
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                pathname.includes("/products") ? activeIcon : inactiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            Productos
          </Link>

          <Link
            href={`/categories/${userId}`}
            className={
              pathname.includes("/categories") ? activeLink : inactiveLink
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                pathname.includes("/categories") ? activeIcon : inactiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Categorías
          </Link>

          <Link
            href={`/orders/${userId}`}
            className={pathname.includes("/orders") ? activeLink : inactiveLink}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                pathname.includes("/orders") ? activeIcon : inactiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
              />
            </svg>
            Pedidos
          </Link>

          <Link
            href={`/brand/${userId}`}
            className={
              pathname.includes("/settings") ? activeLink : inactiveLink
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={
                pathname.includes("/brand") ? activeIcon : inactiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            Brand
          </Link>
          <Link href="" className={inactiveLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Salir
          </Link>
        </nav>
      </div>
    </div>
  );
}
