import React from "react";
import AudioPlayer from "./AudioPlayer";

const Footer = () => {
    return (
        <div className="footer">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                }}
            >
                <AudioPlayer />
            </div>
        </div>
    );
};

export default Footer;
