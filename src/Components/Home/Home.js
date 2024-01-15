import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import QueueSide from "../QueueSide/QueueSide";
import NewPlaylist from "../Modals/NewPlaylist/NewPlaylist";

const Home = () => {
    const selectedSong = useSelector((state) => state.player.currentSong);
    const playlistOpen = useSelector((state) => state.playlist.playlistOpen);
    const queueOpened = useSelector((state) => state.player.queueOpened);

    useEffect(() => {}, []);

    return (
        <div className="mainContainer">
            <div className="gridMain">
                <Sidebar />
                <div className={`main-content ${queueOpened ? "queue-shift" : ""}`}>
                    <div
                        className="scrollHider"
                        style={{
                            // border: "1px solid white",
                            padding: "8px",
                            margin: "0px 8px",
                            height: "100%",
                        }}
                    >
                        <Outlet />
                    </div>
                </div>
                {queueOpened && (
                    <div className="right-sidebar">
                        <QueueSide />
                    </div>
                )}
                {selectedSong && <Footer />}
                {/* <Footer /> */}
            </div>
            {playlistOpen && <NewPlaylist />}
        </div>
    );
};

export default Home;
