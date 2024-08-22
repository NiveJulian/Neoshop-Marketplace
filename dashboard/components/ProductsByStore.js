import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ProductsByStore({ store, onClose }) {
  const [dataProduct, setDataProduct] = useState(null);
  const [banned, setBanned] = useState(false);
  const { id_store } = store;
  useEffect(() => {
    fetchProducts();
  }, [id_store]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://neoshop-marketplace.vercel.app/product/allProductsStore/${id_store}`
      );
      setDataProduct(response.data);
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: "No Products",
        text: "There are no products in this store.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBanProduct = async (product) => {
    try {
      await axios.put("https://neoshop-marketplace.vercel.app/product/update", {
        id_product: product.id_product,
        id_store,
        available: !product.available,
      });
      setBanned(!banned);
      fetchProducts();
    } catch (error) {
      console.log({ error: error });
    }
  };

  const confirmBan = async (product) => {
    if (banned) {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No te preocupes, luego podras revertir esta accion",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, banear",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        handleBanProduct(product);
        Swal.fire("Usuario baneado", "El usuario ha sido banead.", "success");
      }
    } else {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No te preocupes, luego podras revertir esta accion",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, unban",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        handleBanProduct(product);
        Swal.fire(
          "Producto desbaneado",
          "El producto ha sido desbaneado.",
          "success"
        );
      }
    }
  };

  if (!dataProduct) {
    return null;
  }
  return (
    <section
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-gray-100 px-4 text-gray-600 antialiased"
      x-data="app"
    >
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b flex justify-between border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">All products</div>
            <button
              onClick={onClose}
              className="text-gray-500 text-2xl hover:text-gray-700"
            >
              &times;
            </button>
          </header>

          <div className="overflow-x-auto p-3">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th className="p-2">
                    <div className="text-left font-semibold">Image</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">ID</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Product Name</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Quantity</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Price</div>
                  </th>
                  <th className="p-2">
                    <div className="text-center font-semibold">Action</div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm text-center">
                {dataProduct?.length > 0 &&
                  dataProduct &&
                  dataProduct.map((sale, i) => (
                    <tr key={i}>
                      <td className="p-2">
                        <div className="text-left rounded-full border border-gray-300 p-2">
                          <img
                            src={sale.img_product}
                            className="w-16 h-16 rounded-full"
                            alt={sale.name}
                          />
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-left">{sale.id_product}</div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium text-gray-800">
                          {sale.name}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{sale.quantity}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-left font-medium text-green-500">
                          {sale.price}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          <button
                            onClick={() => confirmBan(sale)}
                            type="button"
                            className="border border-gray-300 rounded-full p-2 hover:shadow-lg active:translate-y-1"
                            title={`available ${sale.available}`}
                          >
                            {sale.available ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 text-green-800"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 text-red-600"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <input
              type="hidden"
              className="border border-black bg-gray-50"
              x-model="selected"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
