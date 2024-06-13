import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { LOCAL_STORAGE_USER_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

// TODO: handle multiple errors
/*
  in rejectedWithValue we pass error http status, in ui: error message according to status
  enum LoginErrors {
    SERVER_ERROR: 500
    ...
  }
*/
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<User>('http://localhost:8000/login', authData);
      if (!response.data) {
        throw new Error();
      }

      // TODO: 1) refactor this auth imitation to real auth with tokens
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);
