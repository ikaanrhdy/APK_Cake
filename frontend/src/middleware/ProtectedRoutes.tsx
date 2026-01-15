import { Navigate, Outlet } from "react-router";
import { onAuthStateChanged, type User } from "firebase/auth";

import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase";

export default function ProtectedRoutes() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // penting!
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
