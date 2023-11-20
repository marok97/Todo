import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const token = useSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
