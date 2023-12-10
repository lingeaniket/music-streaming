import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "../LandingPage/List/List";
import ListItem from "../LandingPage/List/ListItem/ListItem";

const Search = () => {
    const [searchKey, setsearchkey] = useState("");
    const [topSearch, setTopSearch] = useState([]);
    const [searchData, setSearchData] = useState({})
    const [timer, setTimer] = useState(null);
    const [isSearching, setisSearching] = useState(false);

    const loadSearchingData= async (key)=>{
      const newKey = key.replaceAll(" ", "+");
      const data = await axios.get(`https://saavn.me/search/all?query=${newKey}`);
      setSearchData(data.data)
    }

    const handleInput = (e) => {
        setsearchkey(e.target.value);
        if (e.target.value.length === 0) {
            setisSearching(false);
        } else {
            if (!isSearching) {
                setisSearching(true);
            }
        }
        if(e.target.value.length >=1) {
          if(timer){
            clearTimeout(timer)
          }
          setTimer(setTimeout(()=>{
            loadSearchingData(e.target.value)
          }, 600))
        }
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
            }}
        >
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
                <div>{searchKey}</div>
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
                        {/* <List data={topSearch}/> */}
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
