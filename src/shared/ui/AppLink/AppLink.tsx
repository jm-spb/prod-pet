import { classNames } from 'shared/lib/classNames/classNames';
import styles from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

type Color = 'primary' | 'inverted';

interface AppLinkProps extends LinkProps {
  className?: string;
  color?: Color;
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
  const { to, children, className, color = 'primary', ...otherProps } = props;

  return (
    <Link
      to={to}
      className={classNames(styles.appLink, {}, [className, styles[color]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

/*
type Color = 'primary' | 'secondary'
interface AppLinkProps extends LinkProps {
className?: string
color?: Color
}
*/
