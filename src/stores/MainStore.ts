
import { createContext, useContext } from 'react';
import AuthStore from './AuthStore';

export interface IMainStore {
    authStore: AuthStore;
}

export const mainStore: IMainStore = Object.freeze({
    authStore : new AuthStore()
});

const StoreContext = createContext(mainStore);
export const StoreProvider = StoreContext.Provider;

export const useStores = () => {
    return useContext(StoreContext);
}

export const useStore = <T extends keyof typeof mainStore>(
    store: T
  ): typeof mainStore[T] => useContext(StoreContext)[store];


