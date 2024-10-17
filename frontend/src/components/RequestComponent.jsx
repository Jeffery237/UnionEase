import React from 'react'

const RequestComponent = () => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
        <h5 className="text-lg font-semibold">{request.name}</h5>
        <p className="text-gray-600">Status: {request.status}</p>
    </div>
  )
}

export default RequestComponent