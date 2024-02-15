import { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, isOpen, onClose, lazy } = props;

  // Mount modal in DOM only when it has been opened
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  // Remove modal from DOM on close after animation
  const onAnimationEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  // set animation when modal is opened or closed
  const mods: Record<string, boolean> = {
    [styles.opened]: isOpen,
    [styles.closed]: !isOpen,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Close modal on escape
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', closeOnEscape);
    }

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, closeHandler]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById('root') ?? document.body}>
      <div className={classNames(styles.modal, mods, [className])} onAnimationEnd={onAnimationEnd}>
        <div className={styles.overlay} onClick={closeHandler}>
          <div className={styles.content} onClick={handleContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
