import * as React from 'react';
import { Link } from "react-router-dom";

interface IProps {
    name: string | number;
    children: string | React.ReactNode;
}

export const CatalogDetailsLink: React.FC<IProps> = ({ name, children }) => {
    return (
        <Link to={`/${name}`} >
            {children}
        </Link>);
};