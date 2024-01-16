import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./userTab.css";
import { useParams } from "react-router-dom";
import SongListMain from "./SongList/SongListMain";

const UserTab = () => {
    const { id } = useParams();
    const playlists = useSelector((state) => state.playlist.myPlaylists);
    
    const [imageData, setImageData] = useState([]);
    const [currentLoad, setCurrentLoad] = useState(20);
    const [currentList, setCurrentList] = useState({});
    const [currentSongs, setCurrentSongs] = useState([]);

    const loadMoreSongs = () => {
        setCurrentLoad((prev) => prev + 20);
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
                console.log(isAvail);
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
                </div>
            </div>
            <hr />
            <div className="ust06">
                {currentSongs.map((song, idx) => (
                    <SongListMain key={song} id={song} index={idx} />
                ))}
            </div>
            {currentLoad < currentList?.songs?.length ? (
                <div className="app02">
                    <button className="ust07" onClick={loadMoreSongs}>
                        Load More
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default UserTab;
