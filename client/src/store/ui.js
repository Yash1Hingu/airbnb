import { createSlice } from '@reduxjs/toolkit';

const uiSlices = createSlice({
    name: 'ui',
    initialState: { isReady: false ,isMobile: (Number(window.innerWidth) <= 768)},
    reducers: {
        setIsReady(state) {
            state.isReady = true;
        }
    }
})

export const uiActions = uiSlices.actions;
export default uiSlices.reducer;