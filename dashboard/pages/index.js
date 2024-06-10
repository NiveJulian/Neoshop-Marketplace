'use client'; 
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../components/Layout";

const Home = () => {

  const { user, error, isLoading } = useUser();
  
  console.log(user);

  return (
    <Layout>
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
};

export default Home;
