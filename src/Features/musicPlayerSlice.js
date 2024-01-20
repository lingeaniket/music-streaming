import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        currentSong: 0,
        isPlaying: false,
        currentName: "",
        songIndex: 0,
        songQueue: [],
        isAutoPlay: true,
        autoPlaylistIndex: -1,
        autoPlaylist: [],
        queueOpened: false,
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
            state.currentName = "";
            state.currentSong = action.payload.song;
            state.songIndex = 0;
            state.autoPlaylistIndex = -1;
            if (action.payload.nameOfList) {
                state.currentName = action.payload.nameOfList;
            }
            state.songQueue = action.payload.playlist;
            state.isPlaying = true;
        },

        playNextSong: (state, action) => {
            if (state.songQueue.length !== state.songIndex + 1) {
                state.currentSong = state.songQueue[state.songIndex + 1];
                state.songIndex += 1;
            } else if (state.songQueue.length === state.songIndex + 1 && state.isAutoPlay) {
                state.autoPlaylistIndex += 1;
                state.currentSong = state.autoPlaylist[state.autoPlaylistIndex];
            } else {
                state.isPlaying = false;
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
        addSongsToQueue: (state, action) => {
            const { songs } = action.payload;
            if (songs) {
                console.log(songs);
                for (let i = 0; i < songs.length; i++) {
                    const idx = state.songQueue.indexOf(songs[i]) === -1;
                    if (idx) {
                        state.songQueue.push(songs[i]);
                    }
                }
            }

            if (state.currentSong === 0 && state.songQueue.length > 0) {
                state.currentSong = state.songQueue[0];
            }
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

        toggleQueue: (state, action) => {
            state.queueOpened = !state.queueOpened;
        },

        toggleIsPlaying: (state, action) => {
            state.isPlaying = !state.isPlaying;
        },
    },
});

export const {
    playNewSong,
    addSongToQueue,
    playAlbum,
    playNextSong,
    playPrevSong,
    addSongsToQueue,
    removeSongFromQueue,
    addAutoPlay,
    toggleQueue,
    toggleIsPlaying,
} = playerSlice.actions;

export default playerSlice.reducer;
