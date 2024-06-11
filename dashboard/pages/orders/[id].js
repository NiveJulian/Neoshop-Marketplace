import { useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function OrdersPage({user}) {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout userId={id} user={user}>
      <h1>Orders Page</h1>
      <table className="basic">
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
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.name} | {order.email} <br />
                  {order.city} | {order.postalNumber} <br />
                  {order.address} | {order.country}
                  <br />
                  <div>
                    <a
                      className="py-2 px-2 border-green-400 bg-green-400 rounded"
                      href={
                        "https://wa.me/54" +
                        order.telefone +
                        "?text=Hola,%20" +
                        order.name +
                        "%20somos%20ShoesHouse%20y%20nos%20comunicabamos%20con%20usted%20por%20la%20compra%20que%20efectuaste%20en%20nuestra%20pagina,%20como%20fue%20la%20experiencia?%20queres%20darnos%20alg%C3%BAn%20feedback%20al%20respecto%20de%20ella,%20te%20quedo%20alguna%20duda.%20Tambien%20avisarte%20que%20apenas%20enviemos%20te%20estaremos%20pasando%20por%20este%20medio%20el%20numero%20de%20envio%20para%20asi%20poder%20hacer%20el%20seguimiento%20del%20mismo"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Whatsapp
                    </a>
                  </div>
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.name} x {l.quantity} | ${l.unit_price} ARS
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
