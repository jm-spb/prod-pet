import { DeepPartial } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';
import { counterActions, counterReducer } from './counterSlice';

describe('counterSlice', () => {
  test('incremented', () => {
    const state: DeepPartial<CounterSchema> = { value: 10 };
    expect(counterReducer(state as CounterSchema, counterActions.incremented())).toEqual({ value: 11 });
  });
  test('decremented', () => {
    const state: DeepPartial<CounterSchema> = { value: 10 };
    expect(counterReducer(state as CounterSchema, counterActions.decremented())).toEqual({ value: 9 });
  });
  test('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.incremented())).toEqual({ value: 1 });
  });
});
