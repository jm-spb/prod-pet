import { Action, Dispatch, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import { loginByUsername } from 'features/AuthByUsername';
import { LOCAL_STORAGE_USER_KEY } from 'shared/const/localStorage';
import { StateSchema } from '../config/reduxStoreTypes';

interface Store {
  dispatch: Dispatch;
  getState: () => StateSchema;
}

export const authMiddleware =
  (store: Store) =>
  (next: (action: Action) => void) =>
  (action: Action): void => {
    const isAuth = isAnyOf(userActions.loadUserFromLocalStorage);
    const isLoggedIn = isFulfilled(loginByUsername);
    const isLoggedOut = isAnyOf(userActions.logoutUser);

    // trigger on initial render in App component
    if (isAuth(action)) {
      const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

      if (user) {
        store.dispatch(userActions.setUserAuthData(JSON.parse(user)));
      }
    }

    // trigger every time when user is logged in via Login Form
    if (isLoggedIn(action)) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(action.payload));
    }

    if (isLoggedOut(action)) {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }

    next(action);
  };
