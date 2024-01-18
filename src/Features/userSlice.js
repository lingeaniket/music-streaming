import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
        liked: localStorage.getItem("liked")
            ? JSON.parse(localStorage.getItem("liked"))
            : { songs: [], playlists: [], albums: [], artists: [] },
        history: localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [],
    },
    reducers: {
        addLiked: (state, action) => {
            const { id, type } = action.payload;
            if (state.liked[`${type}s`].findIndex((song) => song === id) === -1) {
                state.liked[`${type}s`].unshift(id);
            }
            localStorage.setItem("liked", JSON.stringify(state.liked));
        },
        removeLiked: (state, action) => {
            const { id, type } = action.payload;
            let idx = -1;
            if (
                state.liked[`${type}s`].findIndex((song, ind) => {
                    if (song === id) {
                        idx = ind;
                    }
                    return song === id;
                }) > -1
            ) {
                state.liked[`${type}s`].splice(idx, 1);
            }
            localStorage.setItem("liked", JSON.stringify(state.liked));
        },
        updateHistory: (state, action) => {
            // const { mode, id } = action.payload;
        },
    },
});

export const { addLiked, removeLiked } = userSlice.actions;

export default userSlice.reducer;
