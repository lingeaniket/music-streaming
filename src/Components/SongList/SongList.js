import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./songList.css";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { playAlbum } from "../../Features/musicPlayerSlice";
import { convertName, formatTime } from "../commonFunctions.js";
import { addLiked, removeLiked } from "../../Features/userSlice.js";

import Options from "../Options/Options.js";
import Equilizer from "../Icons/Equilizer/Equilizer.js";
import { removeSongsFromPlaylist } from "../../Features/newPlaylistSlice.js";

const SongList = ({ song, index, type, mode, queue, isDragging, myPlaylist }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const likedData = useSelector((state) => state.user.liked);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const currentSong = useSelector((state) => state.player.currentSong);

    const [liked, setLiked] = useState(false);
    const [options, setoptions] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(false);

    const handleOptions = (event) => {
        const { top, right } = event.target.parentNode.getBoundingClientRect();
        const parent = event.target.closest(".options");

        const option = parent.querySelector(".options01");

        if (top > window.innerHeight / 2) {
            option.style.bottom = "10%";
        } else {
            option.style.top = "100%";
        }

        if (right < window.innerWidth / 2) {
            option.style.left = "25%";
        } else {
            option.style.right = "10%";
        }

        setTimeout(() => {
            setoptions(true);
        }, 0);
    };

    const handleSong = () => {
        const nString = convertName(song.name ? song.name : song.title).toLowerCase();
        const conTitle = nString
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        navigate(`/song/${conTitle}/${song.id}`);
    };

    const handleLike = (event) => {
        event.stopPropagation();
        if (liked) {
            dispatch(removeLiked({ id: song.id, type }));
            setLiked(false);
        } else {
            dispatch(addLiked({ id: song.id, type }));
            setLiked(true);
        }
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

    const handleRemoveFromList = () => {
        dispatch(removeSongsFromPlaylist({ id: Number(id), songId: song.id }));
    };

    useEffect(() => {
        if (currentSong === song.id) {
            setCurrentPlaying(true);
        } else {
            setCurrentPlaying(false);
        }
        // eslint-disable-next-line
    }, [currentSong]);

    useEffect(() => {
        setLiked(likedData[`${type}s`].findIndex((idx) => idx === song.id) > -1);
        // eslint-disable-next-line
    }, [type, song]);

    return (
        <div className={`song-list-01 app06 ${isDragging ? "song-dragging" : ""}`}>
            <div className="song-list-02 app05">
                {myPlaylist ? (
                    <>
                        <i className="fa-solid fa-grip-vertical fa-sm" style={{ color: "#B197FC" }}></i>
                    </>
                ) : (
                    <>{mode !== "search" && <span className="song-list-03">{index + 1}</span>}</>
                )}
            </div>
            <div className="song-list-02 app05">
                <div
                    style={{
                        maxHeight: "40px",
                        maxWidth: "40px",
                    }}
                >
                    <img
                        src={song.image ? song.image[0].link : ""}
                        alt=""
                        style={{
                            width: "100%",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                {currentPlaying ? (
                    <>
                        {isPlaying ? (
                            <div className="song-list-13 app05">
                                <Equilizer />
                            </div>
                        ) : (
                            <div className="song-list-13 app05" onClick={handleSongPlay}>
                                <div className="app05 song-list-12">
                                    <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#ffffff" }} />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="song-list-09 app05" onClick={handleSongPlay}>
                            <div className="app05 song-list-12">
                                <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#ffffff" }} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="song-list-04">
                <div className="song-list-05 app01 w-100">
                    <h4>
                        <span onClick={handleSong}>{song.name ? convertName(song.name) : convertName(song.title)}</span>
                    </h4>
                    <div>{convertName(song.primaryArtists)}</div>
                </div>
            </div>
            {myPlaylist && (
                <div className="song-list-06">
                    <div className="app05 song-list-14">
                        <i onClick={handleRemoveFromList} className="fa-regular fa-circle-xmark fa-xl"></i>
                    </div>
                </div>
            )}
            <div className="song-list-06" onClick={handleLike}>
                <i className={`fa-${liked ? "solid liked-hrt" : "regular"} fa-heart fa-lg`}></i>
            </div>
            {mode !== "search" && (
                <div className="song-list-07  pRel">
                    <div className="song-list-10 app05 h-100">{formatTime(Number(song.duration))}</div>
                    <div className="song-list-11 options app02">
                        <button className="app05" onClick={handleOptions}>
                            <FontAwesomeIcon icon={faEllipsis} size="lg" style={{ color: "#000000" }} />
                        </button>
                        <div className="options01">
                            {options && (
                                <Options
                                    liked={liked}
                                    data={{ ...song, type: "song" }}
                                    handleLike={handleLike}
                                    options={options}
                                    setoptions={setoptions}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SongList;
