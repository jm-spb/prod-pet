import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/loginSlice';

export const getLoginError = (state: StateSchema): string => state.loginForm?.error || (initialState.error ?? '');
