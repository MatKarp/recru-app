import {render} from '@testing-library/react';

import {AuthProvider} from '@components/Auth/AuthContext';
import {HomePage} from './HomePage';
import {ModalProvider} from "@components/Modal/ModalProvider.tsx";

describe('HomePage component', () => {
    it('should display HomePage component ;)', () => {
        const {debug} = render(
            <AuthProvider>
                <ModalProvider>
                    <HomePage/>
                </ModalProvider>
            </AuthProvider>,
        );
        debug();
    });
});
