import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // using redux middleware to check auth data in Local Storage
    loadUserFromLocalStorage: () => {},
    setUserAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    logoutUser: (state) => {
      state.authData = null;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
