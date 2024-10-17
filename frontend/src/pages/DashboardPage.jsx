import React from 'react';
import Layout from '../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Users, DollarSign, FileText } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-gray-300 p-6 rounded-lg shadow-md ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <Icon className="text-white" size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const handleRequestValidation = () => {
    toast.success('Request validated successfully!');
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, Admin. Here's an overview of your system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Users" value="1,234" icon={Users} color="bg-blue-500" />
        <DashboardCard title="Total Revenue" value="$56,789" icon={DollarSign} color="bg-gray-400"/>
        <DashboardCard title="Pending Requests" value="23" icon={FileText} color="bg-yellow-500" />
        <DashboardCard title="Active Projects" value="7" icon={BarChart} color="bg-purple-500" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span>New user registration</span>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Payment received</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>New project created</span>
            <span className="text-sm text-gray-500">3 hours ago</span>
          </li>
        </ul>
      </div>

      <button
        onClick={handleRequestValidation}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Validate Request
      </button>

      <ToastContainer />
    </Layout>
  );
};

export default Dashboard;