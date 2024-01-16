import React from "react";
import { useSelector } from "react-redux";
import PlaylistItem from "./PlaylistItem";
import "./myPlaylist.css"

const MyPlaylist = () => {
    const playlists = useSelector((state) => state.playlist.myPlaylists);
    return (
        <div
            style={{
                margin: "22px 0",
            }}
        >
            {playlists.map((playlist) => (
                <PlaylistItem playlist={playlist} />
            ))}
        </div>
    );
};

export default MyPlaylist;
