import React, { useEffect, useRef } from "react";
import "./options.css";

const Options = ({ liked, data, handleLike, setoptions, options }) => {
    const opref = useRef();

    const handleLiked = (e) => {
        setoptions(false);
        handleLike(e);
    };

    const handleClick = (e) => {
        if (opref.current && !opref.current.contains(e.target)) {
            setoptions(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    return (
        <div
            ref={opref}
            style={{
                width: "150px",
                padding: "8px 0",
                boxShadow: "0px 4px 12px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: "black",
                background: "white",
            }}
        >
            <div className="opt03" onClick={handleLiked}>
                {liked ? "Remove from Library" : "Save to Library"}
            </div>
            <div className="opt03">Play Playlist Now</div>
            <div className="opt03">Add to Queue</div>
            <div className="opt03">Add to Playlist</div>
        </div>
    );
};

export default Options;
