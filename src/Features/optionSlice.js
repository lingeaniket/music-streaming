import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
    name: "option",
    initialState: {
        optionsOpened: false,
        optionData: {},
    },
    reducers: {
        setOptions: (state, action) => {
            // { open: true, data: song, playlist: myPlaylist, currentEvent: event }
            const { data, open, playlist, currentEvent } = action.payload;
            state.optionsOpened = open;
            state.optionData = { data, playlist, currentEvent };
        },
    },
});

export const { setOptions } = optionSlice.actions;

export default optionSlice.reducer;
