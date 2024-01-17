import { createSlice } from "@reduxjs/toolkit";

export const playListSlice = createSlice({
    name: "playList",
    initialState: {
        myPlaylists: localStorage.getItem("my-playlists") ? JSON.parse(localStorage.getItem("my-playlists")) : [],
        playlistOpen: false,
        currentData: "",
        addPlaylistOpen: false,
    },
    reducers: {
        addNewPlayList: (state, action) => {
            state.myPlaylists.unshift(action.payload);
            localStorage.setItem("my-playlists", JSON.stringify(state.myPlaylists));
        },
        addSongsToPlaylist: (state, action) => {
            const songData = action.payload.songs;
            const id = action.payload.id;
            let spliceidx = -1;

            const data = localStorage.getItem("my-playlists") ? JSON.parse(localStorage.getItem("my-playlists")) : [];
            // console.log(data);
            const prevSongs = data.filter((playlist, idx) => {
                if (playlist.id === id) {
                    spliceidx = idx;
                }
                return playlist.id === id;
            })[0];
            console.log(prevSongs);
            if (prevSongs) {
                for (let i = 0; i < songData.length; i++) {
                    const newidx = prevSongs.songs.indexOf(songData[i]);
                    if (newidx > -1) {
                        prevSongs.songs.splice(newidx, 1);
                    }
                    prevSongs.songs.push(songData[i].id);
                }
                state.myPlaylists.splice(spliceidx, 1);
                state.myPlaylists.unshift(prevSongs);
                localStorage.setItem("my-playlists", JSON.stringify(state.myPlaylists));
            }
        },
        updateCurrentdata: (state, action) => {
            state.currentData = action.payload;
        },

        updatePlaylistDnD: (state, action) => {
            const { id, songs } = action.payload;
            const reqPlaylist = state.myPlaylists.findIndex((playlist) => playlist.id === id);
            if (reqPlaylist > -1) {
                const add = state.myPlaylists.splice(reqPlaylist, 1);

                add.songs = songs;

                state.myPlaylists.splice(reqPlaylist, 0, add);

                localStorage.setItem("my-playlists", JSON.stringify(state.myPlaylists));
            }
        },
        openPlaylist: (state, action) => {
            state.playlistOpen = action.payload;
        },

        openAddPlaylist: (state, action) => {
            state.addPlaylistOpen = action.payload;
        },
    },
});

export const { openAddPlaylist, openPlaylist, addNewPlayList, addSongsToPlaylist, updateCurrentdata, updatePlaylistDnD } =
    playListSlice.actions;

export default playListSlice.reducer;
