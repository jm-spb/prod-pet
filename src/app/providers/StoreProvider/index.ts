import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/reduxStore';
import {
  StateSchema,
  StateSchemaKeys,
  ReduxStoreWithReducerManager,
  ReducersList,
  ThunkExtraArgs,
  ThunkConfig,
} from './config/reduxStoreTypes';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  StateSchemaKeys,
  ReduxStoreWithReducerManager,
  ReducersList,
  AppDispatch,
  ThunkExtraArgs,
  ThunkConfig,
};
