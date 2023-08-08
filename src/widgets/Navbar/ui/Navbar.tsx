import styles from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <div className={styles.links}>
        <AppLink
          to={'/'}
          color="inverted"
        >
          Main
        </AppLink>
        <AppLink
          to={'/about'}
          color="inverted"
        >
          About
        </AppLink>
      </div>
    </div>
  );
};
