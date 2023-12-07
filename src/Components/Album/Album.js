import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongList from "../SongList/SongList";
import './album.css'

const Album = () => {
    const { albumId } = useParams();
    const [albumDetails, setAlbumDetails] = useState({});
    const [albumSongs, setAlbumSongs] = useState([]);

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
        const loadAlbum = async () => {
            const albumData = await axios.get(`https://saavn.me/albums?id=${albumId}`);
            setAlbumDetails({
                ...albumData.data.data,
                songs: [],
                totalPlays: findPlays(albumData.data.data.songs),
                totalDuration: findDuration(albumData.data.data.songs),
            });
            setAlbumSongs(albumData.data.data.songs);
        };

        if (albumId) {
            loadAlbum();
        }
    }, [albumId]);
    return (
        <div className="album-01">
            <div className="album-02">
                <div className="album-03">
                    <div className="album-04">
                        <img src={albumDetails.image ? albumDetails?.image[2]?.link : ""} alt="" />
                    </div>
                    <div>
                        <h1 className="album-05">{albumDetails.name}</h1>
                        <p className="album-06">
                            <span>by {albumDetails.primaryArtists}</span>
                            <span className="album-07">
                                <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                            </span>
                            <span>{albumDetails.songCount} Songs</span>
                            <span className="album-07">
                                <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                            </span>
                            {/* <span>{albumDetails.totalPlays.toLocaleString()} Plays</span> */}
                            <span className="album-07">
                                <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ffffff", fontSize: "3px" }} />
                            </span>
                            <span>{formatTime(albumDetails.totalDuration)}</span>
                        </p>
                        <p className="album-08">{albumSongs[0]?.copyright}</p>
                        <div className="album-09">
                            <div className="album-10">
                                <button>Play</button>
                            </div>
                            <div className="album-11">
                                <button>
                                    <FontAwesomeIcon icon={faHeart} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                            <div className="album-11">
                                <button>
                                    <FontAwesomeIcon icon={faEllipsis} size="2xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="album-02">
                {albumSongs.map((song, index) => (
                    <SongList key={song.id} song={song} index={index} type="album"/>
                ))}
            </div>
        </div>
    );
};

export default Album;

const formatTime = (time) => {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "00:00";
};
