import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav";

const ProfileDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.themes.theme);//todo

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";//todo
  const cartBackGround = theme === "dark" ? "#1c1c1c" : "#FFFFFF";
  const letrasPlomas = theme === "dark" ? "#bcbcbc" : "#434343";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  return (
    <div className="bg-gray-100 pb-10 min-h-screen" style={{ background: backgroundColor}}>
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg" style={{ background: cartBackGround}}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
            <img
            src={user.picture}
            alt={user.name}
            className="rounded-full border border-gray-400 p-2 hover:border-secondary w-28 h-28 mr-5 text-center"
            />
            <div>
            <h1 className="text-2xl font-bold" style={{ color: textColor}}>{`${user.name} ${user.lastname || ''}`}</h1>
            <p className="text-gray-600" style={{ color: letrasPlomas}}>{user.email}</p>
            </div>
        </div>
        <button className="flex items-center text-left p-2 border border-gray-300 rounded-lg justify-between text-gray-600 hover:border-secondary"
        style={{ color: letrasPlomas, borderColor: bordesPlomos}}>
            Edit account
        </button>
        </div>
        <div className="space-y-4">
        <Link to="/Personal" className="block">
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              {/* <span className="material-icons text-green-500 mr-2">check_circle</span> */}
              <div>
                <h2 className="text-xl font-semibold"style={{ color: textColor}}>Personal information</h2>
                <p className="text-gray-600" style={{ color: letrasPlomas}}>Information from your identity document and your tax activitie.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          </Link>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              {/* <span className="material-icons text-green-500 mr-2">check_circle</span> */}
              <div>
                <h2 className="text-xl font-semibold"style={{ color: textColor}}>Your account details</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Data that represents the account you signed in.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              {/* <span className="material-icons text-green-500 mr-2">check_circle</span> */}
              <div>
                <h2 className="text-xl font-semibold"style={{ color: textColor}}>Security</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Security configuration for your account.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor}}>Cards</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Data from your cards saved in your account.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor}}>Adresses</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Data from your addresses saved in your account.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor}}>Privacy</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Preferences and control over the use of your data.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor}}>Communications</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Choose what type of information you want to recieve.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button>
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary"
          style={{ borderColor: bordesPlomos}}>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor}}>My shopping</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Your history of shopping on the app.</p>
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