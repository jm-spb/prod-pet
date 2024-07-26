import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './AppLink.module.scss';

export enum AppLinkColor {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  color?: AppLinkColor;
  children?: React.ReactNode;
}

export const AppLink: React.FC<AppLinkProps> = memo((props) => {
  const { to, children, className, color = 'primary', ...otherProps } = props;

  return (
    <Link to={to} className={classNames(styles.appLink, {}, [className, styles[color]])} {...otherProps}>
      {children}
    </Link>
  );
});
