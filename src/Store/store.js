import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSlice from "../Features/musicPlayerSlice";

export default configureStore({
    reducer: {
        player: musicPlayerSlice,
    },
});
