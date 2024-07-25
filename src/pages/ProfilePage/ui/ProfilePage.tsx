import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducersList } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicReducerLoader/useDynamicReducerLoader';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => {
  const { t } = useTranslation('profilePage');
  useDynamicModuleLoader(reducers);

  return <div>{t('profile')}</div>;
});

export default ProfilePage;
