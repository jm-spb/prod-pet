import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkColor } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/items';
import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation('translation');

  return (
    <AppLink
      to={item.path}
      className={classNames(styles.link, { [styles.collapsed]: collapsed }, [])}
      color={AppLinkColor.INVERTED}>
      <item.Icon className={styles.linkIcon} />
      <span className={styles.linkText}>{t(item.text)}</span>
    </AppLink>
  );
});
