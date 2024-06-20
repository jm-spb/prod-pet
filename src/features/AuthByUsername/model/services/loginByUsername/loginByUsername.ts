import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';

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

      thunkAPI.dispatch(userActions.setUserAuthData(response.data));
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);
