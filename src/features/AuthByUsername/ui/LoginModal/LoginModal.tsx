import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import styles from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { className, isOpen, onClose } = props;
  const { t } = useTranslation('translation');

  return (
    <Modal className={classNames(styles.loginModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <span className={styles.heading}>{t('auth')}</span>
        <LoginForm isLoading />
      </div>
    </Modal>
  );
};
