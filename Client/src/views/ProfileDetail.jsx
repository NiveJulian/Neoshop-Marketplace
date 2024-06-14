import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav";

const ProfileDetail = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="bg-gray-100 pb-10 min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
            <img
            src={user.picture}
            alt={user.name}
            className="rounded-full border border-gray-400 p-2 hover:border-secondary w-28 h-28 mr-5 text-center"
            />
            <div>
            <h1 className="text-2xl font-bold">{`${user.name} ${user.lastname || ''}`}</h1>
            <p className="text-gray-600">{user.email}</p>
            </div>
        </div>
        <Link to="/adress">
        <button className="flex items-center text-left p-2 border border-gray-300 rounded-lg justify-between text-gray-600 hover:border-secondary">
            Edit account
        </button>
        </Link>        
        </div>
        <div className="space-y-4">
        <Link to="/personal" className="block">
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              {/* <span className="material-icons text-green-500 mr-2">check_circle</span> */}
              <div>
                <h2 className="text-xl font-semibold">Personal information</h2>
                <p className="text-gray-600">Information from your identity document and your tax activitie.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          </Link>
          <Link to="/accountdetail" className="block">
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              {/* <span className="material-icons text-green-500 mr-2">check_circle</span> */}
              <div>
                <h2 className="text-xl font-semibold">Your account details</h2>
                <p className="text-gray-600">Data that represents the account you signed in.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          </Link>
          <Link to="/myshopping" className="block">          
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">My shopping</h2>
                <p className="text-gray-600">Your history of shopping on the app.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          </Link>  
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Adresses</h2>
                <p className="text-gray-600">Data from your addresses saved in your account.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>        
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Cards</h2>
                <p className="text-gray-600">Data from your cards saved in your account.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>          
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Privacy</h2>
                <p className="text-gray-600">Preferences and control over the use of your data.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          {/* <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Communications</h2>
                <p className="text-gray-600">Choose what type of information you want to recieve.</p>
              </div>
            </div>
            <span className="material-icons text-gray-400">chevron_right</span>
          </button> */}
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              {/* <span className="material-icons text-green-500 mr-2">check_circle</span> */}
              <div>
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="text-gray-600">Security configuration for your account.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
        </div>
        {/* <div className="mt-4 text-gray-500 text-center">
          <a href="#" className="text-blue-500">Cancelar tu cuenta</a> siempre que lo desees.
        </div> */}
      </div>
    </div>
  );
};

export default ProfileDetail;