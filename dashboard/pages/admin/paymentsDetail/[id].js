import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import PayDetail from "../../../components/PayDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

export default function PaymentDetail() {
  const [dataUser, setDataUser] = useState(null);
  const [dataPaying, setDataPaying] = useState(null);
  const [dataStore, setDataStore] = useState(null);
  const router = useRouter();
  const { id, sales, store } = router.query;

  useEffect(() => {
    if (id && sales && store) {
      fetchDataPay();
      fetchDataUser();
      fetchDataStore();
    }
  }, [id, sales, store]);

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(`https://neoshop-backend.vercel.app/user/${id}`);
      setDataUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataPay = async () => {
    try {
      const response = await axios.get(
        `https://neoshop-backend.vercel.app/paying/id/${sales}`
      );
      setDataPaying(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataStore = async () => {
    try {
      const response = await axios.get(`https://neoshop-backend.vercel.app/store/${store}`);
      setDataStore(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dataUser && !dataPaying && !dataStore) {
    return <>loading...</>;
  }

  // Calcular el tiempo transcurrido desde la fecha de compra
  const timeSincePurchase = dataPaying
    ? formatDistanceToNow(new Date(dataPaying.date))
    : "";

  // Función para volver a la página anterior
  const goBack = () => {
    router.back();
  };

  return (
    <Layout userId={id}>
      <PayDetail
        paying={dataPaying}
        user={dataUser}
        store={dataStore}
        timeSincePurchase={timeSincePurchase}
        goBack={goBack}
      />
    </Layout>
  );
}
