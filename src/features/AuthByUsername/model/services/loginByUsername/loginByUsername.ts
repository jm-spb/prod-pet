import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
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
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post<User>('/login', authData);
      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setUserAuthData(response.data));
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
