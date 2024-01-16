import React, { useEffect, useState } from "react";
import SongList from "../../SongList/SongList";
import axios from "axios";

const SongListMain = ({ id, index }) => {
    const [currentSong, setCurrentSong] = useState({});
    useEffect(() => {
        const loadData = async () => {
            const data = await axios.get(`https://saavn.me/songs?id=${id}`);
            setCurrentSong(data.data.data[0]);
        };
        loadData();
    }, [id]);
    return <div>{currentSong.id && <SongList song={currentSong} type="song" index={index} />}</div>;
};

export default SongListMain;
