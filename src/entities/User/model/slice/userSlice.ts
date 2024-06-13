import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/const/localStorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    // check if user is logged in
    initAuthData: (state) => {
      // TODO: access to localStorage in reducer is antipattern, remove it
      const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
    },
    logoutUser: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
