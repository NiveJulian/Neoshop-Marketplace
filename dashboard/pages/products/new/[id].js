import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import ProductForm from "../../../components/ProductForm";

export default function NewProduct() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout userId={id}>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
