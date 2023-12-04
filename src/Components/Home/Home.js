import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const Home = () => {
    useEffect(() => {}, []);
    return (
        <div className="mainContainer">
            <div className="gridMain">
                <Sidebar/>
                <div className="main-content">main Content</div>
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
