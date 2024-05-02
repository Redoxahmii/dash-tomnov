import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const user = true;
  return user ? <Outlet /> : <Navigate to="/log-in" />;
};

export default ProtectedRoute;
