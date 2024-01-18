import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import QueueSide from "../QueueSide/QueueSide";
import NewPlaylist from "../Modals/NewPlaylist/NewPlaylist";
import BottomBar from "../BottomBar/BottomBar";

const Home = () => {
    const queueOpened = useSelector((state) => state.player.queueOpened);
    const selectedSong = useSelector((state) => state.player.currentSong);
    const playlistOpen = useSelector((state) => state.playlist.playlistOpen);

    return (
        <div className="mainContainer">
            <div className="gridMain">
                <Sidebar />
                <div className={`main-content ${queueOpened ? "queue-shift" : ""}`}>
                    <div className="scrollHider" style={{}}>
                        <Outlet />
                    </div>
                </div>
                {queueOpened && (
                    <div className="right-sidebar">
                        <QueueSide />
                    </div>
                )}
                {selectedSong ? <Footer /> : null}
                <BottomBar />
            </div>
            {playlistOpen && <NewPlaylist />}
        </div>
    );
};

export default Home;
