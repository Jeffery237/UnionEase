import React from 'react'
import Layout from '../components/Layout';
import StepperControl from '../components/forms/StepperControl';



const DemandPage = () => {


  return (
    <div>
      <Layout>
        <div className="page-header mb-6">
          <div className="flex justify-between">
            <div className='mt-5 ml-5'>
              <h3 className="text-2xl font-semibold">New Requests</h3>  
              <ol className="flex gap-4">
                <li><a href="#" className="hover:text-gray-800">Home</a></li><span>&gt;</span>
                <li><a href="#" className="hover:text-gray-800">requests</a></li><span>&gt;</span>
                <li><a href="#" className="hover:text-gray-800">New Requests</a></li>
              </ol>
            </div>
          </div>
        </div>
        <div className='md:w-full mx-auto shadow-lg rounded-lg bg-white py-4 px-6'>
          <h1 className='text-2xl uppercase font-semibold text-gray-900 ml-6 mt-3 pb-10'>demand form</h1>
           <StepperControl />
        </div> 
      </Layout>

    </div>
  )
}

export default DemandPage