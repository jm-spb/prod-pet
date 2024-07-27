import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('profilePage');
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(styles.profileCard, {}, [className])}>
      <div className={styles.header}>
        <Text title={t('profile')} />
        <Button variant={ButtonVariant.OUTLINE}>{t('edit')}</Button>
      </div>
      <div className={styles.data}>
        <div className={styles.item}>
          <Text text={t('username')} />
          <Text text={data?.username} />
        </div>
        <div className={styles.item}>
          <Text text={t('firstName')} />
          <Text text={data?.firstName} />
        </div>
        <div className={styles.item}>
          <Text text={t('lastName')} />
          <Text text={data?.lastName} />
        </div>
      </div>
    </div>
  );
};
