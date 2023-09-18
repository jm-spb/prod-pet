// import { classNames } from 'shared/lib/classNames/classNames';
// import styles from './BugButton.module.scss';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

export const BugButton: React.FC = () => {
  const { t } = useTranslation('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) throw new Error();
  }, [error]);

  const onThrow = () => {
    setError(true);
  };

  return <Button onClick={onThrow}>{t('throw-error')}</Button>;
};
