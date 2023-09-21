import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import styles from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: React.FC<PageErrorProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('translation');

  const reloadPage = () => window.location.reload();

  return (
    <div className={classNames(styles.pageError, {}, [className])}>
      <p>{t('error-message')}</p>
      <Button onClick={reloadPage}>{t('page-refresh')}</Button>
    </div>
  );
};
