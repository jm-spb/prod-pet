import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, VariantButton } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = (props) => {
  const { className } = props;

  const { t, i18n } = useTranslation();
  const toggle = async () => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');

  return (
    <Button
      data-testid="lang-switcher"
      className={classNames('', {}, [className])}
      variant={VariantButton.CLEAR}
      onClick={toggle}
    >
      {t('lang')}
    </Button>
  );
};
