import { useAuthContext } from '@components/Auth/AuthContext';
import { Button, Header, Text } from '@ui';
import {useModalContext} from "@components/Modal/ModalContext.tsx";
import {Modal} from "@components/Modal/Modal.tsx";

export const HomePage = () => {
  const context = useAuthContext();
  const modalContext = useModalContext();

  const openModal = () => {
    const modalId = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    modalContext.showModal({
      id: modalId,
      component: Modal,
      props: { message: "Hello, this is a modal!" },
      onClose: () => modalContext.hideModal(modalId),
      children: null
    });
  };

  return (
    <div>
      <Header>Hello from home</Header>
      <Button onClick={openModal}>Show Modal</Button>
      <Text>Is logged in: {context.isLoggedIn ? 'YES' : 'NO'}</Text>
      <Button onClick={() => context.toggle()}>Toggle</Button>
    </div>
  );
};
