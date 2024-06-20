import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const { authData } = useSelector((state: StateSchema) => state.user);

  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  const handleModalOpen = () => {
    setIsAuthModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAuthModalOpen(false);
  };

  if (authData) {
    if (isAuthModalOpen) setIsAuthModalOpen(false);

    return (
      <div className={classNames(styles.navbar, {}, [className])}>
        <Button className={styles.links} variant={ButtonVariant.CLEAR} onClick={handleLogout}>
          {t('logout')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <Button className={styles.links} variant={ButtonVariant.CLEAR} onClick={handleModalOpen}>
        {t('login')}
      </Button>
      <LoginModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </div>
  );
};
