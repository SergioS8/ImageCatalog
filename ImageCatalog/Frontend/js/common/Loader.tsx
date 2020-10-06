import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: React.FC = () => (
    <div className="content-center">
        <Spinner animation="border" variant="success" />
    </div>
);

export { Loader };