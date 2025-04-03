import { useContext } from "react";
import { ModalContext } from "@components/Modal/ModalContext.tsx";
import { ModalConfig } from "./types";
import { Button } from "@ui";

export const Modal = (modal: ModalConfig) => {
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error("Modal component must be used within a ModalProvider");
    }

    const openModal = (priority?: number) => {
        const modalId = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        modalContext.showModal({
            id: modalId,
            component: Modal,
            priority,
            props: { message: `Hello, this is a modal with priority ${priority ?? 'none'}!` },
            onClose: () => modalContext.hideModal(modalId),
            children: null
        });
    };

    return (
        <div style={{ background: 'white' }}>
            {modal?.props?.message}
            <Button onClick={() => openModal()}>Show Modal (No Priority)</Button>
            <Button onClick={() => openModal(1)}>Show Modal (Priority 1)</Button>
            <Button onClick={() => openModal(2)}>Show Modal (Priority 2)</Button>
            <Button onClick={() => modalContext.hideModal(modal.id)}>Close</Button>
        </div>
    );
};
