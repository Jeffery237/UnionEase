import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Home, BarChart, Users, User, ClipboardCheck, CreditCard, FileText, Settings, Briefcase, LogOut, Hourglass, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  // Logout function
  function handleLogout() {
    logout();
  }

  // Sidebar navigation items
  const sidebarItems = [
    { icon: Home, text: 'Dashboard', href: '/dashboard' },
    { icon: BarChart, text: 'Statistics', href: '/statistics' },
    { icon: Hourglass, text: 'Timeslot', href: '/create-timeslot' },
    { icon: FileText, text: 'Requests', href: '/requests' },
    { icon: Calendar, text: 'Appointments', href: '/appointments' },
    { icon: ClipboardCheck, text: 'Demand', href: '/demand-form' },
    { icon: CreditCard, text: 'Payments', href: '/payments' },
    { icon: User, text: 'Users', href: '/users' },
    { icon: Users, text: 'Managers', href: '/managers' },
    { icon: Settings, text: 'Settings', href: '/settings' },
  ];

  return (
    <motion.aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gray-700 shadow-md transition-all duration-300 flex flex-col`}
      initial={{ x: -200 }}
      animate={{ x: 0 }}
    >
      {/* Sidebar header */}
      <div className="p-4 flex items-center justify-between">
        {/* Display App Name or Logo based on sidebar state */}
        <AnimatePresence>
          {isOpen ? (
            <motion.span
              key="app-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold text-white"
            >
              UnionEase
            </motion.span>
          ) : (
            <motion.div
              key="app-logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {/* <Briefcase size={24} className="text-green-400" /> */}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Menu Icon toggles sidebar */}
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? <Menu size={24} /> : <Briefcase size={24} className="text-green-400 mr-4" />}
        </button>
      </div>
      
      {/* User profile section - appears only when the sidebar is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mt-8 mb-8 flex flex-col items-center"
          >
            <motion.img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full w-24 h-24 border-2 border-green-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="mt-2 font-semibold text-white">{user.name}</span>
            <span className="mt-1 bg-green-800 text-white text-xs px-2 py-1 rounded-full lowercase">
              {user.role}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation items */}
      <nav className="flex-grow">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`flex items-center py-3 px-4 rounded-lg mx-2 mb-1 transition-colors duration-200 ${
              location.pathname === item.href
                ? 'bg-green-700 text-white'
                : 'hover:bg-green-600 hover:text-white'
            } ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            {/* Display the icons */}
            <item.icon className="text-white" size={24} />
            {/* Display the text only when the sidebar is open */}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3"
                >
                  {item.text}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className={`flex items-center py-2 px-4 w-full rounded-lg transition-colors duration-200 hover:bg-red-600 hover:text-white ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut size={24} className="text-white" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
