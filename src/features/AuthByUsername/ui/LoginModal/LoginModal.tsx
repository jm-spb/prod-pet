import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';
import styles from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { className, isOpen, onClose } = props;

  return (
    <Modal className={classNames(styles.loginModal, {}, [className])} isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<Loader />}>
        <LoginFormLazy onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
