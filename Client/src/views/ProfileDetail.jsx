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
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg ">
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
                <h2 className="text-xl font-semibold"style={{ color: textColor}}>Personal information</h2>
                <p className="text-gray-600" style={{ color: letrasPlomas}}>Information from your identity document and your tax activitie.</p>
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
                <h2 className="text-xl font-semibold"style={{ color: textColor}}>Your account details</h2>
                <p className="text-gray-600"style={{ color: letrasPlomas}}>Data that represents the account you signed in.</p>
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
          <Link to="/favorites" className="block">
          <button className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow hover:border-secondary">
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold">Favorites</h2>
                <p className="text-gray-600">List of your favorite products.</p>
              </div>
            </div>
            {/* <span className="material-icons text-gray-400">chevron_right</span> */}
          </button> 
          </Link>                
        </div>
        {/* <div className="mt-4 text-gray-500 text-center">
          <a href="#" className="text-blue-500">Cancelar tu cuenta</a> siempre que lo desees.
        </div> */}
      </div>
    </div>
  );
};

export default ProfileDetail;