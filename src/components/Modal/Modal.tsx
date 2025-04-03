import { useContext } from "react";
import { ModalContext } from "@components/Modal/ModalContext.tsx";
import { ModalConfig } from "./types";

export const Modal = (modal: ModalConfig) => {

    console.log('props', modal)
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error("Modal component must be used within a ModalProvider");
    }



    return (
        <div style={{ background: 'red', top: 0 }}>
          
           {modal?.props?.message}
            <button onClick={() => modalContext.hideModal(modal.id)}>Close</button>
        </div>
    );
};
