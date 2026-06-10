"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { initialized ,  user }= useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && initialized) {
      router.replace("/login");
    }
  }, [user, router , initialized]);

  if (!initialized) return null;

  return <>{children}</>;
}