import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import IconDark from 'shared/assets/icons/theme-dark.svg';
import IconLight from 'shared/assets/icons/theme-light.svg';
import { Button, VariantButton } from 'shared/ui/Button/Button';
import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
  const { className } = props;

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeSwitcher}>
      <IconLight className={styles.icon} />
      <Button
        data-testid="theme-switcher"
        variant={VariantButton.CLEAR}
        className={classNames(styles.button, { [styles.dark]: theme === Theme.DARK }, [className])}
        onClick={toggleTheme}
      />
      <IconDark className={styles.icon} />
    </div>
  );
};
