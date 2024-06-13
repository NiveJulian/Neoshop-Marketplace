// _app.js

import { useRouter } from "next/router";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://neoshop-back.onrender.com/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);
  return <Component {...pageProps} user={user} />;
}
