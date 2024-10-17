import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/layouts/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Users, DollarSign, FileText } from 'lucide-react';
import Swal from 'sweetalert2';



const Statistics = () => {

  const handleRequestValidation = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this',
      icon: 'warnign',
      confirmButtonColor: '#3085d6',
      showCancelButton:'true',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes', 
    }).then((result) =>{
      if(result.isConfirmed){
        Swal.fire(
          'Deleted',
          'Your item has been deleted',
          'success'
        )
      }else if(result.isDismissed)
        Swal.fire(
          'Cancelled',
          'Your item is safe',
          'error'
        )
      
    });
  };
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Overall Statistics</h1>
        <p className="mt-2 text-gray-600">Welcome back, Admin. Here's an overview of your system.</p>
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
}

export default Statistics