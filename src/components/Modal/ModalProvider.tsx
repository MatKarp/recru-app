import {createContext, ReactNode, useCallback} from "react";
import {ModalConfig, ModalContextType} from "@components/Modal/types.ts";
import {ModalContext} from "@components/Modal/ModalContext.tsx";


export const ModalProvider = ({children}: { children: ReactNode }) => {

    const showModal = useCallback((modal: ModalConfig) => {

    }, []);

    const hideModal = useCallback((id: string) => {

    }, []);

    const hideAll = useCallback((id: string) => {

    }, []);


    return <ModalContext.Provider value={{showModal, hideModal, hideAll}}>
        {children}
    </ModalContext.Provider>
}


