import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

// createReduxStore - for reconfigure store in tests and storybook
export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: { counter: counterReducer },
    devTools: __IS_DEV__,

    // for tests
    preloadedState: initialState,
  });
}
