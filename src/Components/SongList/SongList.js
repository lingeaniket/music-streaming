import he from "he";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { formatTime } from "../commonFunctions.js";
import { playAlbum } from "../../Features/musicPlayerSlice";

import "./songList.css";
import { useNavigate } from "react-router-dom";

const SongList = ({ song, index, type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSong = () => {
        const nString = he.decode(song.name).toLowerCase();
        const conTitle = nString
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        navigate(`/song/${conTitle}/${song.id}`);
    };

    const handleSongPlay = async () => {
        if (type === "album") {
            const albumSongsData = await axios.get(`https://saavn.me/albums?id=${song.album.id}`);
            const albumData = albumSongsData.data.data;
            const playerData = {
                song,
                playlist: albumData.songs,
            };

            dispatch(playAlbum(playerData));
        } else if (type === "song") {
            const playerData = {
                song,
                playlist: [],
            };

            dispatch(playAlbum(playerData));
        }
    };

    return (
        <div className="song-list-01">
            <div className="song-list-02">
                <span className="song-list-03">{index + 1}</span>
                <div className="song-list-08" onClick={handleSongPlay}>
                    <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#000000" }} />
                </div>
            </div>
            <div className="song-list-04">
                <div className="song-list-05">
                    <h4>
                        <span onClick={handleSong}>{song.name}</span>
                    </h4>
                    <div>{song.primaryArtists}</div>
                </div>
            </div>
            <div className="song-list-06">
                <FontAwesomeIcon icon={faHeart} size="lg" />
            </div>
            <div className="song-list-07">{formatTime(Number(song.duration))}</div>
        </div>
    );
};

export default SongList;
