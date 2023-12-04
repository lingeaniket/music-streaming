import React from "react";

const Sidebar = () => {
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
                                }}
                            >
                                Home
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
                                }}
                            >
                                Search
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
                    Playlist
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
