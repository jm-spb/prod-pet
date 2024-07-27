import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
  data: undefined,
  error: undefined,
  isLoading: false,
  readonly: true,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
