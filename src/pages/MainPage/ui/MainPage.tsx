import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation('translation');

  return (
    <div>
      {t('main')}
      <BugButton />
    </div>
  );
};

export default MainPage;
