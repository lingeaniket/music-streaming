import React from "react";

import List from "../LandingPage/List/List";
import "../LandingPage/List/list.css";
import { useState } from "react";
import { useEffect } from "react";
import { loadAData, loadPData, loadSData } from "./mightLikeFunction";
import { useParams } from "react-router-dom";

const MightLike = ({ type, mode, details }) => {
    const [data, setData] = useState([]);
    const { id } = useParams();

    console.log(type, mode);

    useEffect(() => {
        // album - yml, taosy
        // song - tsosar, tsosact
        //playlis - rp
        const loadAlbumData = async () => {
            const apiData = await loadAData(mode, id, details?.language, details?.year);
            setData(apiData);
        };

        const loadPlaylistData = async () => {
            const apiData = await loadPData(id);
            setData(apiData);
        };

        const loadSongData = async () => {
            console.log("song function called");
            const apiData = await loadSData(mode, details?.primaryArtistsId, details?.language, id);
            setData(apiData);
        };

        if (id) {
            if (type === "album") {
                loadAlbumData();
            } else if (type === "playlist") {
                loadPlaylistData();
            } else if (type === "song") {
                loadSongData();
            }
        }
        // eslint-disable-next-line
    }, [type, id, details?.year]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
            }}
        >
            {data.length > 0 && (
                <>
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                padding: 0,
                                marginBottom: "22px",
                                fontWeight: 700,
                                lineHeight: 1.375,
                            }}
                        >
                            {mode === "YML"
                                ? "You Might Like"
                                : mode === "TAOSY"
                                ? "Top Albums from Same Year"
                                : mode === "TSOSAr"
                                ? "Top Songs Of Same Artist"
                                : mode === "RP"
                                ? "Related Playlist"
                                : ""}
                        </h2>
                    </div>
                    <div className="listDiv">
                        <List data={data} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MightLike;
