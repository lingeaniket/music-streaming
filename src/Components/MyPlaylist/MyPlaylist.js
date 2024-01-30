import React, { memo } from "react";
import { useSelector } from "react-redux";
import PlaylistItem from "./PlaylistItem";
import "./myPlaylist.css";

const MyPlaylist = ({ handleClose }) => {
    const playlists = useSelector((state) => state.playlist.myPlaylists);
    return (
        <div className="mplay04">
            {playlists.map((playlist) => (
                <PlaylistItem handleClose={handleClose} key={playlist.id} playlist={playlist} />
            ))}
        </div>
    );
};

export default memo(MyPlaylist);
