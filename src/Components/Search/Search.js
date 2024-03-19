import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import "./search.css";

import { apiWebsite } from "../../apiWeb";
import { playAlbum } from "../../Features/musicPlayerSlice";
import { getPlayListData } from "../LandingPage/List/listFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import SongList from "../SongList/SongList";
import ListItem from "../LandingPage/List/ListItem/ListItem";

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [timer, setTimer] = useState(null);
    const [searchKey, setsearchkey] = useState("");
    const [topSearch, setTopSearch] = useState([]);
    const [searchData, setSearchData] = useState({});
    const [isSearching, setisSearching] = useState(false);

    // function for navigating to view all
    function handleViewAll() {
        navigate(`/search/${this.type}/${searchKey}`);
    }

    // function to load data on user input
    const loadSearchingData = async (key) => {
        const newKey = key.replaceAll(" ", "+");
        if (newKey) {
            const data = await axios.get(`https://saavn.dev/api/search?query=${newKey}`);
            setSearchData(data.data.data);
        } else {
            setSearchData({});
        }
    };

    // function to handle user input
    const handleInput = (e) => {
        const inputValue = e.target.value;
        setsearchkey(inputValue);
        // if value's length is equal to 0 then showing landing page
        if (inputValue.length === 0) {
            setisSearching(false);
        } else {
            if (!isSearching) {
                setSearchData({});
                setisSearching(true);
            }
        }

        // feature for throttle the requests for 600ms
        if (inputValue.length >= 1) {
            if (timer) {
                clearTimeout(timer);
            }
            setTimer(
                setTimeout(() => {
                    loadSearchingData(inputValue);
                }, 600)
            );
        }
    };

    // function to play top search result
    const handleTopSearch = async (event) => {
        event.stopPropagation();
        const playerData = await getPlayListData(searchData?.topQuery?.results[0]); // function return the data on the basis of type
        dispatch(playAlbum(playerData));
    };

    // load the top trends for landing page
    useEffect(() => {
        const loadTrend = async () => {
            const data = await axios.get(`${apiWebsite}/search/top`);
            setTopSearch(data.data.data);
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
                // if user serching for something
                <div>
                    <div className="app01">
                        {/* If top result of query available */}
                        {searchData?.topQuery?.results.map((data) => (
                            <div className="w-50">
                                <h2>Top Result</h2>
                                <div className="w-100 app01 pRel srch12">
                                    <div className="w-40 srch07">
                                        <img src={data.image[2].url} alt="" className="srch08" />
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
                        {/* If songs related to query available */}
                        {searchData?.songs?.results && (
                            <div className="w-50 pRel">
                                <div className="app03 app06">
                                    <h2>Songs</h2>
                                    <div className="app10">
                                        <button className="srch15" onClick={handleViewAll.bind({ type: "song" })}>
                                            View all
                                        </button>
                                    </div>
                                </div>
                                {searchData.songs.results.map((song, index) => (
                                    <SongList key={index} song={song} index={index} type="song" mode="search" />
                                ))}
                            </div>
                        )}
                    </div>
                    {/* If albums/artist/playlist related to query available */}
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
                                            <ListItem data={album} key={album.id} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ) : (
                // Landing page for search
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
