import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./queue.css";

import { convertName } from "../commonFunctions";
import { toggleQueue } from "../../Features/musicPlayerSlice";

import QueueList from "./QueueList/QueueList";
import { apiWebsite } from "../../apiWeb";

const QueueSide = () => {
    const dispatch = useDispatch();

    const songQueue = useSelector((state) => state.player.songQueue);
    const songIndex = useSelector((state) => state.player.songIndex);
    // eslint-disable-next-line
    const isAutoPlay = useSelector((state) => state.player.isAutoPlay);
    const currentSong = useSelector((state) => state.player.currentSong);
    const currentName = useSelector((state) => state.player.currentName);
    // eslint-disable-next-line
    const autoPlaylist = useSelector((state) => state.player.autoPlaylist);
    // eslint-disable-next-line
    const autoPlaylistIndex = useSelector((state) => state.player.autoPlaylistIndex);

    const [currentSongDetails, setCurrentSongDetails] = useState({});

    const handleQueueClose = () => {
        dispatch(toggleQueue());
    };

    useEffect(() => {
        const loadCurrentSong = async (id) => {
            const data = await axios.get(`${apiWebsite}/song?id=${id}`);

            setCurrentSongDetails(data.data.data.songs[0]);
        };

        if (currentSong !== 0) {
            loadCurrentSong(currentSong);
        }
    }, [currentSong]);

    return (
        <div className="queue01">
            <div className="queue02">
                <div className="queue17 app01 app03 w-100">
                    <div className="queue18 queue21">
                        {currentName ? (
                            <span>
                                Playing from <span className="queue22">"{currentName}"</span>
                            </span>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="queue20 app05" onClick={handleQueueClose}>
                        X
                    </div>
                </div>
                <div className="queue03 app08">
                    <div>
                        <div className="queue04 app05">
                            <img src={currentSongDetails.image ? currentSongDetails.image[2]?.link : ""} alt="" className="" />
                        </div>
                        <div>
                            <h3 className="queue05">{currentSongDetails.name ? convertName(currentSongDetails.name) : ""}</h3>
                            <p className="queue06">{convertName(currentSongDetails.primaryArtists)}</p>
                        </div>
                    </div>
                    {songQueue.length > 1 && (
                        <div className="queue07">
                            <div>
                                <h4 className="queue08">Next in queue</h4>
                            </div>
                            <div className="queue09">
                                {songQueue
                                    .filter((q, ind) => ind > songIndex)
                                    .slice(0, 10)
                                    .map((queue) => (
                                        <QueueList key={queue} item={queue} />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(QueueSide);
