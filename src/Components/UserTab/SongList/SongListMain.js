import axios from "axios";
import React, { useEffect, useState, memo } from "react";

import { Draggable } from "react-beautiful-dnd";

import SongList from "../../SongList/SongList";
import { apiWebsite } from "../../../apiWeb";

const SongListMain = ({ id, index }) => {
    const [currentSong, setCurrentSong] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const data = await axios.get(`${apiWebsite}/song?id=${id}`);
            setCurrentSong(data.data.data.songs[0]);
        };
        loadData();
    }, [id]);

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {currentSong.id && (
                        <SongList song={currentSong} type="song" index={index} myPlaylist={true} isDragging={snapshot.isDragging} />
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default memo(SongListMain);
