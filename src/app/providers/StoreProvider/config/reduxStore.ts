import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { StateSchema } from './reduxStoreTypes';
import { authMiddleware } from '../middleware/authMiddleware';
import { createReducerManager } from './reducerManager';

// createReduxStore - for reconfigure store in tests and storybook
export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const reduxStore = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,

    // preloadedState - for tests
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            navigate,
          },
        },
      }).concat(authMiddleware),
  });

  // @ts-ignore
  reduxStore.reducerManager = reducerManager;

  return reduxStore;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
