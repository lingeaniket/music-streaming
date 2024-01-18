import React, { useEffect, useRef, useState } from "react";
import Library from "../Icons/Library/Library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faHeart, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import MyPlaylist from "../MyPlaylist/MyPlaylist";
import { openPlaylist } from "../../Features/newPlaylistSlice";
import { useDispatch } from "react-redux";

const LibrarryDiv = ({ setOpen }) => {
    const [main, setMain] = useState(true);
    const [mode, setMode] = useState("main");
    const lbRef = useRef();
    const dispatch = useDispatch();

    const handleOpenNew = () => {
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

    const handleClick = (event) => {
        if (lbRef.current && !lbRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    });
    return (
        <div
            ref={lbRef}
            style={{
                width: "150px",
                padding: "12px",
            }}
        >
            {main ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                        onClick={handleMode.bind({ mode: "library" })}
                    >
                        <div
                            style={{
                                width: "30px",
                            }}
                        >
                            <Library />
                        </div>
                        <div>Your Library</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                        onClick={handleMode.bind({ mode: "playlist" })}
                    >
                        <div
                            style={{
                                width: "30px",
                            }}
                        >
                            <FontAwesomeIcon icon={faList} size="lg" style={{ color: "#ffffff" }} />
                        </div>
                        <div>Your Playlist</div>
                    </div>
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            padding: "0 0 12px 0",
                        }}
                        onClick={handleback}
                    >
                        Back
                    </div>
                    {mode === "library" ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                                onClick={handleMode.bind({ mode: "library" })}
                            >
                                <div className="sb08 app06">
                                    <div>
                                        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
                                    </div>
                                </div>
                                <div>History</div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                                onClick={handleMode.bind({ mode: "playlist" })}
                            >
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
                            <MyPlaylist />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LibrarryDiv;
