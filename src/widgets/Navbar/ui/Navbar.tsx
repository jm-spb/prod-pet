import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkColor } from 'shared/ui/AppLink/AppLink';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation('translation');

  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <div className={styles.links}>
        <AppLink to="/" color={AppLinkColor.INVERTED}>
          {t('main')}
        </AppLink>
        <AppLink to="/about" color={AppLinkColor.INVERTED}>
          {t('about')}
        </AppLink>
      </div>
    </div>
  );
};
