import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/api";
import memberSlice from "../features/member/memberSlice";
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        member:memberSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
