import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>;

/**
 * @param actionCreator The async action creator function to be tested.
 */
export const testAsyncThunk = <Return, Arg, RejectedValue>(
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>
) => {
  const dispatch: jest.MockedFn<any> = jest.fn();
  const getState: () => StateSchema = jest.fn();

  /**
   * Calls the async thunk action with the provided argument.
   * @param arg The argument to be passed to the async action creator.
   * @returns A promise that resolves with the result of the async action.
   */
  const callThunk = async (arg: Arg) => {
    const action = actionCreator(arg);
    const result = await action(dispatch, getState, undefined);
    return result;
  };

  return {
    dispatch,
    getState,
    actionCreator,
    callThunk,
  };
};
