import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        currentSong: {
            downloadUrl: "",
        },
        nextPlaylist: [],
    },
    reducers: {
        playNewSong: (state, action) => {
            state.currentSong = action.payload.song;
        },
        addSongToQueue: (state, action) => {
            state.nextPlaylist.push(action.payload.song);
        },
        playAlbum: (state, action) => {
            state.currentSong = action.payload.song;
            state.nextPlaylist = action.payload.playlist;
        },
    },
});

export const { playNewSong, addSongToQueue, playAlbum } = playerSlice.actions;

export default playerSlice.reducer;
