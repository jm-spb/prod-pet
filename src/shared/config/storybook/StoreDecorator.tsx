import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
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
  (state: DeepPartial<StateSchema>, asyncReducers: DeepPartial<ReducersMapObject<StateSchema>>) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
      </StoreProvider>
    );
