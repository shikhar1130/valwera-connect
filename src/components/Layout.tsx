
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightBar from "./RightBar";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireAuth = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-brandPurple border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {user && (
            <div className="hidden lg:block lg:col-span-3">
              <Sidebar />
            </div>
          )}
          
          <main className={`${user ? "lg:col-span-6" : "lg:col-span-12"}`}>
            {children}
          </main>
          
          {user && (
            <div className="hidden lg:block lg:col-span-3">
              <RightBar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
