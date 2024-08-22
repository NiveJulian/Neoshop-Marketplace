import axios from "axios";
import { useEffect, useState } from "react";
import InfoPayStore from "./InfoPayStore";
import ProductsByStore from "./ProductsByStore";
import Swal from "sweetalert2";

export default function StoreList({ id }) {
  const [storesData, setStoresData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProductByStore, setSelectedProductByStore] = useState(null);
  const [banned, setBanned] = useState(false);

  useEffect(() => {
    fetchDatastores();
  }, [banned]); // Añadir 'banned' como dependencia para refetch cuando se banee o desbanee una tienda

  const fetchDatastores = async () => {
    try {
      const response = await axios.get(`https://neoshop-marketplace.vercel.app/store/`);
      setStoresData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleBan(store) {
    try {
      await axios.put("https://neoshop-marketplace.vercel.app/store/update", {
        id_store: store.id_store,
        is_active: !store.is_active, // Alternar el estado
      });
      setBanned(!banned); // Actualizar el estado para refetch
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmBan(store) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You can revert this action later",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: store.is_active ? "Yes, ban" : "Yes, unban",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      handleBan(store);
      Swal.fire(
        store.is_active ? "User banned" : "User unbanned",
        `The user has been ${store.is_active ? "banned" : "unbanned"}.`,
        "success"
      );
    }
  }

  const openProductsByStore = (store) => {
    setSelectedProductByStore(store);
  };

  const closeProductsByStore = () => {
    setSelectedProductByStore(null);
  };

  const openstoreProfile = (store) => {
    setSelectedStore(store);
  };

  const closestoreProfile = () => {
    setSelectedStore(null);
  };

  // Filtrar las tiendas basadas en el término de búsqueda
  const filteredStore = storesData.filter(
    (store) =>
      (store.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       store.store_type?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calcular las tiendas actuales
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = filteredStore.slice(indexOfFirstStore, indexOfLastStore);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="text-xxl text-gray-600">Store list</h1>
      {selectedStore && (
        <InfoPayStore store={selectedStore} onClose={closestoreProfile} id={id} />
      )}
      {selectedProductByStore && (
        <ProductsByStore store={selectedProductByStore} onClose={closeProductsByStore} />
      )}
      <div className="flex justify-center items-center flex-col">
        <input
          type="text"
          placeholder="Search stores"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page number to 1 on search term change
          }}
          className="mb-4 px-4 py-2 border rounded w-[50%]"
        />
        <table className="text-center bg-gray-200 shadow-md">
          <thead>
            <tr>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            {currentStores.map((store) => (
              <tr key={store.id_store}>
                <td className="p-4 m-2 items-center justify-center rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
                  <img
                    className="mx-auto block w-4/12 h-40 rounded-lg"
                    alt="art cover"
                    loading="lazy"
                    src={store.logo}
                  />
                  <div className="sm:w-8/12 pl-0 p-5">
                    <div className="space-y-2">
                      <div className="space-y-4">
                        <h4 className="text-md font-semibold text-cyan-900 text-justify">
                          {store.name}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-4 justify-between">
                        <div className="flex gap-3 space-y-1">
                          <img
                            className="rounded-full h-8 w-8"
                            src={store.logo}
                          />
                          <span className="text-sm">
                            {store.address_city} {store.address_country}
                          </span>
                        </div>
                        <div className=" px-3 py-1 rounded-lg flex space-x-2 flex-row">
                          <div 
                          onClick={()=> openProductsByStore(store)}
                          className="cursor-pointer text-center text-md justify-center items-center flex">
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
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                              />
                            </svg>

                            <span className="text-md mx-1"></span>
                          </div>
                          <div
                            onClick={() => openstoreProfile(store)}
                            className="cursor-pointer text-center text-md justify-center items-center flex"
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
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>

                            <span className="text-md mx-1"></span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 justify-between">
                        <div className="text-grey-500 flex flex-row space-x-1  my-4">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <p className="">{store.store_type}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => confirmBan(store)}
                            className={`flex cursor-pointer justify-center items-center rounded-full p-1 text-center text-lg w-20 h-8 ${
                              store.is_active
                                ? "bg-red-600 hover:bg-red-900"
                                : "bg-blue-600 hover:bg-blue-900"
                            } text-white`}
                          >
                            {store.is_active ? "ban" : "unban"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          {Array.from({
            length: Math.ceil(filteredStore.length / storesPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
