import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Actions/Actions";
import { doSignOut } from "../../firebase/auth";

export default function User({ user, onClose }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await doSignOut();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-72 h-auto rounded overflow-hidden shadow-lg">
        <div className="text-center p-6 bg-gray-800 border-b">
          <button
            type="button"
            className="flex top-0 right-0 text-3xl text-white hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex justify-center">
            {!user?.picture ? (
              <svg
                aria-hidden="true"
                role="img"
                className="h-32 w-32 text-white rounded-full mx-auto border border-gray-200 p-2 hover:border-secondary"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                ></path>
              </svg>
            ) : (
              <img
                className="rounded-full border border-gray-200 p-2 hover:border-secondary w-32 h-32"
                src={user?.picture}
              ></img>
            )}
          </div>

          <p className="pt-2 text-lg font-semibold text-gray-50">
            {user?.name}
          </p>
          <p className="text-sm text-gray-100">{user?.email}</p>
        </div>
        <div className="border-b">
          <Link to="/Profile" className="px-4 py-2 hover:bg-gray-100 flex">
            <p className="text-sm font-medium text-gray-600">Profile</p>
          </Link>
          <Link to="/Contact" className="px-4 py-2 hover:bg-gray-100 flex">
            <p className="text-sm font-medium text-gray-600">Contact</p>
          </Link>
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-4 text-sm text-left text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
