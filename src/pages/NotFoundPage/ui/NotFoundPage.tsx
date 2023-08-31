import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('translation');

  return <div className={classNames(styles.notFoundPage, {}, [className])}>{t('not-found')}</div>;
};
