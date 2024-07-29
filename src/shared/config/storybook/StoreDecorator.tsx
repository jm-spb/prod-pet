import { Story } from '@storybook/react';
import { ReducersList, StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
};

/**
 * Creates a decorator function that wraps a Storybook component with a StoreProvider,
 * providing initial state and additional async reducers.
 *
 * @param state Initial state of the application or a portion of the state.
 * @param asyncReducers Async reducers to be dynamically added to the store.
 * @returns A decorator function that accepts a Storybook component and wraps it with StoreProvider.
 */
export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
      </StoreProvider>
    );
