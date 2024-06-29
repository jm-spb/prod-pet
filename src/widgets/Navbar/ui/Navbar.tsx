import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
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

  const toggleShowModal = () => {
    setIsAuthModalOpen((prev) => !prev);
  };

  if (authData) {
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
      <Button className={styles.links} variant={ButtonVariant.CLEAR} onClick={toggleShowModal}>
        {t('login')}
      </Button>
      <LoginModal isOpen={isAuthModalOpen} onClose={toggleShowModal} />
    </div>
  );
};
