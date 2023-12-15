import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { formatTime } from "../commonFunctions.js";

import SongList from "../SongList/SongList";

import "./details.css";
import MightLike from "../MightLike/MightLike.js";
import Loader from "../Icons/Loader/Loader.js";

const Details = ({ type }) => {
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});

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
        }
    }, [id, type]);

    return (
        <div className="detail-01">
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            height: "50px",
                            width: "50px",
                        }}
                    >
                        <Loader />
                    </div>
                </div>
            ) : (
                <>
                    <div className="detail-02">
                        <div className="detail-03">
                            <div className="detail-04">
                                <img src={details.image ? details?.image[2]?.link : ""} alt="" />
                            </div>
                            <div>
                                <h1 className="detail-05">{details.name.replace(/&quot;/g, '"')}</h1>
                                <p className="detail-06">
                                    <span>by {details.primaryArtists}</span>
                                    <span className="detail-07">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    <span>{details.songCount} Songs</span>
                                    <span className="detail-07">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    {/* <span>{details.totalPlays.toLocaleString()} Plays</span> */}
                                    <span className="detail-07">
                                        <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                                    </span>
                                    <span>{formatTime(details.totalDuration)}</span>
                                </p>
                                <p className="detail-08">{songs[0]?.copyright}</p>
                                <div className="detail-09">
                                    <div className="detail-10">
                                        <button>Play</button>
                                    </div>
                                    <div className="detail-11">
                                        <button>
                                            <FontAwesomeIcon icon={faHeart} size="xl" style={{ color: "#ffffff" }} />
                                        </button>
                                    </div>
                                    <div className="detail-11">
                                        <button>
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
                                <SongList key={song.id} song={song} index={index} type="album" queue={songs} />
                            ))}
                        </div>
                    ) : (
                        <div className="detail-02">
                            <h3 style={{
                                display: 'flex',
                                marginBottom: '22px'
                            }}>More from {songs[0].album.name}</h3>
                            {songs
                                .filter((song) => song.id !== id)
                                .map((song, index) => (
                                    <SongList key={song.id} song={song} mode="moreAlbumSongs" index={index} type="album" queue={songs} />
                                ))}
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

export default Details;
