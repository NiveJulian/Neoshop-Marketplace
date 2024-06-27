import Image from "next/image";
import Link from "next/link";

export default function ProfileUser({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md w-11/12 md:w-8/12 lg:w-6/12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                {user.picture ? (
                  <Image
                    className="h-auto w-full mx-auto"
                    src={user?.picture}
                    alt="Profile Picture"
                    width={200}
                    height={200}
                  />
                ) : (
                  <p className="flex gap-2 border border-b-gray-300 p-5 items-center justify-center text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    No picture
                  </p>
                )}
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user?.name} {user?.lastname}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {user?.user_type} at Company
              </h3>
              <ul className="bg-gray-100 w-40 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3 px-2">
                  <span>Status</span>
                  <span className="ml-auto p-4">
                    <span
                      className={`py-1 px-2 rounded text-white text-sm ${
                        user?.is_active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user?.is_active ? "Active" : "Inactive"}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {new Date(user?.date_creation).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-9/12 mx-2">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">First Name</div>
                    <div className="px-2 py-2">{user?.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">Last Name</div>
                    <div className="px-2 py-2">{user?.lastname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">Gender</div>
                    <div className="px-2 py-2">{user?.gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">Contact No.</div>
                    <div className="px-2 py-2">{user?.phone_number}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-2 py-2">
                      {user?.adress_street} {user?.adress_nro}, {user?.city},{" "}
                      {user?.state}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">Email</div>
                    <div className="px-2 py-2 max-w-xs overflow-hidden overflow-ellipsis">
                      <Link
                        className="text-blue-800"
                        href={`mailto:${user?.email}`}
                      >
                        {user?.email}
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-2 py-2 font-semibold">Birthday</div>
                    <div className="px-2 py-2">
                      {new Date(user?.birthdate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="block w-full justify-end items-end text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
