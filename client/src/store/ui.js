import { createSlice } from '@reduxjs/toolkit';

const uiSlices = createSlice({
    name: 'ui',
    initialState: { isReady: false },
    reducers: {
        setIsReady(state) {
            state.isReady = true;
        }
    }
})

export const uiActions = uiSlices.actions;
export default uiSlices.reducer;