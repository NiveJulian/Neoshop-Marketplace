import Layout from "../../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const [storeData, setStoreData] = useState(null);

  const { id } = router.query;
  const { product } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("https://neoshop-marketplace.vercel.app/product/id/" + product)
      .then((response) => {
        setProductInfo(response.data);
      });
    axios.get(`https://neoshop-marketplace.vercel.app/store/user/${id}`).then((response) => {
      setStoreData(response.data);
    });
  }, [id]);
  function goBack() {
    router.push(`/products/${id}`);
  }
  async function deleteProduct() {
    const data = {
      id_product: product,
      id_store: storeData.id_store,
      available: false,
    };
    await axios.put("https://neoshop-marketplace.vercel.app/product/update", data);
    goBack()
  }
  if (!storeData) {
    return <>Loading...</>
  }
  return (
    <Layout userId={id} user={storeData}>
      <h1 className="text-center">
        Do you really want to delete product {productInfo?.title}6?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
