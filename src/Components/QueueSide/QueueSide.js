import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleQueue } from "../../Features/musicPlayerSlice";

import QueueList from "./QueueList/QueueList";

import "./queue.css";

const QueueSide = () => {
    const dispatch = useDispatch();

    const currentSong = useSelector((state) => state.player.currentSong);
    const songIndex = useSelector((state) => state.player.songIndex);
    const songQueue = useSelector((state) => state.player.songQueue);
    // eslint-disable-next-line
    const autoPlaylist = useSelector((state) => state.player.autoPlaylist);
    // eslint-disable-next-line
    const isAutoPlay = useSelector((state) => state.player.isAutoPlay);
    // eslint-disable-next-line
    const autoPlaylistIndex = useSelector((state) => state.player.autoPlaylistIndex);

    const [currentSongDetails, setCurrentSongDetails] = useState({});

    const handleQueueClose = () => {
        dispatch(toggleQueue());
    };

    useEffect(() => {
        const loadCurrentSong = async (id) => {
            const data = await axios.get(`https://saavn.me/songs?id=${id}`);

            setCurrentSongDetails(data.data.data[0]);
        };

        if (currentSong !== 0) {
            loadCurrentSong(currentSong);
        }
    }, [currentSong]);

    return (
        <div className="queue01">
            <div className="queue02">
                <div className="queue17">
                    <div className="queue18"></div>
                    <div className="queue18 queue19">
                        <div className="queue20" onClick={handleQueueClose}>
                            X
                        </div>
                    </div>
                </div>
                <div className="queue03">
                    <div>
                        <div className="queue04">
                            <img src={currentSongDetails.image ? currentSongDetails.image[2]?.link : ""} alt="" className="" />
                        </div>
                        <div>
                            <h2 className="queue05">{currentSongDetails.name ? currentSongDetails.name.replace(/&quot;/g, '"') : ""}</h2>
                            <p className="queue06">{currentSongDetails.primaryArtists}</p>
                        </div>
                    </div>
                    <div className="queue07">
                        <div>
                            <h4 className="queue08">Next in queue</h4>
                        </div>
                        <div className="queue09">
                            {songQueue
                                .filter((q, ind) => ind > songIndex)
                                .map((queue) => (
                                    <QueueList key={queue} item={queue} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueueSide;
