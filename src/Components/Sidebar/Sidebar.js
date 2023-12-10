import { faClockRotateLeft, faHeart, faHouse, faList, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Library from "../Icons/Library/Library";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebarContainer">
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#121212",
                        borderRadius: "8px",
                    }}
                >
                    <div
                        style={{
                            padding: "8px 12px",
                        }}
                    >
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faHouse} size="lg" />
                                </div>
                                <div>Home</div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "8px 12px",
                        }}
                    >
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                    cursor: "pointer",
                                }}
                                onClick={()=>{
                                    navigate("/search")
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

                <div
                    style={{
                        backgroundColor: "#121212",
                        borderRadius: "8px",
                        flex: 1,
                    }}
                >
                    <div
                        style={{
                            padding: "8px 12px",
                        }}
                    >
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                <div>
                                    <Library />
                                </div>
                                <div>Your Library</div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        // background: "radial-gradient(circle, #ff6600, #ffcc00)",
                                        background: "linear-gradient(to top left, rgb(255,255,255), rgb(14,0,255))",
                                        width: "50px",
                                        height: "100%",
                                        borderRadius: "5px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
                                    </div>
                                </div>
                                <div>History</div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        // background: "radial-gradient(circle, #ff6600, #ffcc00)",
                                        background: "linear-gradient(to top left, rgb(255,255,255), rgb(14,0,255))",
                                        width: "50px",
                                        height: "100%",
                                        borderRadius: "5px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faHeart} size="sm" style={{ color: "#ffffff" }} />
                                    </div>
                                </div>
                                <div>Liked Songs</div>
                            </div>
                        </div>
                        <div
                            style={{
                                paddingTop: '10px',
                                borderBottom: "1px solid white",
                            }}
                        ></div>
                        
                    </div>
                    <div
                        style={{
                            padding: "4px 12px",
                        }}
                    >
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faList} size="lg" style={{ color: "#ffffff" }} />
                                </div>
                                <div>Your Playlist</div>
                            </div>
                        </div>
                        <div
                            style={{
                                padding: "4px 12px",
                            }}
                        >
                            <div>
                                <button
                                    style={{
                                        margin: 0,
                                        padding: "0 22px",
                                        lineHeight: 2.4,
                                        fontSize: "20px",
                                        outline: "none",
                                        border: "none",
                                        background: "white",
                                        borderRadius: "999px",
                                        fontWeight: 700,
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        height: "40px",
                                    }}
                                >
                                    <span style={{
                                        padding: '0 12px 0 0'
                                    }}>
                                        <FontAwesomeIcon icon={faPlus} size="sm" style={{ color: "black" }} />
                                    </span>
                                    <span style={{
                                        fontSize: '12px'
                                    }}>New Playlist</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
