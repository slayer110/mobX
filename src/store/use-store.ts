// external
import { createContext, useContext } from 'react';

// internal
import { RootStore } from 'store/rootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = (): RootStore => {
    const context = useContext(RootStoreContext);

    if (!context) {
        throw new Error('You have forgotten to add RootStoreContext value');
    }

    return context;
};
