import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./details.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { playAlbum } from "../../Features/musicPlayerSlice.js";
import { convertName, formatTime } from "../commonFunctions.js";
import { addLiked, removeLiked } from "../../Features/userSlice.js";
import { getPlayListData } from "../LandingPage/List/listFunctions.js";

import SongList from "../SongList/SongList";
import Options from "../Options/Options.js";
import Loader from "../Icons/Loader/Loader.js";
import MightLike from "../MightLike/MightLike.js";

const Details = ({ type }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const likedData = useSelector((state) => state.user.liked);

    const [songs, setSongs] = useState([]);
    const [liked, setLiked] = useState(false);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [options, setoptions] = useState(false);

    const handleLike = (event) => {
        event.stopPropagation();
        if (liked) {
            dispatch(removeLiked({ id, type }));
            setLiked(false);
        } else {
            dispatch(addLiked({ id, type }));
            setLiked(true);
        }
    };

    const findPlays = (songs) => {
        const plays = songs.reduce((acc, song) => {
            return acc + Number(song.playCount);
        }, 0);
        return plays;
    };

    const findDuration = (songs) => {
        const duration = songs.reduce((acc, song) => {
            return acc + Number(song.duration);
        }, 0);
        return duration;
    };

    const handlePlay = async (event) => {
        event.stopPropagation();
        const playerData = await getPlayListData(details, type);
        dispatch(playAlbum(playerData));
    };

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

    useEffect(() => {
        const loadAlbum = async (type) => {
            const albumData = await axios.get(`https://saavn.me/${type}s?id=${id}`);
            setDetails({
                ...albumData.data.data,
                songs: [],
                totalPlays: findPlays(albumData.data.data.songs),
                totalDuration: findDuration(albumData.data.data.songs),
            });
            setSongs(albumData.data.data.songs);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        const loadSong = async () => {
            const songData = await axios.get(`https://saavn.me/songs?id=${id}`);
            setDetails({
                ...songData.data.data[0],
                songs: [],
                totalPlays: songData.data.data[0].playCount,
                totalDuration: songData.data.data[0].duration,
            });

            const albumData = await axios.get(`https://saavn.me/albums?id=${songData.data.data[0].album.id}`);
            setSongs(albumData.data.data.songs);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        if (id) {
            setLoading(true);
            if (type === "album" || type === "playlist") {
                loadAlbum(type);
            } else if (type === "song") {
                loadSong();
            }
            setLiked(likedData[`${type}s`].findIndex((idx) => idx === id) > -1);
        }
        // eslint-disable-next-line
    }, [id, type]);

    return (
        <div className="detail-01">
            {loading ? (
                <div className="app05">
                    <div className="loaderDiv">
                        <Loader />
                    </div>
                </div>
            ) : (
                <>
                    <div className="detail-02">
                        <div className="app01">
                            <div className="detail-04">
                                <img src={details.image ? details?.image[2]?.link : ""} alt="" />
                            </div>
                            <div>
                                <h1 className="detail-05">{convertName(details.name)}</h1>
                                <div className="detail-06 app06">
                                    <span>by {convertName(details.primaryArtists)}</span>
                                    <span className="detail-07 app05">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    {type !== "song" && (
                                        <>
                                            <span>{details.songCount} Songs</span>
                                            <span className="detail-07 app05">
                                                <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                            </span>
                                        </>
                                    )}
                                    <span>{details?.totalPlays?.toLocaleString()} Plays</span>
                                    <span className="detail-07 app05">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    <span>{formatTime(details.totalDuration)}</span>
                                </div>
                                <p className="detail-08">{songs[0]?.copyright}</p>
                                <div className="detail-09 app01">
                                    <div className="detail-10" onClick={handlePlay}>
                                        <button>Play</button>
                                    </div>
                                    <div className="detail-11">
                                        <button className="app05" onClick={handleLike}>
                                            <i
                                                className={`fa-${liked ? "solid" : "regular"} fa-heart fa-2xl`}
                                                style={{ color: `${liked ? "green" : "#ffffff"}` }}
                                            ></i>
                                        </button>
                                    </div>
                                    <div className="detail-11 options">
                                        <button className="app05" onClick={handleOptions}>
                                            <FontAwesomeIcon icon={faEllipsis} size="2xl" style={{ color: "#ffffff" }} />
                                        </button>
                                        <div className="options01">
                                            {options && (
                                                <Options
                                                    liked={liked}
                                                    data={details}
                                                    handleLike={handleLike}
                                                    options={options}
                                                    setoptions={setoptions}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {type !== "song" ? (
                        <div className="detail-02">
                            {songs.map((song, index) => (
                                <SongList key={song.id} song={song} index={index} type="album" queue={songs} />
                            ))}
                        </div>
                    ) : (
                        <div className="detail-02">
                            {songs.length > 1 && (
                                <>
                                    <h3 className="app01 detail-08">More from {convertName(songs[0].album.name)}</h3>
                                    {songs
                                        .filter((song) => song.id !== id)
                                        .map((song, index) => (
                                            <SongList
                                                key={song.id}
                                                song={song}
                                                mode="moreAlbumSongs"
                                                index={index}
                                                type="album"
                                                queue={songs}
                                            />
                                        ))}
                                </>
                            )}
                        </div>
                    )}

                    {type === "song" && <MightLike type={type} mode="YML" details={details} />}
                    {type === "song" && <MightLike type={type} mode="TSOSAr" details={details} />}

                    {type === "album" && <MightLike type={type} mode="YML" details={songs[0]} />}
                    {type === "album" && <MightLike type={type} mode="TAOSY" details={songs[0]} />}

                    {type === "playlist" && <MightLike type={type} mode="RP" details={songs[0]} />}
                </>
            )}
        </div>
    );
};

export default memo(Details);
