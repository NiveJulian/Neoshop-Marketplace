import React, { useState } from "react";
import style from "./Sidebar.module.css";
import Filter from "../Filter/Filter";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    if (expanded) {
      setExpanded(false); // Contraer la barra si está expandida
    } else {
      setExpanded(true); // Expandir la barra si está contraída
    }
  };

  return (
    <div className="flex items-start justify-left w-screen mt-8 mb-6 fixed">
      {/* <!-- Component Start --> */}
      {/* Condición para mostrar la primera o la segunda sidebar */}
      {expanded ? (
        <div className="flex flex-col transition-all ease-in-out text-gray-100 items-center px-2 w-16 h-full overflow-hidden bg-orange-400 rounded">
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
          <div className="flex flex-col items-center mt-3 border-t border-gray-300">
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
              className="flex items-center justify-center w-12 h-12 mt-2 bg-gray-300 rounded"
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
          <div className="flex flex-col items-center mt-2 border-t border-gray-300">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
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
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </a>
            <a
              className="relative flex items-center justify-center w-12 h-12 mt-2 hover:bg-gray-300"
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
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col transition-all ease-in-out text-gray-100 items-center w-40 h-full overflow-hidden bg-orange-400 rounded">
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
            <span className="text-sm font-bolder">Filters & Orders</span>
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Dasboard</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
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
                <span className="ml-2 text-sm font-medium">Search</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded"
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
                <span className="ml-2 text-sm font-medium">Insights</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
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
                <span className="ml-2 text-sm font-medium">Docs</span>
              </a>
            </div>
            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Products</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Settings</span>
              </a>
              <a
                className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
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
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Messages</span>
                <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
              </a>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Component End  --> */}
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
