import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./userTab.css";
import { useParams } from "react-router-dom";
import SongListMain from "./SongList/SongListMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Options from "../Options/Options";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updatePlaylistDnD } from "../../Features/newPlaylistSlice";

const UserTab = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlist.myPlaylists);

    const [imageData, setImageData] = useState([]);
    const [currentLoad, setCurrentLoad] = useState(20);
    const [currentList, setCurrentList] = useState({});
    const [options, setoptions] = useState(false);

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

    const handleOptions = (event) => {
        const { top, right } = event.target.parentNode.getBoundingClientRect();
        const parent = event.target.closest(".options");

        const option = parent.querySelector(".options01");

        if (top > window.innerHeight / 2) {
            option.style.bottom = "10%";
        } else {
            option.style.top = "100%";
        }

        if (right < window.innerWidth / 2) {
            option.style.left = "25%";
        } else {
            option.style.right = "10%";
        }

        setTimeout(() => {
            setoptions(true);
        }, 0);
    };

    useEffect(() => {
        const isAvail = playlists.filter((list) => list.id === Number(id))[0];
        if (isAvail) {
            setCurrentSongs(isAvail.songs.slice(0, currentLoad));
        }
        // eslint-disable-next-line
    }, [currentLoad]);

    useEffect(() => {
        const loadData = async () => {
            const isAvail = playlists.filter((list) => list.id === Number(id))[0];
            if (isAvail) {
                setCurrentList(isAvail);
                const imgData = [];
                for (let i = 0; i < 4; i++) {
                    if (isAvail.songs[i]) {
                        const data = await axios.get(`https://saavn.me/songs?id=${isAvail.songs[i]}`);
                        imgData.push(data.data.data[0]);
                    }
                }
                setImageData(imgData);
            }
        };
        loadData();
        // eslint-disable-next-line
    }, [id]);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="ust01">
                <div className="ust02 app06">
                    <div className="app01 ust03">
                        {[0, 1, 2, 3].map((idx) => (
                            <div className="app05 w-50 h-50">
                                {imageData[idx] ? (
                                    <img src={imageData[idx].image[2].link} alt="" />
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
                            <div className="detail-10">
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

export default UserTab;
