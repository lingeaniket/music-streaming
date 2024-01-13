import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSlice from "../Features/musicPlayerSlice";
import userSlice from "../Features/userSlice";

export default configureStore({
    reducer: {
        player: musicPlayerSlice,
        user: userSlice,
    },
});
