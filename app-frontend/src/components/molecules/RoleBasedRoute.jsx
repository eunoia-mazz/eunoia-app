import { Navigate } from "react-router-dom";
import useStore from "@/useStore";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = useStore((state) => state.token);
  const isAdmin = useStore((state) => state.isAdmin);

  if (!token) return <Navigate to="/login" replace />;

  const userRole = isAdmin ? "Admin" : "User";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
