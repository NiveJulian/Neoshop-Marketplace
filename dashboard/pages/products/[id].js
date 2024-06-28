import axios from "axios";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const storeResponse = await axios.get(`http://localhost:3001/store/user/${id}`);
          setStoreData(storeResponse.data);
          setLoading(false); // Marcar como no cargando una vez que se recibe la respuesta

          if (storeResponse.status === 200 && storeResponse.data?.id_store) {
            const productsResponse = await axios.get(`http://localhost:3001/product/allProductsStore/` + storeResponse.data.id_store);
            
            // Filtrar productos disponibles
            const availableProducts = productsResponse.data.filter(product => product.available);

            setProducts(availableProducts);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout userId={id} user={user}>
      <Link className="btn-primary" href={`/products/new/${id}`}>
        Crear producto
      </Link>

      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Image</td>
            <td>Product Name</td>
            <td>Stock</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2">Cargando...</td>
            </tr>
          ) : products.length > 0 ? (
            products.map((product) => (
              <tr key={product?.id_product}>
                <td><img src={product?.img_product[0]} width={64} height={64} /></td>
                <td>{product?.name}</td>
                <td>{product?.quantity}</td>
                <td>
                  {storeData && (
                    <>
                      <Link
                        className="btn-default"
                        href={`/products/edit/${storeData.id_user}?product=${product?.id_product}`}
                      >
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        Edit
                      </Link>
                      <Link
                        className="btn-red"
                        href={`/products/delete/${storeData.id_user}?product=${product?.id_product}`}
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
