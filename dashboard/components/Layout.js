import Nav from "./Nav";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import axios from "axios";

export default function Layout({ children, userId, user }) {
  const [showNav, setShowNav] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/user/${userId}`
          );
          setUserData(response.data);
          if(response.data.user_type === "admin"){
            setIsAdmin(true)
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.user_type !== "admin" && userData.user_type !== "trader") {
      router.push("/not-authorized"); 
    }
  }, [userData, router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 h-full">
      <div className="md:hidden flex items-center justify-center p-4">
        <button onClick={() => setShowNav(!showNav)}>
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} userId={userId} user={user} isAdmin={isAdmin}/>
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
