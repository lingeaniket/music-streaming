import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

const Home = () => {
    const selectedSong = useSelector((state) => state.player.currentSong);

    useEffect(() => {}, []);

    return (
        <div className="mainContainer">
            <div className="gridMain">
                <Sidebar />
                <div className="main-content">
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
                {selectedSong && <Footer />}
            </div>
        </div>
    );
};

export default Home;
