import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import memberSlice from "../features/member/memberSlice";
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        properties: propertiesSlice,
        filter: filterSlice,
        agent: agentSlice,
        member:memberSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
