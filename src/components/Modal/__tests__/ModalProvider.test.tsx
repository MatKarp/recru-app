import React, {useEffect} from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {ModalProvider} from '../ModalProvider';
import {Modal} from '../Modal';
import {useModalContext} from '../ModalContext';

const TestComponent = () => {
    const modalContext = useModalContext();

    const showTestModal = () => {
        modalContext.showModal({
            id: 'test-modal',
            component: Modal,
            title: 'Test Modal',
            props: {message: 'This is a test modal'},
            onClose: () => modalContext.hideModal('test-modal'),
            children: null
        });
    };

    return (
        <div>
            <button onClick={showTestModal}>Show Modal</button>
            <button onClick={() => modalContext.hideAll()}>Close All</button>
        </div>
    );
};

describe('ModalProvider', () => {
    it('initializes with empty modal queue', () => {
        render(
            <ModalProvider debug={false}>
                <div>Test</div>
            </ModalProvider>
        );

        const modalOverlay = document.querySelector('.modal-overlay');
        expect(modalOverlay).not.toHaveClass('modal-overlay--active');
    });

    it('creates and shows modal using showModal', () => {
        render(
            <ModalProvider debug={false}>
                <TestComponent/>
            </ModalProvider>
        );

        const showButton = screen.getByText('Show Modal');
        fireEvent.click(showButton);

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('This is a test modal')).toBeInTheDocument();
    });

    it('handles modals with different priorities using showModal', () => {
        const PriorityModals = () => {
            const modalContext = useModalContext();

            useEffect(() => {
                modalContext.showModal({
                    id: 'first-modal',
                    component: Modal,
                    title: 'First Modal',
                    priority: 3,
                    props: {message: 'This should appear first'},
                    onClose: () => modalContext.hideModal('first-modal'),
                    children: null
                });
                modalContext.showModal({
                    id: 'third-modal',
                    component: Modal,
                    title: 'Third Modal',
                    priority: 1,
                    props: {message: 'This should appear third'},
                    onClose: () => modalContext.hideModal('third-modal'),
                    children: null
                });

                modalContext.showModal({
                    id: 'fourth-modal',
                    component: Modal,
                    title: 'Fourth Modal',
                    props: {message: 'This should appear fourth'},
                    onClose: () => modalContext.hideModal('fourth-modal'),
                    children: null
                });

                modalContext.showModal({
                    id: 'second-modal',
                    component: Modal,
                    title: 'Second Modal',
                    priority: 2,
                    props: {message: 'This should appear second'},
                    onClose: () => modalContext.hideModal('second-modal'),
                    children: null
                });
            }, []);

            return null;
        };

        render(
            <ModalProvider debug={false}>
                <PriorityModals/>
            </ModalProvider>
        );

        let modals = document.getElementsByClassName('modal-content');
        expect(screen.getByText('First Modal')).toBeInTheDocument();
        expect(modals.length).toEqual(1);

        fireEvent.click(screen.getByText('Close'));
        expect(screen.getByText('Second Modal')).toBeInTheDocument();
        modals = document.getElementsByClassName('modal-content');
        expect(modals.length).toEqual(1);

        fireEvent.click(screen.getByText('Close'));
        expect(screen.getByText('Third Modal')).toBeInTheDocument();
        modals = document.getElementsByClassName('modal-content');
        expect(modals.length).toEqual(1);

        fireEvent.click(screen.getByText('Close'));
        expect(screen.getByText('Fourth Modal')).toBeInTheDocument();

        modals = document.getElementsByClassName('modal-content');
        fireEvent.click(screen.getByText('Close'));
        expect(modals.length).toEqual(0);
    });
});