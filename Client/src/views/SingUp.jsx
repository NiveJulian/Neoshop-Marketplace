import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import UserFormRegister from '../components/UserForm/UserFormRegister';
import { useSelector } from 'react-redux';

export default function SignUp() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.themes.theme);

  const backgroundColor = theme === 'dark' ? '#212121' : '#F3F4F6';
  const azulOscuro = theme === 'dark' ? '#212121' : '#0069AA';

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ background: backgroundColor }}
    >
      <div className="w-1/2 hidden lg:inline-flex h-screen text-white">
        <div
          className="w-[450px] shadow-md shadow-gray-400 h-full bg-primary px-10 flex flex-col gap-6 justify-center"
          style={{ background: azulOscuro }}
        >
          <Link to="/">
            <img
              src={'neoshoplogo.jpeg'}
              alt="logoImg"
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-2xl font-bold">
              {t('signUp.registerTitle')}
            </h1>
            <p className="text-base">{t('signUp.registerSubtitle')}</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                {t('signUp.fastStart')}
              </span>
              <br />
              {t('signUp.fastStartText')}
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                {t('signUp.allServices')}
              </span>
              <br />
              {t('signUp.allServicesText')}
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                {t('signUp.trustedBy')}
              </span>
              <br />
              {t('signUp.trustedByText')}
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
                {t('neoShopCopy')}
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
              {t('signUp.terms')}
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
              {t('signUp.privacy')}
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
              {t('signUp.security')}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <UserFormRegister />
      </div>
    </div>
  );
}
