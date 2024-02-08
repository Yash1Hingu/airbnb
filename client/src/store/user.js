import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { userDoc: null},
    reducers: {
        setUserDoc(state,action){
            state.userDoc = action.payload;
        },
    }
})

export const userAction = userSlice.actions;

export default userSlice.reducer;