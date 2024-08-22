"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

export default function Dashboard({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const [storeData, setStoreData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dataPaying, setDataPaying] = useState(null);
  const [storesData, setStoresData] = useState(null);
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://neoshop-marketplace.vercel.app/user/${id}`);
          setUserData(response.data);
          if (response.data.user_type === "admin") {
            setIsAdmin(true);
            fetchDataPaying();
            fetchDataProducts();
            fetchDatastores();
          } else {
            fetchData();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchDataUser();
  }, [id]);

  const fetchData = async () => {
    if (isAdmin === false) {
      try {
        const response = await axios.get(
          `https://neoshop-marketplace.vercel.app/store/user/${id}`
        );
        setStoreData(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    }
  };

  const fetchDataPaying = async () => {
    try {
      const response = await axios.get(`https://neoshop-marketplace.vercel.app/paying/all`);
      setDataPaying(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataProducts = async () => {
    try {
      const response = await axios.get(`https://neoshop-marketplace.vercel.app/product/`);
      setDataProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatastores = async () => {
    try {
      const response = await axios.get(`https://neoshop-marketplace.vercel.app/store/`);
      setStoresData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePaymentStats = (payments) => {
    const totalPayments = payments.length;
    const availablePayments = payments.filter(
      (payment) => payment.available
    ).length;
    const unavailablePayments = totalPayments - availablePayments;

    const availablePercentage = (availablePayments / totalPayments) * 100;
    const unavailablePercentage = (unavailablePayments / totalPayments) * 100;

    return {
      totalPayments,
      availablePayments,
      unavailablePayments,
      availablePercentage,
      unavailablePercentage,
    };
  };

  const calculateProductStats = (products) => {
    const totalProducts = products.length;
    const availableProducts = products.filter(
      (product) => product.available
    ).length;
    const unavailableProducts = totalProducts - availableProducts;

    return {
      totalProducts,
      availableProducts,
      unavailableProducts,
    };
  };

  const calculateStoreStats = (stores) => {
    const totalStore = stores.length;
    const availableStore = stores.filter((store) => store.available).length;
    const unavailableStore = totalStore - availableStore;

    return {
      totalStore,
      availableStore,
      unavailableStore,
    };
  };

  const paymentStats = dataPaying ? calculatePaymentStats(dataPaying) : null;
  const productStats = dataProduct ? calculateProductStats(dataProduct) : null;
  const storeStats = storesData ? calculateStoreStats(storesData) : null;

  return (
    <Layout userId={id} user={user}>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={user?.picture} alt="" className="w-6 h-6" />
          <span className="px-2">{user?.name}</span>
        </div>
      </div>
      {storeData && (
        <div className="flex flex-col mt-8">
          <h5 className="text-gray-500 text-md ">Your store</h5>
          <div className="flex justify-center items-center">
            <img
              src={storeData.logo}
              className="w-24 h-24 rounded-full"
              alt="Store Logo"
            />
          </div>
          <div className="text-center mt-8">
            <h3 className="text-gray-800 p-2 border border-gray-400">
              Store Information
            </h3>
            <table className="basic justify-center items-center mt-8">
              <thead className="bg-gray-300">
                <tr>
                  <th>NAME</th>
                  <th>ADDRESS</th>
                  <th>POSTAL CODE</th>
                </tr>
              </thead>
              <tbody className="bg-gray-500 text-gray-400 hover:text-gray-200">
                <tr>
                  <td>{storeData.name}</td>
                  <td>
                    {storeData.address_city}, {storeData.address_country}
                  </td>
                  <td>{storeData.address_cp}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isAdmin && (
        <div className="grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
              <h5 className="text-xl text-gray-700">Payments Summary</h5>
              <div className="my-8">
                <h1 className="text-5xl font-bold text-gray-800">
                  {paymentStats?.totalPayments}
                </h1>
                <span className="text-gray-500">Total Payments</span>
              </div>
              <div className="my-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {paymentStats?.availablePercentage.toFixed(2)}%
                </h1>
                <span className="text-gray-500">Available Payments</span>
              </div>
              <div className="my-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {paymentStats?.unavailablePercentage.toFixed(2)}%
                </h1>
                <span className="text-gray-500">Unavailable Payments</span>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div>
            <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
              <h5 className="text-xl text-gray-700">
                Quantity products in APP
              </h5>
              <div className="my-8">
                <h1 className="text-5xl font-bold text-gray-800">
                  {productStats?.totalProducts}
                </h1>
                <span className="text-gray-500">Total Products</span>
              </div>
              <div className="my-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {productStats?.availableProducts}
                </h1>
                <span className="text-gray-500">Available Products</span>
              </div>
              <div className="my-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {productStats?.unavailableProducts}
                </h1>
                <span className="text-gray-500">Unavailable Products</span>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div>
            <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
              <h5 className="text-xl text-gray-700">
                Quantity stores in APP
              </h5>
              <div className="my-8">
                <h1 className="text-5xl font-bold text-gray-800">
                  {storeStats?.totalStore}
                </h1>
                <span className="text-gray-500">Total Stores</span>
              </div>
              <div className="my-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {storeStats?.availableStore}
                </h1>
                <span className="text-gray-500">Available Stores</span>
              </div>
              <div className="my-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {storeStats?.unavailableStore}
                </h1>
                <span className="text-gray-500">Unavailable Store</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
