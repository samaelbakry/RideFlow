"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializAuth, setUser } from "@/store/slices/authSlice";

export default function AuthProvider({ children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }else{
      dispatch(initializAuth())
    }

  }, [dispatch]);

  return children;
}