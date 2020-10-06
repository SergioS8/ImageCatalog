import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer, NavHeader } from './';

interface IProps {
    children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {

    return (
        <>
            <NavHeader />
            <Container>
                {children}
            </Container>
            <Footer />
        </>
    );
};

export { Layout };
