import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@components/Modal/ModalContext.tsx";
import { ModalConfig } from "./types";
import { Button } from "@ui";
import './Modal.css';

export const Modal = (modal: ModalConfig) => {
    const modalContext = useContext(ModalContext);
    const [isEntering, setIsEntering] = useState(true);

    useEffect(() => {
        setIsEntering(true);
        const timer = setTimeout(() => setIsEntering(false), 300);
        return () => clearTimeout(timer);
    }, []);

    if (!modalContext) {
        throw new Error("Modal component must be used within a ModalProvider");
    }

    const getAnimationClass = () => {
        const animation = modal.animation || 'fade';
        return `modal-${animation}-${isEntering ? 'enter' : 'enter-active'}`;
    };

    const openModal = (priority?: number, animation: 'fade' | 'slide' | 'scale' = 'fade') => {
        const modalId = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        modalContext.showModal({
            id: modalId,
            component: Modal,
            animation,
            priority,
            props: { message: `Hello, this is a modal with priority ${priority ?? 'none'}!` },
            onClose: () => modalContext.hideModal(modalId),
            children: null
        });
    };

    return (
        <div className={`modal-content ${getAnimationClass()}`}>
            {modal.priority}
            {modal.props?.message && <p>{modal.props.message}</p>}
            {modal.children}
            <Button onClick={() => openModal(undefined, 'fade')}>Show Fade Modal (No Prioroty)</Button>
          
            <Button onClick={() => openModal(2, 'slide')}>Show Slide Modal (1 Priority)</Button>
            <Button onClick={() => openModal(3, 'scale')}>Show Scale Modal (2 Priority)</Button>
            <Button onClick={() => modalContext.hideModal(modal.id)}>Close</Button>
        </div>
    );
};
