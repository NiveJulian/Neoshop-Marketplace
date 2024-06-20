"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

export default function Dashboard({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3001/store/user/${id}`
          );
          setStoreData(response.data);
        } catch (error) {
          console.error("Error fetching store data:", error);
        }
      }
    };
    fetchData();
  }, [id]);
  // Aquí puedes realizar las acciones necesarias para cargar los datos del usuario basados en el userId

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
                    
                    {storeData.address_city},{" "} {storeData.address_country}
                  </td>
                  <td>{storeData.address_cp}</td>
                </tr>
              </tbody>
            </table>
            {/* <p>Name: {storeData.name}</p>
            <p>
              Address: {storeData.address_city}, {storeData.address_country}
            </p>
            <p>
              PostalCode: 
            </p> */}
          </div>
        </div>
      )}
    </Layout>
  );
}
