import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const getUserFromLocalStorage = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthorized(false);
        setCheckingAuth(false);
        return;
      }

      const storedUser = getUserFromLocalStorage();
      if (!storedUser || !allowedRoles.includes(storedUser.role)) {
        setIsAuthorized(false);
        setCheckingAuth(false);
        return;
      }

      try {
        await user.getIdTokenResult(); // optionally check expiration
        setIsAuthorized(true);
      } catch (err) {
        console.error("Token check failed", err);
        setIsAuthorized(false);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [allowedRoles]);

  if (checkingAuth) return <div>Loading...</div>;
  if (!isAuthorized) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
