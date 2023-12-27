import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../layout/SideBar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{display:"flex", flex:1}}>
      <SideBar />
      <Outlet />
    </Box>
  );
};

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const token = useSelector((state) => state.auth.token);

  return token ? <Layout /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
