import {createContext, useContext} from "react";
import {ModalContextType} from "@components/Modal/types.ts";

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error(
            "useModalContext must be used within a ModalProvider"
        );
    }

    return context;
};
