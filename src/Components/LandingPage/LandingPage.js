import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "./List/List";

const LandingPage = () => {
    const [trending, setTrending] = useState({});
    const [charts, setCharts] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await axios.get("https://saavn.me/modules?language=hindi,english").then((response) => {
                const musicData = response.data.data;
                setTrending(musicData.trending);
                setAlbums(musicData.albums);
                setCharts(musicData.charts);
                setPlaylists(musicData.playlists);
            });
        };

        loadData();
    }, []);
    return (
        <div
            style={{
                width: "100%",
                padding: "22px",
            }}
        >
            {[trending, albums, playlists, charts].map((val, i) => (
                <div
                    key={i}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                    }}
                >
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
                            Trending Now
                        </h2>
                    </div>
                    <div className="listDiv">
                        {Array.isArray(val) ? (
                            <List data={val} />
                        ) : (
                            <>
                                {val.albums && <List data={val?.albums} />}
                                {val.songs && <List data={val?.songs} />}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LandingPage;
