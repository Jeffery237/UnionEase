import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import AppointmentBooking from '../components/AppointmentForm'

const AppointmentPage = () => {
useEffect(()=>{
  document.title = 'Appointment page'
})
  return (
    <Layout>
      <div className="page-header mb-6">
          <div className="flex justify-between">
            <div className='mt-5 ml-5'>
              <h3 className="text-2xl font-semibold">Book Appointment</h3>  
              <ol className="flex gap-4">
                <li><a href="#" className="hover:text-gray-800">New</a></li><span>&gt;</span>
                <li><a href="#" className="hover:text-gray-800">Appointments</a></li><span>&gt;</span>
              </ol>
            </div>
          </div>
        </div>
      <AppointmentBooking/>
    </Layout>
  )
}

export default AppointmentPage