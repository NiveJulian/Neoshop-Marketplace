// pages/admin/stores.js
import { useRouter } from "next/router";
import StoreList from "../../../components/StoreList";
import Layout from "../../../components/Layout";

export default function StoresPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout userId={id}>
      <StoreList id={id} />
    </Layout>
  );
}
