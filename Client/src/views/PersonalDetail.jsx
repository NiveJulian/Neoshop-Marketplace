import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import img from "../assets/images/user-default.png";
import Nav from "../components/Nav/Nav";

const PersonalDetail = () => {
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
    <div className="pb-10 min-h-screen" style={{ background: backgroundColor }}>
      <Nav />
      <div
        className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg"
        style={{ background: cartBackGround }}
      >
        <div className="flex items-center mb-6">
          {user.picture === "" ? (
            <img
              src={img}
              alt={user.name}
              className="rounded-full border p-2 hover:border-secondary w-28 h-28 mr-5"
              style={{ borderColor: bordesPlomos }}
            />
          ) : (
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full border p-2 hover:border-secondary w-28 h-28 mr-5"
              style={{ borderColor: bordesPlomos }}
            />
          )}

          <div>
            <h1 className="text-2xl font-bold" style={{ color: textColor }}>
              {`${user.name} ${user.lastname || ""}`}
            </h1>
            <p className="text-gray-600" style={{ color: letrasPlomas }}>{user.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div
            className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow"
            style={{ borderColor: bordesPlomos }}
          >
            <div>
              <h2 className="text-xl font-semibold" style={{ color: textColor }}>
                {t('personalDetails.personal')}
              </h2>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.name')}: {user.name}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.lastname')}: {`${user.lastname || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.document')}: {`${user.nro_document || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.state')}: {`${user.state || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.city')}: {`${user.city || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.birthdate')}: {`${user.birthdate || t('personalDetails.na')}`}
              </p>
            </div>
          </div>
          <div
            className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow"
            style={{ borderColor: bordesPlomos }}
          >
            <div>
              <h2 className="text-xl font-semibold" style={{ color: textColor }}>
                {t('personalDetails.accountData')}
              </h2>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.email')}: {user.email}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.phoneNumber')}: {`${user.phone_number || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.document')}: {`${user.nro_document || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.creationDate')}: {`${user.date_creation || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.accountType')}: {`${user.user_type || t('personalDetails.na')}`}
              </p>
            </div>
          </div>
          <div
            className="flex items-center text-left p-4 border rounded-lg justify-between w-full flex-grow"
            style={{ borderColor: bordesPlomos }}
          >
            <div>
              <h2 className="text-xl font-semibold" style={{ color: textColor }}>
                {t('personalDetails.security')}
              </h2>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.password')}:
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 mr-4 border rounded-lg pl-1 pr-1 hover:border-secondary"
                  style={{ borderColor: bordesPlomos }}
                >
                  {showPassword
                    ? `${user.password || t('personalDetails.na')}`
                    : "************"}
                </button>
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.phoneNumber')}: {`${user.phone_number || t('personalDetails.na')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.emailVerified')}: {`${user.email_verified || t('personalDetails.awaitingVerification')}`}
              </p>
              <p className="text-gray-600" style={{ color: letrasPlomas }}>
                {t('personalDetails.creationDate')}: {`${user.date_creation || t('personalDetails.na')}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;
