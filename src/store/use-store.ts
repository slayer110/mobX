import { createContext, useContext } from 'react';

// @ts-ignore
export const RootStoreContext: any = createContext();

export const useStore = (): any => {
    const context = useContext(RootStoreContext);

    if (!context) {
        throw new Error('You have forgotten to add RootStoreContext value');
    }

    return context;
};
