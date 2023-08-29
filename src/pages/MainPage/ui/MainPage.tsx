import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation('translation');

  return <div>{t('main')}</div>;
};

export default MainPage;
