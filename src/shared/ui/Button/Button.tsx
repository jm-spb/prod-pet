import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export enum ButtonVariant {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
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
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, variant, children, square, size = ButtonSize.M, ...otherProps } = props;
  const mods: Record<string, boolean> = {
    [styles[variant]]: true,
    [styles.square]: square,
    [styles[size]]: true,
  };

  return (
    <button type="button" className={classNames(styles.button, mods, [className])} {...otherProps}>
      {children}
    </button>
  );
};
