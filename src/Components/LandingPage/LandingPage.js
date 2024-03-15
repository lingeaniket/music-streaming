import axios from "axios";
import React, { useEffect, useState, memo } from "react";

import List from "./List/List";
import { useSelector } from "react-redux";
import { apiWebsite } from "../../apiWeb";
import Loader from "../Icons/Loader/Loader";

const LandingPage = () => {
    const selectedLang = useSelector((state) => state.user.languages);

    const [loadingData, setLoadingData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await axios.get(`${apiWebsite}/modules?language=${selectedLang.toString()}`).then((response) => {
                const musicData = response.data.data;
                const pairs = Object.entries(musicData).map(([key, value]) => ({
                    key,
                    position: value.position,
                }));
                pairs.sort((a, b) => a.position - b.position);
                const sortedKeys = pairs.map((pair) => pair.key);
                const sortedArray = sortedKeys
                    .map((key) => musicData[key])
                    .filter((item) => item.title && ["album", "playlist", "chart", "song"].includes(item.data[0].type));
                setLoadingData(sortedArray);
                console.log(sortedArray);
                setLoading(false);
            });
        };

        loadData();
        setLoading(true);
    }, [selectedLang]);

    return (
        <div className="w-100 list11">
            {loading ? (
                <div className="app05">
                    <div className="loaderDiv">
                        <Loader />
                    </div>
                </div>
            ) : (
                <>
                    {loadingData.map((val, i) => (
                        <div key={i} className="app08 list12">
                            <div>
                                <h2 className="list13">{val.title}</h2>
                            </div>
                            <div className="listDiv">
                                <List data={val.data} />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default memo(LandingPage);
