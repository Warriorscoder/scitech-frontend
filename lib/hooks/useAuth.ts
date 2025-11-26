"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../auth";

export function useAdminGuard() {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.role !== "Admin") {
      router.push("/auth/login");
    }
  }, [router]);
}
