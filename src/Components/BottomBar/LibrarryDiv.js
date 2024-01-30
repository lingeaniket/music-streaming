import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState, memo } from "react";

import { openPlaylist } from "../../Features/newPlaylistSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faHeart, faList, faPlus } from "@fortawesome/free-solid-svg-icons";

import Library from "../Icons/Library/Library";
import MyPlaylist from "../MyPlaylist/MyPlaylist";
import LanguageDiv from "../Sidebar/LanguageDiv/LanguageDiv";
import { useNavigate } from "react-router-dom";

const LibrarryDiv = ({ setOpen }) => {
    const lbRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [main, setMain] = useState(true);
    const [mode, setMode] = useState("main");

    const handleOpenNew = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(openPlaylist(true));
        }, 0);
    };

    const handleback = () => {
        setTimeout(() => {
            setMain(true);
        }, 0);
    };

    function handleMode() {
        setTimeout(() => {
            setMode(this.mode);
            setMain(false);
        }, 0);
    }

    function handleRoute() {
        setOpen(false);
        navigate(`/library/${this.mode}`);
    }

    const handleClick = (event) => {
        if (lbRef.current && !lbRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    });

    return (
        <div ref={lbRef} className="sb12">
            {main ? (
                <div className="sb01 app08">
                    <div className="sb01 app06" onClick={handleMode.bind({ mode: "library" })}>
                        <div className="sb13">
                            <Library />
                        </div>
                        <div>Your Library</div>
                    </div>
                    <div className="sb01 app06" onClick={handleMode.bind({ mode: "playlist" })}>
                        <div className="sb13">
                            <FontAwesomeIcon icon={faList} size="lg" style={{ color: "#ffffff" }} />
                        </div>
                        <div>Your Playlist</div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="sb14" onClick={handleback}>
                        <span
                            style={{
                                marginRight: "12px",
                            }}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </span>
                        Back
                    </div>
                    {mode === "library" ? (
                        <div className="sb01 app08">
                            <div className="sb01 app06">
                                <LanguageDiv mode="mobile" />
                            </div>
                            <div className="app06 sb01" onClick={handleRoute.bind({ mode: "history" })}>
                                <div className="sb08 app06">
                                    <div>
                                        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
                                    </div>
                                </div>
                                <div>History</div>
                            </div>
                            <div className="app06 sb01" onClick={handleRoute.bind({ mode: "liked" })}>
                                <div className="sb08 app06">
                                    <div>
                                        <FontAwesomeIcon icon={faHeart} size="sm" style={{ color: "#ffffff" }} />
                                    </div>
                                </div>
                                <div>Liked</div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <button onClick={handleOpenNew} className="sbBtn app06">
                                    <span className="sb10">
                                        <FontAwesomeIcon icon={faPlus} size="sm" style={{ color: "black" }} />
                                    </span>
                                    <span className="sb11">New</span>
                                </button>
                            </div>
                            <MyPlaylist handleClose={handleClose} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(LibrarryDiv);
