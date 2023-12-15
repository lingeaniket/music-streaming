import he from "he";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { formatTime } from "../commonFunctions.js";
 // eslint-disable-next-line
import { addAutoPlay, playAlbum } from "../../Features/musicPlayerSlice";

import "./songList.css";

const SongList = ({ song, index, type, mode, queue }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSong = () => {
        const nString = he.decode(song.name ? song.name : song.title).toLowerCase();
        const conTitle = nString
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        navigate(`/song/${conTitle}/${song.id}`);
    };

    const handleSongPlay = async () => {
        if (type === "album") {
            if (mode === "moreAlbumSongs") {
                const albumSongsData = await axios.get(`https://saavn.me/albums?id=${song.album.id}`);
                const albumData = albumSongsData.data.data;
                const playerData = {
                    song: song.id,
                    playlist: [song.id, ...albumData.songs.filter((val) => val.id !== song.id).map((val) => val.id)],
                };

                // const entities = albumData.songs.map((song) => {
                //     return `%22${song.id}%22`;
                // });

                // const stationQueue = await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/autoPlay?entityId=${JSON.stringify(entities)}`);

                dispatch(playAlbum(playerData));
                // dispatch(addAutoPlay(stationQueue))
            } else {
                const playerData = {
                    song: song.id,
                    playlist: queue.map((song) => song.id),
                };
                dispatch(playAlbum(playerData));
            }
        } else if (type === "song") {
            dispatch(playAlbum({ song: song.id, playlist: [song.id] }));
        }
    };

    return (
        <div className="song-list-01">
            <div className="song-list-02">
                {mode === "search" ? (
                    <>
                        <img
                            src={song.image ? song.image[2].link : ""}
                            alt=""
                            style={{
                                width: "100%",
                                borderRadius: "4px",
                            }}
                        />
                        <div className="song-list-09" onClick={handleSongPlay}>
                            <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#ffffff" }} />
                        </div>
                    </>
                ) : (
                    <>
                        <span className="song-list-03">{index + 1}</span>
                        <div className="song-list-08" onClick={handleSongPlay}>
                            <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#000000" }} />
                        </div>
                    </>
                )}
            </div>
            <div className="song-list-04">
                <div className="song-list-05">
                    <h4>
                        <span onClick={handleSong}>{song.name ? song.name : song.title}</span>
                    </h4>
                    <div>{song.primaryArtists}</div>
                </div>
            </div>
            <div className="song-list-06">
                <FontAwesomeIcon icon={faHeart} size="lg" />
            </div>
            {mode !== "search" && <div className="song-list-07">{formatTime(Number(song.duration))}</div>}
        </div>
    );
};

export default SongList;
