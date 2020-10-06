import React from "react";
import { FetchState, IFetchResponse } from "api/types";
import { Loader } from "./Loader";
import { Error } from "./Error";

interface IProps {
    response: IFetchResponse<any>;
    children: React.ReactNode | React.ReactNode[];
}

export const FetchWithLoader: React.FC<IProps> = ({ children, response }) => {

    if (response.fetchState === FetchState.Failed) {
        return <Error error={response.error} />;
    }
    if (response.fetchState === FetchState.Requesting) {
        return <Loader/>;
    }

    return <>{children}</>;
};

