"use client";

import useAuth from "@/stores/userStore";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const { setUser, logOut } = useAuth();

  const loginStatus = async () => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok || res.status !== 200) {
        logOut();
        return;
      }

      const data = res.json();

      if (data?.user) setUser(data.user);
    } catch (err) {
      logOut();
      return;
    }
  };

  useEffect(() => {
    loginStatus;
  }, []);

  return children;
};

export default AuthProvider;
