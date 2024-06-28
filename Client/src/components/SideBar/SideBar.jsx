import { useState } from "react";
import FilterStore from "../Filter/FilterStore";
import { OrderAbc } from "../Filter/OrderAbc";
import { OrderPrice } from "../Filter/OrderPrice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [filterStoreActive, setFilterStoreActive] = useState(false);
  const [orderAbcActive, setOrderAbcActive] = useState(false);
  const [orderPriceActive, setOrderPriceActive] = useState(false);
  const theme = useSelector((state) => state.themes.theme);
  const { t, i18n } = useTranslation();

  const toggleSidebar = () => {
    setExpanded(!expanded); // Alternar el estado de expansión
  };

  const orangeColor = theme === "dark" ? "#cd7731" : "#e18336";

  return (
    <div
      className="flex items-start w-auto mt-auto mb-6 fixed z-30"
    >
      {expanded ? (
        <div className="flex flex-col transition-all ease-in-out text-gray-100 items-center px-2 w-16 h-full overflow-hidden bg-orange-400 rounded-lg"
        style={{ backgroundColor: orangeColor }}
        >
          <a
            className="flex items-center justify-center mt-3 text-gray-200"
            href="#"
            onClick={toggleSidebar}
          >
            <svg
              className="w-7 h-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              fill="currentColor"
            >
              <path
                d="M12 5.5C12 6.88071 10.8807 8 9.5 8C8.11929 8 7 6.88071 7 5.5M12 5.5C12 4.11929 10.8807 3 9.5 3C8.11929 3 7 4.11929 7 5.5M12 5.5H21M7 5.5H3M19 12C19 13.3807 17.8807 14.5 16.5 14.5C15.1193 14.5 14 13.3807 14 12M19 12C19 10.6193 17.8807 9.5 16.5 9.5C15.1193 9.5 14 10.6193 14 12M19 12H21M14 12H3M10 18.5C10 19.8807 8.88071 21 7.5 21C6.11929 21 5 19.8807 5 18.5M10 18.5C10 17.1193 8.88071 16 7.5 16C6.11929 16 5 17.1193 5 18.5M10 18.5H21M5 18.5H3"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className="flex flex-col items-center mt-3 border-gray-300">
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
              href="/"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col transition-all ease-in-out text-gray-100 items-center w-40 h-full overflow-visible bg-orange-400 rounded-lg"
        style={{ backgroundColor: orangeColor }}
      >
          <a
            className="flex items-center w-full mt-3 justify-center"
            href="#"
            onClick={toggleSidebar}
          >
            <svg
              className="w-7 h-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              fill="currentColor"
            >
              <path
                d="M12 5.5C12 6.88071 10.8807 8 9.5 8C8.11929 8 7 6.88071 7 5.5M12 5.5C12 4.11929 10.8807 3 9.5 3C8.11929 3 7 4.11929 7 5.5M12 5.5H21M7 5.5H3M19 12C19 13.3807 17.8807 14.5 16.5 14.5C15.1193 14.5 14 13.3807 14 12M19 12C19 10.6193 17.8807 9.5 16.5 9.5C15.1193 9.5 14 10.6193 14 12M19 12H21M14 12H3M10 18.5C10 19.8807 8.88071 21 7.5 21C6.11929 21 5 19.8807 5 18.5M10 18.5C10 17.1193 8.88071 16 7.5 16C6.11929 16 5 17.1193 5 18.5M10 18.5H21M5 18.5H3"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-bolder">{t('sideBar.title')}</span>
          </a>
          <div className="w-full px-4 py-2">
            <div className="flex flex-col items-center w-full mt-3 border-gray-300">
              <a
                className="flex flex-col items-center mt-3 border-gray-300"
                href="#"
              >
                <FilterStore />
              </a>
              <a
                className="flex flex-col w-full items-center mt-2 border-gray-300"
                href="#"
              >
                <OrderAbc />
              </a>
              <a
                className="flex flex-col items-center mt-2 border-gray-300"
                href="#"
              >
                <OrderPrice />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
{
  /* <div className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
<button
    className={`${style.toggleButton} ${isOpen ? style.sidebarOpenToggleButton : ''}`}
    onClick={toggleSidebar}
>
    {isOpen ? '→' : '←'}
</button>
<div className={style.content}>
    <h2>Filter by</h2>
    <Filter/>
</div>
</div> */
}
