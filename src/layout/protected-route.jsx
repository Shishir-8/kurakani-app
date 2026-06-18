import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function ProtectedRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}