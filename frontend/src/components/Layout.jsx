import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import { useAuthStore } from "../store/authStore";

const Layout = ({ children }) => {
  // State to control sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuthStore();

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle user logout
  const handleLogout = async () => {
    logout();
    // Add any additional logout logic here (e.g., redirect to login page)
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={handleSidebarToggle} 
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header component */}
        <Header onLogout={handleLogout} />

        {/* Main content area */}
        <motion.main
          className="flex-1 p-6 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>

        {/* Footer */}
        <footer className="bg-white p-4 shadow">
          <p className="text-center text-gray-600">© 2024 MyApp. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;