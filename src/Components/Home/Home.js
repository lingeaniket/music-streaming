import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
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
                        }}
                    >
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
