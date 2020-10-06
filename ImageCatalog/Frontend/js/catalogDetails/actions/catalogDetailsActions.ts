import {
    catalogDetailsFetching, catalogDetailsFetched,
    catalogDetailsFetchingError
} from '../reducers/catalog-details-reducer';
import { CATALOG_URL } from "App";

export const getCatalogDetails = (catalogId: number) => {
    return (dispatch) => {
        dispatch(catalogDetailsFetching());
        fetch(`${CATALOG_URL}/${catalogId}`)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(data => dispatch(catalogDetailsFetched(data)));
                } else {
                    response.json().then((error) => {
                        const msg = error.message ? error.message : Object.entries(error.errors).map(x => JSON.stringify(x)).join(", ");
                        dispatch(catalogDetailsFetchingError(msg));
                    });
                }
            });
    };
};