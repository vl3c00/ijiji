"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/check-auth");
      const data = await res.json();

      if (!res.ok || !data.authenticated) {
        router.push("/home/services"); // Redirect if not authenticated
      } else {
        setIsAuthenticated(true);
      }
    }

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return <p>Checking authentication...</p>;
  }

  return <SignIn />;
}
