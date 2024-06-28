import axios from 'axios';
import { userActions } from 'entities/User';
import { testAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
  test('login success', async () => {
    const userValue = { username: '123', id: 1 };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const { callThunk, dispatch } = testAsyncThunk(loginByUsername);
    const result = await callThunk({ username: '123', password: '123' });

    expect(dispatch).toBeCalledWith(userActions.setUserAuthData(userValue));
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('login error', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const { callThunk, dispatch } = testAsyncThunk(loginByUsername);
    const result = await callThunk({ username: '123', password: '123' });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
