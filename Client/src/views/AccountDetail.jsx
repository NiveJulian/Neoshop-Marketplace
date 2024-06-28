import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Nav from "../components/Nav/Nav";
import { useTranslation } from "react-i18next";

const AccountDetail = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === "dark" ? "#212121" : "#F3F4F6";
  const cartBackGround = theme === "dark" ? "#1c1c1c" : "#FFFFFF";
  const letrasPlomas = theme === "dark" ? "#bcbcbc" : "#434343";
  const textColor = theme === "dark" ? "#ECECEC" : "#2b2b2b";
  const bordesPlomos = theme === "dark" ? "#4a4a4a" : "#DDDDDD";

  return (
    <div className="bg-gray-100 pb-10 min-h-screen" style={{ background: backgroundColor }}>
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg"
       style={{ background: cartBackGround }}>
      <div className="flex items-center justify-between mb-6"
       style={{ background: cartBackGround }}>
          <div className="flex items-center mb-6">
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-full border border-gray-400 p-2 w-28 h-28 mr-5"
          />
          <div>
            <h1 className="text-2xl font-bold" style={{ color: textColor }}>{`${user.name} ${user.lastname || ''}`}</h1>
            <p className="text-gray-600" style={{ color: letrasPlomas }}>{user.email}</p>
          </div>
          </div>
          <div className="mr-6 text-2xl font-bold text-gray-400">
          {t('accountDetail.yourAccountDetails')}
        </div>
        </div>
        <div className="space-y-4 mb-4" >
          <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow" style={{ borderColor: bordesPlomos }}>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor }}>{t('accountDetail.accountData')}</h2>
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.email')}: {user.email}</p>
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.phoneNumber')}: {`${user.phone_number || "N/A"}`}</p>
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.creationDate')}: {`${user.date_creation || "N/A"}`}</p>
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.accountType')}: {`${user.user_type || "N/A"}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center text-left p-4 border border-gray-300 rounded-lg justify-between w-full flex-grow" style={{ borderColor: bordesPlomos }} >
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: textColor }}>{t('accountDetail.security')}</h2>
                <p className="text-gray-600 mr-4" style={{ color: letrasPlomas }}>
                {t('accountDetail.password')}:
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 mr-4 border border-gray-300 rounded-lg pl-1 pr-1 hover:border-secondary"
                    >
                        {showPassword ? `${user.password || "N/A"}` : "************"}
                    </button>
                </p>
                    
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.phoneNumber')}: {`${user.phone_number || "N/A"}`}</p>
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.emailVerified')}: {`${user.email_verified || t('awaitingVerification')}`}</p>
                <p className="text-gray-600" style={{ color: letrasPlomas }}>{t('accountDetail.creationDate')}: {`${user.date_creation || "N/A"}`}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AccountDetail;
