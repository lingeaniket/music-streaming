import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import "./search.css";

import { playAlbum } from "../../Features/musicPlayerSlice";
import { getPlayListData } from "../LandingPage/List/listFunctions";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SongList from "../SongList/SongList";
import ListItem from "../LandingPage/List/ListItem/ListItem";
import { apiWebsite } from "../../apiWeb";

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [timer, setTimer] = useState(null);
    const [searchKey, setsearchkey] = useState("");
    const [topSearch, setTopSearch] = useState([]);
    const [searchData, setSearchData] = useState({});
    const [isSearching, setisSearching] = useState(false);

    function handleViewAll() {
        navigate(`/search/${this.type}/${searchKey}`);
    }

    const loadSearchingData = async (key) => {
        const newKey = key.replaceAll(" ", "+");
        if (newKey) {
            const data = await axios.get(`${apiWebsite}/search?query=${newKey}`);
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
        <div className="srch01">
            <div className="app06 srch03 w-100">
                {/* <div className="app03 srch04">
                    <div>back</div>
                    <div>next</div>
                </div> */}
                <div className="pRel">
                    <input
                        type="text"
                        className="srch05"
                        value={searchKey}
                        onInput={handleInput}
                        placeholder="What do you want to listen to?"
                    />
                    <div className="srch06">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
                    </div>
                </div>
            </div>
            {isSearching ? (
                <div>
                    <div className="app01">
                        {searchData?.topQuery?.results.map((data) => (
                            <div className="w-50">
                                <h2>Top Result</h2>

                                <div className="w-100 app01 pRel srch12">
                                    <div className="w-40 srch07">
                                        <img src={data.image[2].link} alt="" className="srch08" />
                                    </div>
                                    <div className="srch09">
                                        <h2 className="w-100 srch10">{data.title}</h2>
                                        <p>{data.description}</p>
                                        <div className="srch11 app05">{data.type}</div>
                                    </div>
                                    <div className="srch13">
                                        <button className="srch14" onClick={handleTopSearch}>
                                            Play
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="w-50 pRel">
                            <div className="app03 app06">
                                <h2>Songs</h2>
                                <div className="app10">
                                    <button className="srch15" onClick={handleViewAll.bind({ type: "song" })}>
                                        View all
                                    </button>
                                </div>
                            </div>
                            {searchData?.songs?.results?.map((song, index) => (
                                <SongList song={song} index={index} type="song" mode="search" />
                            ))}
                        </div>
                    </div>
                    {searchData.albums && (
                        <>
                            {["album", "artist", "playlist"].map((type) => (
                                <div key={type}>
                                    <div className="app03 app06">
                                        <h2 className="srch18">{type}</h2>
                                        <div
                                            className="app10"
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <button className="srch15" onClick={handleViewAll.bind({ type })}>
                                                View all
                                            </button>
                                        </div>
                                    </div>
                                    <div className="app01 srch16">
                                        {searchData[`${type}s`]?.results?.map((album) => (
                                            <ListItem data={album} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ) : (
                <>
                    <h2>Trending</h2>
                    <div className="app01 srch16 srch17">
                        {topSearch.map((top, i) => (
                            <ListItem key={i} data={top} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(Search);
