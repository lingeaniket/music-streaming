import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSlice from "../Features/musicPlayerSlice";
import userSlice from "../Features/userSlice";
import playListSlice from "../Features/newPlaylistSlice";

export default configureStore({
    reducer: {
        player: musicPlayerSlice,
        user: userSlice,
        playlist: playListSlice,
    },
});
