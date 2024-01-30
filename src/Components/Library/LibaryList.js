import axios from "axios";
import React, { useEffect, useState, memo } from "react";

import ListItem from "../LandingPage/List/ListItem/ListItem";

const LibraryList = ({ id, mode }) => {
    const [currentData, setCurrentData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const data = await axios.get(`https://saavn.me/${mode}s?id=${id}`);
            mode === "song" ? setCurrentData(data.data.data[0]) : setCurrentData(data.data.data);
        };
        loadData();
        // eslint-disable-next-line
    }, [id]);
    return <>{currentData.id && <ListItem data={{ ...currentData, type: mode }} />}</>;
};

export default memo(LibraryList);
