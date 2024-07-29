import { ButtonHTMLAttributes, memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ButtonVariant {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_CONTENT = 'backgroundContent',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
  const { className, variant = ButtonVariant.OUTLINE, children, square, size = ButtonSize.M, ...otherProps } = props;
  const mods: Mods = {
    [styles[variant]]: true,
    [styles.square]: square,
    [styles[size]]: true,
  };

  return (
    <button type="button" className={classNames(styles.button, mods, [className])} {...otherProps}>
      {children}
    </button>
  );
});
