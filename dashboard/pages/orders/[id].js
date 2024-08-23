import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import wpicon from "../../assets/img/wpicon.png";

export default function OrdersPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://neoshop-backend.vercel.app/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id && !userData) {
      fetchUserData();
    }
  }, [id, userData]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(
          `https://neoshop-backend.vercel.app/store/user/${id}`
        );
        setStoreData(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    if (id && !storeData) {
      fetchStoreData();
    }
  }, [id, storeData]);

  console.log(orders)

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get(
          `https://neoshop-backend.vercel.app/paying/store/${storeData.id_store}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    if (storeData && !orders.length) {
      fetchOrdersData();
    }
  }, [storeData, orders.length]);
  return (
    <Layout userId={id} user={user}>
      <h1>Orders Page</h1>
      <table className="basic shadow-md">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shipping Data</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr className="border border-gray-400" key={order.id_payment}>
                <td className="border border-gray-400">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="border border-gray-400">
                  {userData && (
                    <div className="flex flex-row gap-2 justify-start items-start">
                      <div>
                        <strong>Name:</strong>
                        <p> {userData.name}</p>
                        <strong>Email:</strong>
                        <p> {userData.email}</p>
                      </div>
                      <div>
                        <strong>City:</strong>
                        <p>
                          {userData.state} {userData.city}
                        </p>
                        <strong>Address:</strong>
                        <p>
                          {userData.adress_street} {userData.adress_nro}
                        </p>
                        <strong>Postal Code:</strong>
                        <p>{userData.postalCode} </p>
                      </div>

                      {/* Agrega aquí cualquier otra información del usuario que necesites */}
                      <div className="flex">
                        <Link
                          className="border justify-center items-center border-gray-300 rounded-2xl shadow-md transform transition-transform duration-100 active:translate-y-[5%] hover:shadow-sm active:shadow-2xl"
                          href={`https://wa.me/54${userData.phone_number}?text=Hola,%20${userData.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="rounded-full p-0 hover:bg-white">
                            <Image src={wpicon} width={32} height={32} />
                          </div>
                          Whatsapp
                        </Link>
                      </div>
                    </div>
                  )}
                </td>
                <td className="border border-gray-400">
                  {order.products.map((product) => (
                    <div
                      className="flex flex-col justify-center items-center"
                      key={product.id_product}
                    >
                      <span className="flex justify-center items-center gap-2">
                        <img
                          src={product.img_product[0]}
                          className="rounded-full"
                          width={64}
                          height={64}
                          alt={product.name}
                        />
                        <strong>Product:</strong>
                        {product.name}
                      </span>
                      <span>Price: ${product.price}</span>
                      <span>Quantity: {product.cartQuantity}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
