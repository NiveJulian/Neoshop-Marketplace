import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import ProductForm from "../../../components/ProductForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [storeData, setStoreData] = useState(null);


  useEffect(() => {
    const fetchStoreData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://neoshop-backend.vercel.app/store/user/${id}`
          );
          setStoreData(response.data);
        } catch (error) {
          console.error("Error fetching store data:", error);
        }
      }
    };
    fetchStoreData();
  }, [id]);
  return (
    <Layout userId={id}>
      <h1>New Product</h1>
      <ProductForm store={storeData}/>
    </Layout>
  );
}
