import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo(() => {
  const { t } = useTranslation('translation');

  return (
    <div>
      {t('main')}
      <BugButton />
    </div>
  );
});

export default MainPage;
