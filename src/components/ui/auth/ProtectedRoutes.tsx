"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoutes({children,}: {  children: React.ReactNode;}) {
  const router = useRouter();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}