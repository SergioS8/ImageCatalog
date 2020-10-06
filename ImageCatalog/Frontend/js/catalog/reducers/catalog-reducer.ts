import { createSlice } from '@reduxjs/toolkit';
import { ICatalog, FetchState, IFetchResponse } from 'api/types';

const initialState: IFetchResponse<ICatalog[]> = {
    data: null,
    fetchState: null,
    error: ''
};

const catalogInfoSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        catalogFetching: (state) => {
            state.fetchState = FetchState.Requesting;
        },
        catalogFetched: (state, action) => {
            state.data = action.payload;
            state.fetchState = FetchState.Success;
        },
        catalogFetchingError: (state, action) => {
            state.fetchState = FetchState.Failed;
            state.error = action.payload.error;
        }
    }
});

const { actions, reducer } = catalogInfoSlice;

export const {
    catalogFetching, catalogFetched,
    catalogFetchingError
} = actions;

export default reducer;

