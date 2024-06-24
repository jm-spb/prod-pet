import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>;

export class TestAsyncThunk<Return, Arg, RejectValue> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectValue>;

  /**
   * Creates an instance of TestAsyncThunk.
   * @param actionCreator The async action creator function to be tested.
   */
  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectValue>) {
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.actionCreator = actionCreator;
  }

  /**
   * Calls the async thunk action with the provided argument.
   * @param arg The argument to be passed to the async action creator.
   * @returns A promise that resolves with the result of the async action.
   */
  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, undefined);
    return result;
  }
}
