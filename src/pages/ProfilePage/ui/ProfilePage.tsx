import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducersList } from 'app/providers/StoreProvider';
import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => {
  const { t } = useTranslation('profilePage');
  const dispatch = useAppDispatch();
  useDynamicModuleLoader(reducers);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div>
      <Text title={t('profile-page-title')} />
      <ProfileCard />
    </div>
  );
});

export default ProfilePage;
