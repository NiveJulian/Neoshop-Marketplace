import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import { useTranslation } from "react-i18next";

const ProfileDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.themes.theme);
  const { t } = useTranslation();

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const cartBackGround = theme === "dark" ? "#1c1c1c" : "#FFFFFF";
  const letrasPlomas = theme === "dark" ? "#bcbcbc" : "#434343";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  return (
    <div className="bg-gray-100 pb-10 min-h-screen" style={{ background: backgroundColor }}>
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg" style={{ background: cartBackGround }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center mb-6">
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full border border-gray-400 p-2 hover:border-secondary w-28 h-28 mr-5 text-center"
            />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: textColor }}>{`${user.name} ${user.lastname || ''}`}</h1>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>{user.email}</p>
            </div>
          </div>
          <Link to="/adress">
            <button
              className="flex items-center text-left p-2 border rounded-lg justify-between text-gray-600 hover:border-secondary"
              style={{ color: letrasPlomas, borderColor: bordesPlomos }}
            >
              {t("profileDetail.editAccount")}
              
            </button>
          </Link>
        </div>
        <div className="space-y-4">
          <Link to="/personal" className="block">
            <button
              className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow hover:border-secondary"
              style={{ borderColor: bordesPlomos }}
            >
              <div className="flex items-center">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: textColor }}>{t("profileDetail.personalInformation")}</h2>
                  <p className="text-gray-600" style={{ color: letrasPlomas }}>{t("profileDetail.personalInfoDescription")}</p>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/accountdetail" className="block">
            <button
              className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow hover:border-secondary"
              style={{ borderColor: bordesPlomos }}
            >
              <div className="flex items-center">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: textColor }}>{t('profileDetail.accountDetails')}</h2>
                  <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('profileDetail.accountDetailsDescription')}</p>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/myshopping" className="block">
            <button
              className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow hover:border-secondary"
              style={{ borderColor: bordesPlomos }}
            >
              <div className="flex items-center">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: textColor }}>{t('profileDetail.myShopping')}</h2>
                  <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('profileDetail.myShoppingDescription')}</p>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/favorites" className="block">
            <button
              className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow hover:border-secondary"
              style={{ borderColor: bordesPlomos }}
            >
              <div className="flex items-center">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: textColor }}>{t('profileDetail.favorites')}</h2>
                  <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('profileDetail.favoritesDetail')}</p>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
