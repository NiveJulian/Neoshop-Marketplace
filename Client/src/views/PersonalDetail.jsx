import { useSelector } from "react-redux";
import { useState } from "react";
import img from "../assets/images/user-default.png"
import Nav from "../components/Nav/Nav";

const PersonalDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-100 pb-10 min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          {!user.picture === "" ? (
            <img
              src={img}
              alt={user.name}
              className="rounded-full border border-gray-400 p-2 hover:border-secondary w-28 h-28 mr-5"
            />
          ) : (
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full border border-gray-400 p-2 hover:border-secondary w-28 h-28 mr-5"
            />
          )}

          <div>
            <h1 className="text-2xl font-bold">{`${user.name} ${
              user.lastname || ""
            }`}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          </div>
          <div className="mr-6 text-2xl font-bold text-gray-400">
          Your personal information
        </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Personal</h2>
                <p className="text-gray-600">Name: {user.name}</p>
                <p className="text-gray-600">
                  Lastname: {`${user.lastname || "N/A"}`}
                </p>
                <p className="text-gray-600">
                  Document: {`${user.nro_document || "N/A"}`}
                </p>
                <p className="text-gray-600">
                  State: {`${user.state || "N/A"}`}
                </p>
                <p className="text-gray-600">City: {`${user.city || "N/A"}`}</p>
                <p className="text-gray-600">
                  Birth Date: {`${user.birthdate || "N/A"}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Account Data</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">
                  Phone number: {`${user.phone_number || "N/A"}`}
                </p>
                <p className="text-gray-600">
                  Document: {`${user.nro_document || "N/A"}`}
                </p>
                <p className="text-gray-600">
                  Creation Date: {`${user.date_creation || "N/A"}`}
                </p>
                <p className="text-gray-600">
                  Account Type: {`${user.user_type || "N/A"}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="text-gray-600 mr-4">
                  Password:
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 mr-4 border border-gray-300 rounded-lg pl-1 pr-1 hover:border-secondary"
                  >
                    {showPassword
                      ? `${user.password || "N/A"}`
                      : "************"}
                  </button>
                </p>

                <p className="text-gray-600">
                  Phone number: {`${user.phone_number || "N/A"}`}
                </p>
                <p className="text-gray-600">
                  Email verified:{" "}
                  {`${user.email_verified || "Awaiting verification"}`}
                </p>
                <p className="text-gray-600">
                  Creation Date: {`${user.date_creation || "N/A"}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PersonalDetail;
