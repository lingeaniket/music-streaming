import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        currentSong: 0,
        songIndex: 0,
        songQueue: [],
        isAutoPlay: true,
        autoPlaylistIndex: -1,
        autoPlaylist: [],
    },
    reducers: {
        playNewSong: (state, action) => {
            state.currentSong = action.payload.song;
            state.songIndex = 0;
            state.autoPlaylistIndex = -1;
        },
        addSongToQueue: (state, action) => {
            state.songQueue.push(action.payload.song);
        },
        playAlbum: (state, action) => {
            state.currentSong = action.payload.song;
            state.songIndex = 0;
            state.autoPlaylistIndex = -1;
            state.songQueue = action.payload.playlist;
        },

        playNextSong: (state, action) => {
            if (state.songQueue.length !== state.songIndex + 1) {
                state.currentSong = state.songQueue[state.songIndex + 1];
                state.songIndex += 1;
            } else if (state.songQueue.length === state.songIndex + 1 && state.isAutoPlay) {
                state.autoPlaylistIndex += 1;
                state.currentSong = state.autoPlaylist[state.autoPlaylistIndex];
            }
        },
        playPrevSong: (state, action) => {
            if (state.isAutoPlay && state.autoPlaylistIndex - 1 > -1 && state.songIndex + 1 === state.songQueue.length) {
                state.currentSong = state.autoPlaylist[state.autoPlaylistIndex - 1];
                state.autoPlaylistIndex -= 1;
            } else {
                if (state.songIndex - 1 > -1) {
                    state.currentSong = state.songQueue[state.songIndex - 1];
                    state.songIndex -= 1;
                }
            }
        },

        removeSongFromQueue: (state, action) => {
            state.songQueue.splice(action.payload.index, 1);
        },

        addAutoPlay: (state, action) => {
            state.autoPlaylist = [];
            const obj = action.payload;
            for (let key in obj) {
                if (key !== "stationid") {
                    state.autoPlaylist.push(obj[key].song.id);
                }
            }
        },
    },
});

export const { playNewSong, addSongToQueue, playAlbum, playNextSong, playPrevSong, removeSongFromQueue, addAutoPlay } = playerSlice.actions;

export default playerSlice.reducer;
