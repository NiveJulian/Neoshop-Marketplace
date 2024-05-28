export default function UserFormLogin({ title }) {
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center mb-4 text-3xl text-primary border-b-2 p-2">
          <strong>{title}</strong>
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/signup"
          >
            Sign Up
          </a>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            className="w-full bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            type="button"
          >
            <img src="google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <button
            className="w-full bg-gray-100 hover:bg-gray-300 text-gray-700 hover:text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            type="button"
          >
            <img src="facebook-icon.png" alt="Facebook" className="w-6 h-5 mr-2" />
            Sign in with Facebook
          </button>
        </div>
      </form>
      {/* <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p> */}
    </div>
  );
}
