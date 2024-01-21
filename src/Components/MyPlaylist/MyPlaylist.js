import React from "react";
import { useSelector } from "react-redux";
import PlaylistItem from "./PlaylistItem";
import "./myPlaylist.css";

const MyPlaylist = () => {
    const playlists = useSelector((state) => state.playlist.myPlaylists);
    return (
        <div className="mplay04">
            {playlists.map((playlist) => (
                <PlaylistItem key={playlist.id} playlist={playlist} />
            ))}
        </div>
    );
};

export default MyPlaylist;
