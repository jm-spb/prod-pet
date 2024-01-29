import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
  collapsed: boolean;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = (props) => {
  const { className, collapsed } = props;

  const { t, i18n } = useTranslation();
  const toggle = async () => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');

  return (
    <Button
      data-testid="lang-switcher"
      className={classNames('', {}, [className])}
      variant={ButtonVariant.CLEAR}
      onClick={toggle}
    >
      {t(collapsed ? 'lang-short' : 'lang-full')}
    </Button>
  );
};
