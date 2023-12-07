import React from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./songList.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { playAlbum } from "../../Features/musicPlayerSlice";

const SongList = ({ song, index, type }) => {
    const dispatch = useDispatch();
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
                        <span>{song.name}</span>
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

const formatTime = (time) => {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "00:00";
};
