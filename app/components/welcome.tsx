"use client"


import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WelcomeProps {
  onUserRegistered: () => void;
}

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_API_URL);

export default function Welcome({ onUserRegistered }: WelcomeProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, phone, grade };

    try {
      const userCheck = await pb.collection('Quiz_Users').getList(1, 1, {
        filter: `phone="${phone}"`,
      });

      let userRecord;
      if (userCheck.totalItems > 0) {
        userRecord = userCheck.items[0];
        toast.info('Welcome back!');
      } else {
        userRecord = await toast.promise(
          pb.collection('Quiz_Users').create(data),
          {
            pending: 'Submitting...',
            success: 'Submission Successful 👌',
            error: 'Submission Failed 🤯'
          }
        );
      }

      localStorage.setItem('user', JSON.stringify(userRecord));

      onUserRegistered();


      setName('');
      setPhone('');
      setGrade('');
    } catch (error) {
      console.error('Error processing submission:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-gray-900">Welcome</h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="appearance-none text-gray-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Grade
              </label>
              <div className="mt-1">
                <select
                  id="grade"
                  name="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                  className="appearance-none text-gray-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Grade</option>
                  <option value="G3">Grade 3</option>
                  <option value="G4">Grade 4</option>
                  <option value="G5">Grade 5</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Info
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}