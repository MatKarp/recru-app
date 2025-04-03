import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@components/Modal/ModalContext.tsx";
import { ModalConfig } from "./types";
import { Button } from "@ui";
import './Modal.css';

export const StyledModal = (modal: ModalConfig) => {
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

    return (
        <div className={`modal-content styled-modal ${getAnimationClass()}`}>
            <h2>{modal.title || 'Styled Modal'}</h2>
            {modal.priority}
            {modal.props?.message && <p>{modal.props.message}</p>}
            {modal.children}
            <div className="styled-modal-footer">
                <Button onClick={() => modalContext.hideModal(modal.id)}>Close</Button>
            </div>
        </div>
    );
}; 