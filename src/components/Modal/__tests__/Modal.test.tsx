import { render, screen, fireEvent, act } from '@testing-library/react';
import { ModalProvider } from '../ModalProvider';
import { Modal } from '../Modal';
import { useModalContext } from '../ModalContext';
const TestComponent = () => {
    const modalContext = useModalContext();
    
    return (
        <div>
            <button onClick={() => modalContext.showModal({
                id: 'test-modal',
                component: Modal,
                props: { message: 'Test Modal' },
                onClose: () => modalContext.hideModal('test-modal'),
                children: null
            })}>
                Open Modal
            </button>
        </div>
    );
};

describe('Modal System', () => {
    it('renders ModalProvider without crashing', () => {
        render(
            <ModalProvider debug={false}>
                <div>Test</div>
            </ModalProvider>
        );
    });

    it('opens and closes a modal', async () => {
        render(
            <ModalProvider debug={false}>
                <TestComponent />
            </ModalProvider>
        );
        const openButton = screen.getByText('Open Modal');
        fireEvent.click(openButton);
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('ensures modal overlay has active class when modals are present', () => {
        render(
            <ModalProvider debug={false}>
                <TestComponent />
            </ModalProvider>
        );

        const openButton = screen.getByText('Open Modal');
        fireEvent.click(openButton);

        const fadeButton = screen.getByText('Show Fade Modal (No Priority)');
        const slideButton = screen.getByText('Show Slide Modal (1 Priority)');
        const scaleButton = screen.getByText('Show Scale Modal (2 Priority)');

        fireEvent.click(fadeButton);
        fireEvent.click(slideButton);
        fireEvent.click(scaleButton);

        const modalOverlay = document.querySelector('.modal-overlay');
        expect(modalOverlay).toHaveClass('modal-overlay--active');
    });

    it('ensures only one modal is visible at a time', () => {
        render(
            <ModalProvider debug={false}>
                <TestComponent />
            </ModalProvider>
        );

        const openButton = screen.getByText('Open Modal');
        fireEvent.click(openButton);

        const fadeButton = screen.getByText('Show Fade Modal (No Priority)');
        const slideButton = screen.getByText('Show Slide Modal (1 Priority)');
        const scaleButton = screen.getByText('Show Scale Modal (2 Priority)');

        fireEvent.click(fadeButton);
        fireEvent.click(slideButton);
        fireEvent.click(scaleButton);

        const modalOverlay = document.querySelector('.modal-overlay');
        const visibleModals = modalOverlay?.querySelectorAll('.modal-content');
        expect(visibleModals).toHaveLength(1);
    });
}); 