import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Text.module.scss';

export enum TextVariant {
  PRIMARY = 'primary',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
}

export const Text: React.FC<TextProps> = memo((props) => {
  const { className, title, text, variant = TextVariant.PRIMARY } = props;

  return (
    <div className={classNames(styles.Text, { [styles[variant]]: true }, [className])}>
      {title && <p className={styles.title}>{title}</p>}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
});
