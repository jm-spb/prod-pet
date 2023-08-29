import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export enum VariantButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: VariantButton;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, variant, children, ...otherProps } = props;

  return (
    <button
      type="button"
      className={classNames(styles.button, {}, [className, styles[variant]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
