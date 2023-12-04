import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {}, []);
    return (
        <div className="mainContainer">
            <div className="gridMain">
                <div className="sidebarContainer">Left sidebar</div>
                <div className="main-content">main Content</div>
                <div className="footer">Music Player</div>
            </div>
        </div>
    );
};

export default Home;
