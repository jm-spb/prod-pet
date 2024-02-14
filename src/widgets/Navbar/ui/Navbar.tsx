import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation('translation');
  const handleModalOpen = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <Button className={styles.links} variant={ButtonVariant.CLEAR} onClick={handleModalOpen}>
        {t('login')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={handleModalOpen} />
    </div>
  );
};
