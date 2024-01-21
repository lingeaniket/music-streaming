import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./library.css";

import { playAlbum } from "../../Features/musicPlayerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faHeart } from "@fortawesome/free-solid-svg-icons";

import LibraryList from "./LibaryList";

const Library = () => {
    const { type } = useParams();

    const dispatch = useDispatch();
    const history = useSelector((state) => state.user.history);
    const liked = useSelector((state) => state.user.liked);

    const [mode, setMode] = useState("song");
    const [currentLoad, setCurrentLoad] = useState(20);
    const [currentSongs, setCurrentSongs] = useState([]);

    function handleMode() {
        if (this.mode !== mode) {
            setCurrentLoad(20);
            setMode(this.mode);
        }
    }

    const loadMoreSongs = () => {
        setCurrentLoad((prev) => prev + 20);
    };

    const handlePlay = async (event) => {
        event.stopPropagation();
        const playerData = { playlist: currentSongs, nameOfList: type, song: currentSongs[0] };
        dispatch(playAlbum(playerData));
    };

    useEffect(() => {
        if (type === "liked") {
            setCurrentSongs(liked[mode + "s"]);
        }
        // eslint-disable-next-line
    }, [mode]);

    useEffect(() => {
        const isAvail = type === "history" ? history : liked;
        if (isAvail) {
            type === "liked" ? setCurrentSongs(isAvail.songs) : setCurrentSongs(isAvail);
        }
        // eslint-disable-next-line
    }, [type]);

    return (
        <div className="ust01">
            <div className="ust02 app06">
                <div className="app01 ust03">
                    <div className="sb08 app05 h-100 w-100">
                        <div>
                            {type === "history" ? (
                                <FontAwesomeIcon icon={faClockRotateLeft} size="2xl" />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} size="2xl" style={{ color: "#ffffff" }} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="ust04">
                    <div>
                        <h1 className="ust05">{type}</h1>
                    </div>
                    {type !== "liked" && (
                        <>
                            <div>
                                {currentSongs.length} <span>{currentSongs.length > 1 ? "songs" : "song"}</span>
                            </div>
                            <div className="detail-09 app01">
                                <div className="detail-10" onClick={handlePlay}>
                                    <button>Play</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <hr />
            {type === "liked" && (
                <div className="app01 lbry01">
                    <div className="app05 lbry02" onClick={handleMode.bind({ mode: "song" })}>
                        <div className={`lbry03 ${mode === "song" ? "lbry03_s" : ""}`}>Songs</div>
                    </div>
                    <div className="app05 lbry02" onClick={handleMode.bind({ mode: "album" })}>
                        <div className={`lbry03 ${mode === "album" ? "lbry03_s" : ""}`}>Albums</div>
                    </div>
                    <div className="app05 lbry02" onClick={handleMode.bind({ mode: "playlist" })}>
                        <div className={`lbry03 ${mode === "playlist" ? "lbry03_s" : ""}`}>Playlists</div>
                    </div>
                </div>
            )}
            <div className="ust06">
                <div className="app01 lbry04">
                    {currentSongs.slice(0, currentLoad).map((song, idx) => (
                        <LibraryList key={song} id={song} mode={mode} />
                    ))}
                </div>
            </div>
            {currentLoad < currentSongs.length ? (
                <div className="app02">
                    <button className="ust07" onClick={loadMoreSongs}>
                        Load More
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Library;
