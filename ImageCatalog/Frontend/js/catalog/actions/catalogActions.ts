import {
    catalogFetching, catalogFetched,
    catalogFetchingError
} from '../reducers/catalog-reducer';
import { CATALOG_URL } from "App";

export const getAllCatalogs = () => {
    return (dispatch) => {
        dispatch(catalogFetching());
        fetch(CATALOG_URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch(catalogFetched(data));
            })
            .catch(err => {
                dispatch(catalogFetchingError(err));
            });
    };
};