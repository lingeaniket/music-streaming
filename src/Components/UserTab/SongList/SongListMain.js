import axios from "axios";
import React, { useEffect, useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import SongList from "../../SongList/SongList";

const SongListMain = ({ id, index }) => {
    const [currentSong, setCurrentSong] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const data = await axios.get(`https://saavn.me/songs?id=${id}`);
            setCurrentSong(data.data.data[0]);
        };
        loadData();
    }, [id]);

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {currentSong.id && <SongList song={currentSong} type="song" index={index} myPlaylist={true}  isDragging={snapshot.isDragging}/>}
                </div>
            )}
        </Draggable>
    );
};

export default SongListMain;
