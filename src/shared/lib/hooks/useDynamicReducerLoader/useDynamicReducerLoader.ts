import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReducersList, ReduxStoreWithReducerManager, StateSchemaKeys } from 'app/providers/StoreProvider';

type ReducerEntry = [StateSchemaKeys, Reducer];
interface DynamicModuleLoader {
  (reducers: ReducersList, removeAfterUnmount?: boolean): void;
}

export const useDynamicModuleLoader: DynamicModuleLoader = (reducers, removeAfterUnmount = true) => {
  const store = useStore() as ReduxStoreWithReducerManager;
  const dispatch = useDispatch();

  const addReducers = () => {
    Object.entries(reducers).forEach(([keyName, reducer]: ReducerEntry) => {
      // check if reducer is already been added and store been updated
      if (!store.reducerManager.has(keyName)) {
        store.reducerManager.add(keyName, reducer);
        // TODO: @INIT and @DELETE - for debug, remove them
        dispatch({ type: `@INIT ${keyName}` });
      }
    });
  };

  const removeReducers = () => {
    Object.entries(reducers).forEach(([keyName]: ReducerEntry) => {
      store.reducerManager.remove(keyName);
      dispatch({ type: `@DELETE ${keyName}` });
    });
  };

  useEffect(() => {
    addReducers();

    return () => {
      /* TODO: choose between 2 strategies:
        - remove reducers after unmount (less amount of reducers in store)
        - keep them in store (avoid downloading them again on mount)
      */
      if (removeAfterUnmount) {
        removeReducers();
      }
    };
    // eslint-disable-next-line
  }, []);
};
