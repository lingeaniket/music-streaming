import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { playAlbum } from "../../Features/musicPlayerSlice";
import { getPlayListData } from "../LandingPage/List/listFunctions";

import SongList from "../SongList/SongList";
import ListItem from "../LandingPage/List/ListItem/ListItem";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
    const [timer, setTimer] = useState(null);
    const [searchKey, setsearchkey] = useState("");
    const [topSearch, setTopSearch] = useState([]);
    const [searchData, setSearchData] = useState({});
    const [isSearching, setisSearching] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleViewAll() {
        navigate(`/search/${this.type}/${searchKey}`);
    }

    const loadSearchingData = async (key) => {
        const newKey = key.replaceAll(" ", "+");
        if (newKey) {
            const data = await axios.get(`https://saavn.me/search/all?query=${newKey}`);
            setSearchData(data.data.data);
        } else {
            setSearchData({});
        }
    };

    const handleInput = (e) => {
        setsearchkey(e.target.value);
        if (e.target.value.length === 0) {
            setisSearching(false);
        } else {
            if (!isSearching) {
                setSearchData({});
                setisSearching(true);
            }
        }
        if (e.target.value.length >= 1) {
            if (timer) {
                clearTimeout(timer);
            }
            setTimer(
                setTimeout(() => {
                    loadSearchingData(e.target.value);
                }, 600)
            );
        }
    };

    const handleTopSearch = async (event) => {
        event.stopPropagation();
        const playerData = await getPlayListData(searchData?.topQuery?.results[0]);
        dispatch(playAlbum(playerData));
    };

    useEffect(() => {
        const loadTrend = async () => {
            const data = await axios.get("https://music-streaming-api.onrender.com/api/v1/music/get-topSearch");
            setTopSearch(data.data);
        };
        loadTrend();
    }, []);

    return (
        <div
            style={{
                padding: "22px",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                }}
            >
                <Outlet />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 12px 8px 0",
                    width: "100%",
                    marginBottom: "33px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "12px",
                        width: "100px",
                    }}
                >
                    <div>back</div>
                    <div>next</div>
                </div>
                <div
                    style={{
                        width: "35%",
                        position: "relative",
                    }}
                >
                    <input
                        type="text"
                        style={{
                            background: "transparent",
                            border: "2px solid white",
                            borderRadius: "999px",
                            outline: "none",
                            fontSize: "15px",
                            color: "white",
                            padding: "15px 10px 15px 40px",
                            width: "364px",
                        }}
                        value={searchKey}
                        onInput={handleInput}
                        placeholder="What do you want to listen to?"
                    />
                    <div
                        style={{
                            position: "absolute",
                            left: "25px",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
                    </div>
                </div>
            </div>
            {isSearching ? (
                <div>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        {searchData?.topQuery?.results.map((data) => (
                            <div
                                style={{
                                    width: "50%",
                                }}
                            >
                                <h2>Top Result</h2>

                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "40%",
                                            marginBottom: "22px",
                                        }}
                                    >
                                        <img
                                            src={data.image[2].link}
                                            alt=""
                                            style={{
                                                width: "100%",
                                                borderRadius: "4px",
                                                verticalAlign: "middle",
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: "22px",
                                        }}
                                    >
                                        <h2
                                            style={{
                                                width: "100%",
                                                textOverflow: "ellipsis",
                                                wordWrap: "wrap",
                                            }}
                                        >
                                            {data.title}
                                        </h2>
                                        <p>{data.description}</p>
                                        <div
                                            style={{
                                                backgroundColor: "green",
                                                width: "60px",
                                                display: "flex",
                                                height: "30px",
                                                justifyContent: "center",
                                                padding: "5px",
                                                borderRadius: "999px",
                                                alignItems: "center",
                                                textTransform: "capitalize",
                                                border: "2px solid white",
                                            }}
                                        >
                                            {data.type}
                                        </div>
                                    </div>

                                    {/* show only if parent hovered */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: "30px",
                                            bottom: "30px",
                                        }}
                                    >
                                        <button
                                            style={{
                                                background: "white",
                                                borderRadius: "999px",
                                                width: "auto",
                                                height: "auto",
                                                padding: "10px 30px",
                                                border: "none",
                                                fontWeight: 600,
                                                fontSize: "15px",
                                                cursor: "pointer",
                                            }}
                                            onClick={handleTopSearch}
                                        >
                                            Play
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div
                            style={{
                                width: "50%",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h2>Songs</h2>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <button
                                        style={{
                                            height: "30px",
                                            padding: "5px 12px",
                                            borderRadius: "999px",
                                            border: "none",
                                        }}
                                        onClick={handleViewAll.bind({ type: "song" })}
                                    >
                                        View all
                                    </button>
                                </div>
                            </div>

                            {searchData?.songs?.results?.map((song, index) => (
                                <SongList song={song} index={index} type="song" mode="search" />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h2>Album</h2>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <button
                                    style={{
                                        height: "30px",
                                        padding: "5px 12px",
                                        borderRadius: "999px",
                                        border: "none",
                                    }}
                                    onClick={handleViewAll.bind({ type: "album" })}
                                >
                                    View all
                                </button>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                margin: "0 0 0 -22px",
                            }}
                        >
                            {searchData?.albums?.results.map((album) => (
                                <ListItem data={album} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h2>Artists</h2>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <button
                                    style={{
                                        height: "30px",
                                        padding: "5px 12px",
                                        borderRadius: "999px",
                                        border: "none",
                                    }}
                                    onClick={handleViewAll.bind({ type: "artist" })}
                                >
                                    View all
                                </button>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                margin: "0 0 0 -22px",
                            }}
                        >
                            {searchData?.artists?.results.map((album) => (
                                <ListItem data={album} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h2>Playlists</h2>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <button
                                    style={{
                                        height: "30px",
                                        padding: "5px 12px",
                                        borderRadius: "999px",
                                        border: "none",
                                    }}
                                    onClick={handleViewAll.bind({ type: "playlist" })}
                                >
                                    View all
                                </button>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                margin: "0 0 0 -22px",
                            }}
                        >
                            {searchData?.playlists?.results.map((album) => (
                                <ListItem data={album} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h2>Trending</h2>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            margin: "0 0 0 -22px",
                        }}
                    >
                        {topSearch.map((top) => (
                            <ListItem data={top} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
