import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReducersList, ReduxStoreWithReducerManager, StateSchemaKeys } from 'app/providers/StoreProvider';

interface DynamicModuleLoader {
  (reducers: ReducersList, removeAfterUnmount?: boolean): void;
}

export const useDynamicModuleLoader: DynamicModuleLoader = (reducers, removeAfterUnmount = true) => {
  const store = useStore() as ReduxStoreWithReducerManager;
  const dispatch = useDispatch();

  const addReducers = () => {
    Object.entries(reducers).forEach(([keyName, reducer]) => {
      // check if reducer is already been added and store been updated
      if (!store.reducerManager.has(keyName as StateSchemaKeys)) {
        store.reducerManager.add(keyName as StateSchemaKeys, reducer);
        // TODO: @INIT and @DELETE - for debug, remove them
        dispatch({ type: `@INIT ${keyName}` });
      }
    });
  };

  const removeReducers = () => {
    Object.entries(reducers).forEach(([keyName]) => {
      store.reducerManager.remove(keyName as StateSchemaKeys);
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
