import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, memo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./userTab.css";

import { playAlbum } from "../../Features/musicPlayerSlice";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updatePlaylistDnD } from "../../Features/newPlaylistSlice";

import Options from "../Options/Options";
import SongListMain from "./SongList/SongListMain";
import { apiWebsite } from "../../apiWeb";
import { setOptions } from "../../Features/optionSlice";

const UserTab = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlist.myPlaylists);

    const [options, setoptions] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [currentLoad, setCurrentLoad] = useState(20);
    const [currentList, setCurrentList] = useState({});
    const [currentSongs, setCurrentSongs] = useState([]);

    const loadMoreSongs = () => {
        setCurrentLoad((prev) => prev + 20);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let add,
            songs = currentSongs;

        add = songs.splice(source.index, 1);
        songs.splice(destination.index, 0, add);
        setCurrentSongs(songs);
        dispatch(updatePlaylistDnD({ id, songs }));
    };

    const handlePlay = async (event) => {
        event.stopPropagation();
        const playerData = { playlist: currentSongs, nameOfList: currentList.name, song: currentSongs[0] };
        dispatch(playAlbum(playerData));
    };

    const handleOptions = (event) => {
        const parentDiv = document.getElementById("options-container");
        const optionContiner = document.getElementById("options-main-container");
        const parentRect = parentDiv.getBoundingClientRect();
        const { top, right, left } = event.target.parentNode.getBoundingClientRect();

        const relativeLeft = left - parentRect.left + parentDiv.scrollLeft;
        const relativeTop = top - parentRect.top + parentDiv.scrollTop;

        if (top > window.innerHeight / 2) {
            optionContiner.style.top = relativeTop - 155 + "px";
        } else {
            optionContiner.style.top = relativeTop + 20 + "px";
        }

        if (right < window.innerWidth / 2) {
            optionContiner.style.left = relativeLeft + 20 + "px";
        } else {
            optionContiner.style.left = relativeLeft - 130 + "px";
        }
        setTimeout(() => {
            dispatch(
                setOptions({
                    open: true,
                    data: currentList,
                    playlist: true,
                    // currentEvent: event
                })
            );
        }, 0);
    };

    useEffect(() => {
        const isAvail = playlists.filter((list) => list.id === Number(id))[0];
        if (isAvail) {
            setCurrentSongs(isAvail.songs.slice(0, currentLoad));
        }
        // eslint-disable-next-line
    }, [currentLoad, id, playlists]);

    useEffect(() => {
        const loadData = async () => {
            const isAvail = playlists.filter((list) => list.id === Number(id))[0];
            if (isAvail) {
                // console.log({...isAvail, type: "my-playlist"})
                setCurrentList({ ...isAvail, type: "my-playlist" });
                const imgData = [];
                for (let i = 0; i < 4; i++) {
                    if (isAvail.songs[i]) {
                        const data = await axios.get(`${apiWebsite}/song?id=${isAvail.songs[i]}`);
                        imgData.push(data.data.data.songs[0]);
                    }
                }
                setImageData(imgData);
            }
        };
        loadData();
        // eslint-disable-next-line
    }, [id, playlists]);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="ust01">
                <div className="ust02 app06">
                    <div className="app01 ust03">
                        {[0, 1, 2, 3].map((idx) => (
                            <div key={idx} className="app05 w-50 h-50">
                                {imageData[idx] ? (
                                    <img src={imageData[idx].image[1].link} alt="" />
                                ) : (
                                    <>
                                        <i className="fa-solid fa-music fa-xl"></i>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="ust04">
                        <div>
                            <h1 className="ust05">{currentList.name}</h1>
                        </div>
                        <div>
                            {currentList?.songs?.length} <span>{currentList?.songs?.length > 1 ? "songs" : "song"}</span>
                        </div>
                        <div className="detail-09 app01">
                            <div className="detail-10" onClick={handlePlay}>
                                <button>Play</button>
                            </div>
                            <div className="detail-11 options">
                                <button className="app05" onClick={handleOptions}>
                                    <FontAwesomeIcon icon={faEllipsis} size="2xl" style={{ color: "#ffffff" }} />
                                </button>
                                <div className="options01">
                                    {options && <Options playlist={true} data={currentList} options={options} setoptions={setoptions} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <Droppable droppableId="song-list">
                    {(provided) => (
                        <div className="ust06" ref={provided.innerRef} {...provided.droppableProps}>
                            {currentSongs.map((song, idx) => (
                                <SongListMain key={song} id={song} index={idx} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {currentLoad < currentList?.songs?.length ? (
                    <div className="app02">
                        <button className="ust07" onClick={loadMoreSongs}>
                            Load More
                        </button>
                    </div>
                ) : null}
            </div>
        </DragDropContext>
    );
};

export default memo(UserTab);
