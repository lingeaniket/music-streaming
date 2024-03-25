import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../Footer/Footer";
import Options from "../Options/Options";
import Sidebar from "../Sidebar/Sidebar";
import QueueSide from "../QueueSide/QueueSide";
import BottomBar from "../BottomBar/BottomBar";
import NewPlaylist from "../Modals/NewPlaylist/NewPlaylist";

const Home = () => {
    // to toggle queueOpened
    const queueOpened = useSelector((state) => state.player.queueOpened);
    // to get any song playing in audio player
    const selectedSong = useSelector((state) => state.player.currentSong);
    // to open modal of create new playlist
    const playlistOpen = useSelector((state) => state.playlist.playlistOpen);
    // to open modal of options
    const optionsOpened = useSelector((state) => state.option.optionsOpened);

    return (
        <div className="mainContainer">
            <div className={`gridMain ${queueOpened ? "queue-open" : ""}`}>
                {/* Sidebar for non-mobile screens or screens larger than 760px */}
                <Sidebar />
                <div className={`main-content ${queueOpened ? "queue-shift" : ""}`}>
                    <div className="scrollHider" id="options-container">
                        {/* Main container for options modal */}
                        <div id="options-main-container" className="optionsMainContainer">
                            {optionsOpened && <Options />}
                        </div>
                        <Outlet />
                    </div>
                </div>
                {/* Opens songs queue */}
                {queueOpened && (
                    <div className="right-sidebar">
                        <QueueSide />
                    </div>
                )}
                {/* Footer for audio player */}
                {selectedSong ? <Footer /> : null}
                {/* Bottom Bar for mobile devices */}
                <BottomBar />
            </div>
            {/* toggle Modal to create new playlist */}
            {playlistOpen && <NewPlaylist />}
        </div>
    );
};

export default memo(Home);
