import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * AdminRoute - wraps any /admin page.
 * If the user is not logged in or not an admin, redirects to home.
 */
const AdminRoute = ({ children }) => {
  const { userInfo, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userInfo || userInfo.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
