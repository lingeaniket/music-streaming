import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

import { openPlaylist } from "../../Features/newPlaylistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faHeart, faHouse, faList, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

import Library from "../Icons/Library/Library";
import MyPlaylist from "../MyPlaylist/MyPlaylist";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenNew = () => {
        setTimeout(() => {
            dispatch(openPlaylist(true));
        }, 0);
    };
    return (
        <div className="sidebarContainer">
            <div className="app08 h-100 sb01">
                <div className="sb02">
                    <div className="sb03">
                        <div className="sb04">
                            <div
                                className="sb05 app06"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faHouse} size="lg" />
                                </div>
                                <div>Home</div>
                            </div>
                        </div>
                    </div>
                    <div className="sb03">
                        <div className="sb04">
                            <div
                                className="app06 sb05"
                                onClick={() => {
                                    navigate("/search");
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                                </div>
                                <div>Search</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sb06 sb02">
                    <div className="sb03">
                        <div className="sb04">
                            <div className="sb05 app06">
                                <div>
                                    <Library />
                                </div>
                                <div>Your Library</div>
                            </div>
                        </div>
                        <div
                            className="sb04"
                            onClick={() => {
                                navigate("/library/history");
                            }}
                        >
                            <div className="app06 sb07">
                                <div className="sb08 app05 h-100">
                                    <div>
                                        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
                                    </div>
                                </div>
                                <div>History</div>
                            </div>
                        </div>
                        <div
                            className="sb04"
                            onClick={() => {
                                navigate("/library/liked");
                            }}
                        >
                            <div className="app06 sb07">
                                <div className="sb08 app05 h-100">
                                    <div>
                                        <FontAwesomeIcon icon={faHeart} size="sm" style={{ color: "#ffffff" }} />
                                    </div>
                                </div>
                                <div>Liked</div>
                            </div>
                        </div>
                        <div className="sb09"></div>
                    </div>
                    <div className="sb04">
                        <div className="sb04">
                            <div className="app06 sb05">
                                <div>
                                    <FontAwesomeIcon icon={faList} size="lg" style={{ color: "#ffffff" }} />
                                </div>
                                <div>Your Playlist</div>
                            </div>
                        </div>
                        <div className="sb04">
                            <div>
                                <button onClick={handleOpenNew} className="sbBtn app06">
                                    <span className="sb10">
                                        <FontAwesomeIcon icon={faPlus} size="sm" />
                                    </span>
                                    <span className="sb11">New Playlist</span>
                                </button>
                            </div>
                            <MyPlaylist />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
