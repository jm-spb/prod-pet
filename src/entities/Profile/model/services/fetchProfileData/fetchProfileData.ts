import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';
import { profileActions } from '../../slice/profileSlice';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Profile>('/profile');
      if (!response.data) {
        throw new Error();
      }

      dispatch(profileActions.setProfileData(response.data));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
