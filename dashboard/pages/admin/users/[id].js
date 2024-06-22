// pages/admin/users.js
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import UserList from "../../../components/UserList";

export default function UsersPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout userId={id}>
      <UserList id={id} />
    </Layout>
  );
}
