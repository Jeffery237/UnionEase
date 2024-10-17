import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Users, DollarSign, FileText } from 'lucide-react';
import DataTable from 'datatables.net';



const Managers = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('YOUR_API_ENDPOINT_HERE') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setManagers(data.managers);
        $('#API-child-row').DataTable({
          data: data.managers,
          columns: [
            { className: 'details-control', orderable: false, data: null, defaultContent: '' },
            { data: 'firstname' },
            { data: 'lastname' },
            { data: 'email' },
            { data: 'total_requests' },
          ],
          order: [[1, 'asc']],
        });
      });
  }, []);

  const handleRowClick = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRevokeRights = () => {
    // Handle the revocation of rights here
    console.log('Revoking rights for:', selectedManager);
    setIsModalOpen(false);
  };

  const handleRequestValidation = () => {
    toast.success('Request validated successfully!');
  };
  return (
    <Layout>
  
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="page-header mb-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-semibold">List of Managers</h3>
              <ol className="breadcrumb flex gap-4">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Managers</a></li>
                <li className="breadcrumb-item active"><a href="#">List of Managers</a></li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card bg-white p-6 shadow-sm">
          <div className="card-header mb-4">
            <h5 className="text-xl font-semibold">List of managers</h5>
            <span className="text-gray-500">Managers using the platform</span>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="display w-full" id="API-child-row">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email Address</th>
                    <th>Requests</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map((manager) => (
                    <tr key={manager.id}>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRowClick(manager)}
                        >
                          REVOKE RIGHTS
                        </button>
                      </td>
                      <td>{manager.firstname}</td>
                      <td>{manager.lastname}</td>
                      <td>{manager.email}</td>
                      <td>{manager.total_requests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
              <h5 className="text-xl font-semibold mb-4">Confirm action</h5>
              <div className="text-gray-700 mb-4">
                REVOKE management rights for user <b>{selectedManager?.firstname} {selectedManager?.lastname}</b>
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary mr-2" onClick={handleModalClose}>
                  Close
                </button>
                <button className="btn btn-secondary" onClick={handleRevokeRights}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
      <ToastContainer />
    </Layout>
  );
}

export default Managers