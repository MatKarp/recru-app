import { ReactNode, useCallback, useState } from "react";
import { ModalConfig, ModalQueueItem } from "@components/Modal/types.ts";
import { ModalContext } from "@components/Modal/ModalContext.tsx";


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
       
            <div 
                // className="modal-overlay"
                style={{
                    background: modalQueue.length > 0 ? 'rgba(24, 3, 3, 0.32)' : 'transparent',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: modalQueue.length > 0 ? 'auto' : 'none',
                    transition: 'background 0.15s ease-in-out',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
          
                }}
            >
                {modalQueue.map((modal) => {
                    const ModalComponent = modal.config.component;
                    return (
                        <ModalComponent key={modal.id} {...modal.config} />
                    );
                })}
            </div>


    </ModalContext.Provider>
}


