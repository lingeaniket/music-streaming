import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./details.css";

import { apiWebsite } from "../../apiWeb.js";
import { playAlbum } from "../../Features/musicPlayerSlice.js";
import { convertName, formatTime } from "../commonFunctions.js";
import { addLiked, removeLiked } from "../../Features/userSlice.js";
import { getPlayListData } from "../LandingPage/List/listFunctions.js";

import SongList from "../SongList/SongList";
import Loader from "../Icons/Loader/Loader.js";
import MightLike from "../MightLike/MightLike.js";
import { setOptions } from "../../Features/optionSlice.js";

const Details = ({ type }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const likedData = useSelector((state) => state.user.liked);

    const [songs, setSongs] = useState([]);
    const [modules, setModules] = useState({});
    const [liked, setLiked] = useState(false);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

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
            return acc + Number(song.play_count);
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
        const parentDiv = document.getElementById("options-container");
        const optionContiner = document.getElementById("options-main-container");
        const parentRect = parentDiv.getBoundingClientRect();
        const { top, right, left } = event.target.parentNode.getBoundingClientRect();

        const relativeLeft = left - parentRect.left + parentDiv.scrollLeft;
        const relativeTop = top - parentRect.top + parentDiv.scrollTop;

        if (top > window.innerHeight / 2) {
            optionContiner.style.top = relativeTop - 155 + "px";
        } else {
            optionContiner.style.top = relativeTop + 20 + "px";
        }

        if (right < window.innerWidth / 2) {
            optionContiner.style.left = relativeLeft + 20 + "px";
        } else {
            optionContiner.style.left = relativeLeft - 130 + "px";
        }
        setTimeout(() => {
            dispatch(
                setOptions({
                    open: true,
                    data: details,
                    // playlist: myPlaylist,
                    // currentEvent: event
                })
            );
        }, 0);
    };

    useEffect(() => {
        const loadAlbum = async (type) => {
            const albumData = await axios.get(`${apiWebsite}/${type}?id=${id}`);
            setDetails({
                ...albumData.data.data,
                songs: [],
                totalPlays: findPlays(albumData.data.data.songs),
                totalDuration: findDuration(albumData.data.data.songs),
            });
            setModules(albumData.data.data.modules);
            setSongs(albumData.data.data.songs);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        const loadSong = async () => {
            const songData = await axios.get(`${apiWebsite}/song?id=${id}`);
            setDetails({
                ...songData.data.data.songs[0],
                songs: [],
                totalPlays: songData.data.data.songs[0].playCount,
                totalDuration: songData.data.data.songs[0].duration,
            });
            setModules(songData.data.data.modules);

            const albumData = await axios.get(`${apiWebsite}/album?id=${songData.data.data.songs[0].album_id}`);
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
        }
        // eslint-disable-next-line
    }, [id, type]);
    useEffect(() => {
        setLiked(likedData[`${type}s`].findIndex((idx) => idx === id) > -1);
    }, [id, type, likedData]);

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
                            <div
                                style={{
                                    width: "calc(100% - 224px)",
                                }}
                            >
                                <h1 className="detail-05">{convertName(details.name)}</h1>
                                <div className="detail-06 app06">
                                    <span
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        by {convertName(details.subtitle)}
                                    </span>
                                    <span className="detail-07 app05">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    {type !== "song" && (
                                        <>
                                            <span
                                                style={{
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {details.song_count} Songs
                                            </span>
                                            <span className="detail-07 app05">
                                                <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                            </span>
                                        </>
                                    )}
                                    <span
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {details?.totalPlays?.toLocaleString()} Plays
                                    </span>
                                    <span className="detail-07 app05">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    <span>{formatTime(details.totalDuration)}</span>
                                </div>
                                <p className="detail-08">{details.copyright_text}</p>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {type !== "song" ? (
                        <div className="detail-02">
                            {songs.map((song, index) => (
                                <SongList key={song.id} song={song} index={index} type="song" queue={songs} />
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
                                                type="song"
                                                queue={songs}
                                            />
                                        ))}
                                </>
                            )}
                        </div>
                    )}

                    {type === "song" && <MightLike type={type} mode="YML" details={modules.recommend} />}
                    {/* {type === "song" && <MightLike type={type} mode="TSOSAr" details={modules.songs_by_same_artists} />} */}

                    {type === "album" && <MightLike type={type} mode="YML" details={modules.recommend} />}
                    {type === "album" && <MightLike type={type} mode="TAOSY" details={modules.top_albums_from_same_year} />}

                    {type === "playlist" && <MightLike type={type} mode="RP" />}
                </>
            )}
        </div>
    );
};

export default memo(Details);
