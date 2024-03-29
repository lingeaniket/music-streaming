import axios from "axios";
import React, { useEffect, useState, memo } from "react";

import ListItem from "../LandingPage/List/ListItem/ListItem";
import { apiWebsite } from "../../apiWeb";

const LibraryList = ({ id, mode }) => {
    const [currentData, setCurrentData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const data = await axios.get(`${apiWebsite}/${mode}?id=${id}`);
            mode === "song" ? setCurrentData(data.data.data.songs[0]) : setCurrentData(data.data.data);
            //    setCurrentData(data.data.data.songs)
        };
        loadData();
        // eslint-disable-next-line
    }, [id]);
    return <>{currentData.id && <ListItem data={{ ...currentData, type: mode }} />}</>;
};

export default memo(LibraryList);
