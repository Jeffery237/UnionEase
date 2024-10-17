import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, LogOut, Bell, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user} = useAuthStore();

  const {logout} = useAuthStore();
  const handleLogout = () => {
    logout();
  }

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-white p-4 shadow flex items-center justify-between">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* User dropdown */}
      <div className="relative">
        
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}onClick={toggleDropdown} className="focus:outline-none flex gap-6" {...props}>

          <Bell size={25} className="text-black" />
          <MessageCircle size={25} className="text-black" />
          <User size={25} className="text-gray-400" />
        </motion.button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              {/* User name */}
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <span className="font-semibold">{user.name}</span>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;