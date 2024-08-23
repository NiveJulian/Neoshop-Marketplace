import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InfoPayStore({ store, onClose, id }) {
  const [sales, setSales] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  useEffect(() => {
    fetchDataSales();
  }, []);

  const fetchDataSales = async () => {
    try {
      const response = await axios.get(
        `https://neoshop-backend.vercel.app/paying/store/${store.id_store}`
      );
      setSales(response.data);
      setTotalSales(calculateTotalSales(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalSales = (sales) => {
    return sales.reduce((total, sale) => total + sale.amount, 0);
  };
  return (
    <section
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-gray-100 px-4 text-gray-600 antialiased"
      x-data="app"
    >
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b flex justify-between border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Manage Carts</div>
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
                    <div className="text-left font-semibold">ID paying</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">ID user</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Product Name</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Quantity</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Total</div>
                  </th>
                  <th className="p-2">
                    <div className="text-center font-semibold">Action</div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm text-center">
                {sales &&
                  sales.map((sale, i) => (
                    <tr key={i}>
                      <td className="p-2">
                        <div className="text-left">{sale.id_payment}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-left">{sale.id_user}</div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium text-gray-800">
                          {sale.products.map((product, i) => (
                            <span key={i}>{product.name}</span>
                          ))}
                        </div>  
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {sale.products.length}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-left font-medium text-green-500">
                          {sale.amount}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          <Link href={`/admin/paymentsDetail/${id}?sales=${sale.id_payment}&store=${store.id_store}`}>
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
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                {!sales && (
                  <>There are no sales recorded in this store</>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
            <div>Total</div>
            <div className="text-blue-600">
              $<span x-text="total.toFixed(2)">{totalSales}</span>
            </div>
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
