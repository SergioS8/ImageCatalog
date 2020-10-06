import { FetchState } from "./FetchState";

interface IFetchResponse<T> {
    data: T;
    fetchState: FetchState;
    error: string;
}

export { IFetchResponse };