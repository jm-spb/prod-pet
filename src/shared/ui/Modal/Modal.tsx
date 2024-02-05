import { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, isOpen, onClose } = props;
  //   const { theme } = useTheme();
  const mods: Record<string, boolean> = {
    [styles.opened]: isOpen,
    // [styles[theme]]: true,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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

  return (
    <Portal element={document.getElementById('root') ?? document.body}>
      <div className={classNames(styles.modal, mods, [className])}>
        <div className={styles.overlay} onClick={closeHandler}>
          <div className={styles.content} onClick={onContentClick}>
            {isOpen ? children : null}
          </div>
        </div>
      </div>
    </Portal>
  );
};
