import { createContext, useContext } from "react";

export const RootStoreContext = createContext();

export const useStore = () => {
    const context = useContext(RootStoreContext);
    if (!context) {
        throw new Error("You have forgotten to add RootStoreContext value");
    }
    return context;
};
