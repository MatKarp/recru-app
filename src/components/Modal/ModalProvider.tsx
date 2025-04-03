import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ModalConfig, ModalQueueItem } from "@components/Modal/types.ts";
import { ModalContext } from "@components/Modal/ModalContext.tsx";
import './Modal.css'

export const ModalProvider = ({ children, debug = false }: { children: ReactNode, debug: boolean }) => {

    const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);


    useEffect(() => {
        if (modalQueue.length > 0 && !modalQueue.some(modal => modal.status === "visible")) {
            setModalQueue(prevQueue => {
                const newQueue = [...prevQueue];
                const firstPendingIndex = newQueue.findIndex(modal => modal.status === "pending");
                if (firstPendingIndex !== -1) {
                    newQueue[firstPendingIndex] = {
                        ...newQueue[firstPendingIndex],
                        status: "visible"
                    };
                }
                return newQueue;
            });
        }
    }, [modalQueue]);

    const { pendingModals, visibleModals }: { pendingModals: ModalQueueItem[]; visibleModals: ModalQueueItem[] } = useMemo(() => {
        const pending: ModalQueueItem[] = modalQueue.filter(modal => modal.status === "pending");
        const visible: ModalQueueItem[] = modalQueue.filter(modal => modal.status === "visible");

        return {
            pendingModals: pending,
            visibleModals: visible
        };
    }, [modalQueue]);

    console.log('aaa', modalQueue)

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

        <div className={`modal-overlay ${modalQueue.length > 0 ? 'modal-overlay--active' : 'modal-overlay--inactive'}`}>
          
            {debug && <div className="modal-debug">
                <p>This is debug panel. To trun it off just remove debug prop from ModalProvider</p>
                {pendingModals.map((modal) => (
                    <div key={modal.id}>
                        {modal.id} pending...
                    </div>
                ))}
            </div>}
            {visibleModals?.map((modal: ModalQueueItem) => {
                const ModalComponent = modal.config.component;
                return (
                    <ModalComponent key={modal.id} {...modal.config} />
                );
            })}
        </div>


    </ModalContext.Provider>
}


