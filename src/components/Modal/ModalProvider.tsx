import { createContext, ReactNode, useCallback, useState } from "react";
import { ModalConfig, ModalContextType, ModalQueueItem } from "@components/Modal/types.ts";
import { ModalContext } from "@components/Modal/ModalContext.tsx";
import { Modal } from "@components/Modal/Modal.tsx";


export const ModalProvider = ({ children }: { children: ReactNode }) => {

    const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);


    const showModal = useCallback((modal: ModalConfig) => {
        setModalQueue((prevQueue) => [
            ...prevQueue,
            { id: modal.id, config: modal, status: "pending" },
        ]);
    }, []);

    const hideModal = useCallback((id: string) => {
        setModalQueue((prev) => prev.filter((modal) => modal.id !== id));
    }, []);

    const hideAll = useCallback(() => {
        setModalQueue([]);
    }, []);

    return <ModalContext.Provider value={{ showModal, hideModal, hideAll }}>
        {children}
        {modalQueue.map((modal) => {
            const ModalComponent = modal.config.component;
            return (
                <ModalComponent key={modal.id} {...modal.config} />
            );
        })}

    </ModalContext.Provider>
}


