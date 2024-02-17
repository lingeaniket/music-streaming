import axios from "axios";
import React, { useEffect, useState, memo } from "react";

import List from "./List/List";
import { useSelector } from "react-redux";
import { apiWebsite } from "../../apiWeb";

const LandingPage = () => {
    const selectedLang = useSelector((state) => state.user.languages);

    const [charts, setCharts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [trending, setTrending] = useState({});
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await axios.get(`${apiWebsite}/modules?language=${selectedLang.toString()}`).then((response) => {
                const musicData = response.data.data;
                setTrending(musicData.trending);
                setAlbums(musicData.albums);
                setCharts(musicData.charts);
                setPlaylists(musicData.playlists);
            });
        };

        loadData();
    }, [selectedLang]);

    return (
        <div className="w-100 list11">
            {trending && (
                <>
                    {[trending, albums, playlists, charts].map((val, i) => (
                        <div key={i} className="app08 list12">
                            <div>
                                <h2 className="list13">
                                    {i === 0 ? "Trending Now" : i === 1 ? "Albums" : i === 2 ? "Playlists" : i === 3 ? "Charts" : ""}
                                </h2>
                            </div>
                            <div className="listDiv">
                                {Array.isArray(val) ? (
                                    <List data={val} />
                                ) : (
                                    <>{val.albums && <List data={[...val.albums, ...val.songs]} />}</>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default memo(LandingPage);
