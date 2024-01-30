import { useParams } from "react-router-dom";
import React, { useState, useEffect, memo } from "react";
import "../LandingPage/List/list.css";

import { loadAData, loadPData, loadSData } from "./mightLikeFunction";

import List from "../LandingPage/List/List";

const MightLike = ({ type, mode, details }) => {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        const loadAlbumData = async () => {
            const apiData = await loadAData(mode, id, details?.language, details?.year);
            setData(apiData);
        };

        const loadPlaylistData = async () => {
            const apiData = await loadPData(id);
            setData(apiData);
        };

        const loadSongData = async () => {
            const apiData = await loadSData(mode, details?.primaryArtistsId, details?.language, id, details?.album?.id, details?.year);
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
        <div className="app08 detail-12">
            {data.length > 0 && (
                <>
                    <div>
                        <h2 className="detail-13">
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

export default memo(MightLike);
