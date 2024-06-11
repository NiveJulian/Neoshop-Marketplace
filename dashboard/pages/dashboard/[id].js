import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Dashboard({user}) {
  const router = useRouter();
  const { id } = router.query;

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
    </Layout>
  );
}
