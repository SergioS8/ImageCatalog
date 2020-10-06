import { createSlice } from '@reduxjs/toolkit';
import { ICatalog, FetchState, IFetchResponse } from 'api/types';

const initialState: IFetchResponse<ICatalog> = {
    data: null,
    fetchState: null,
    error: ''
};

const catalogDetailsSlice = createSlice({
    name: 'catalog-details',
    initialState,
    reducers: {
        catalogDetailsFetching: (state) => {
            state.fetchState = FetchState.Requesting;
        },
        catalogDetailsFetched: (state, action) => {
            state.data = action.payload;
            state.fetchState = FetchState.Success;
        },
        catalogDetailsFetchingError: (state, action) => {
            state.fetchState = FetchState.Failed;
            state.error = action.payload.error;
        }
    }
});

const { actions, reducer } = catalogDetailsSlice;

export const {
    catalogDetailsFetching, catalogDetailsFetched,
    catalogDetailsFetchingError
} = actions;

export default reducer;

