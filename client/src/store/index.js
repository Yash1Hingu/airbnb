import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user';
import uiReducer from './ui';

const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
    }
})

export default store;