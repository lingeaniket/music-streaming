import React, { useEffect, useRef, useState } from "react";
import "./newPlaylist.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewPlayList, addSongsToPlaylist, openPlaylist, updateCurrentdata } from "../../../Features/newPlaylistSlice";
import axios from "axios";

const NewPlaylist = () => {
    const dispatch = useDispatch();
    const addToPlaylist = useSelector((state) => state.playlist.addPlaylistOpen);
    const currentData = useSelector((state) => state.playlist.currentData);
    const myPlaylists = useSelector((state) => state.playlist.myPlaylists);
    const ref = useRef();
    const [inp, setInp] = useState("");
    const [nameError, setNameError] = useState(false);

    const handleCloseModal = () => {
        dispatch(updateCurrentdata(""));
        dispatch(openPlaylist(false));
    };

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            dispatch(updateCurrentdata(""));
            dispatch(openPlaylist(false));
        }
    };

    async function handleAddToPlaylist() {
        const currentid = this.id;
        const type = currentData.type;
        if (type === "album" || type === "playlist") {
            const data = await axios.get(`https://saavn.me/${type}s?id=${currentData.id}`);
            dispatch(addSongsToPlaylist({ id: currentid, songs: data.data.data.songs }));
        } else if (type === "song") {
            const data = await axios.get(`https://saavn.me/songs?id=${currentData.id}`);
            dispatch(addSongsToPlaylist({ id: currentid, songs: data.data.data[0] }));
        }
    }

    const checkAvailable = () => {
        if (myPlaylists.length > 0) {
            return !myPlaylists.some((item) => item.name === inp);
        }
        return true;
    };

    const createPlaylist = () => {
        if (checkAvailable()) {
            if (currentData) {
                dispatch(addNewPlayList({ name: inp, id: new Date().getTime(), songs: [currentData.id] }));
            } else {
                dispatch(addNewPlayList({ name: inp, id: new Date().getTime(), songs: [] }));
            }
            setTimeout(() => {
                dispatch(updateCurrentdata(""));
                dispatch(openPlaylist(false));
            }, 1000);
        } else {
            setNameError(true);
        }
    };

    const handleInput = (event) => {
        if (nameError) {
            setNameError(false);
        }
        setInp(event.target.value.trim());
    };

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
        // eslint-disable-next-line
    }, []);
    return (
        <div className="np01">
            <div className="app05 w-100 h-100">
                <div className="np02" ref={ref}>
                    <div className="np03">
                        <div className="np04">
                            <div className="np05">Create a New Playlist</div>
                            <div className="app08 np06">
                                <div>
                                    <input className="np07" type="text" onChange={handleInput} placeholder="Your new playlist name" />
                                    {nameError && (
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                padding: "5px 22px",
                                                fontWeight: 600,
                                                color: "red",
                                            }}
                                        >
                                            Name is already used
                                        </span>
                                    )}
                                </div>
                                <button className="np08 npbtn" onClick={createPlaylist}>
                                    Save
                                </button>
                            </div>
                        </div>
                        {addToPlaylist && (
                            <div className="np09">
                                <div className="np10">or add to an existing playlist</div>
                                <div>
                                    {myPlaylists.map((playlist) => (
                                        <div key={playlist.id} className="np11" onClick={handleAddToPlaylist.bind({ id: playlist.id })}>
                                            <div className="np12">{playlist.name}</div>
                                            <div className="np13">
                                                {playlist.songs.length} song{playlist.songs.length > 1 ? "s" : ""}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="app08">
                        <div className="np14 npbtn" onClick={handleCloseModal}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPlaylist;
