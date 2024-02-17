import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState, memo } from "react";
import "./options.css";

import { addToQueue } from "../commonFunctions";
import { getPlayListData } from "../LandingPage/List/listFunctions";
import { addSongsToQueue, playAlbum } from "../../Features/musicPlayerSlice";
import { addSongsToPlaylist, openAddPlaylist, openPlaylist, updateCurrentdata } from "../../Features/newPlaylistSlice";
import { apiWebsite } from "../../apiWeb";

const Options = ({ liked, data, handleLike, setoptions, playlist }) => {
    const opref = useRef();

    const dispatch = useDispatch();
    const myPlaylists = useSelector((state) => state.playlist.myPlaylists);

    const [main, setMain] = useState(true);

    const handleAddToQueue = async () => {
        setoptions(false);
        const queueFunction = addToQueue.bind({ id: data.id, type: data.type });
        const songs = await queueFunction();
        dispatch(addSongsToQueue({ songs }));
    };

    const handleLiked = (e) => {
        setoptions(false);
        handleLike(e);
    };

    const playCategory = async (event) => {
        event.stopPropagation();
        const playerData = await getPlayListData(data, data.type);
        dispatch(playAlbum(playerData));
        setoptions(false);
    };

    async function handleAddToPlaylist() {
        const currentid = this.id;
        const { type, id } = data;
        if (playlist) {
            dispatch(addSongsToPlaylist({ id: currentid, songs: data.songs }));
        } else {
            if (type === "album" || type === "playlist") {
                const data = await axios.get(`${apiWebsite}/${type}s?id=${id}`);
                dispatch(addSongsToPlaylist({ id: currentid, songs: data.data.data.songs }));
            } else if (type === "song") {
                const data = await axios.get(`${apiWebsite}/songs?id=${id}`);
                dispatch(addSongsToPlaylist({ id: currentid, songs: data.data.data }));
            }
            dispatch(updateCurrentdata(""));
            setoptions(false);
        }
    }

    const stayInModel = (event) => {
        event.stopPropagation();
    };

    function handleMode() {
        setMain((prev) => !prev);
    }

    const handleClick = (e) => {
        if (opref.current && !opref.current.contains(e.target)) {
            setoptions(false);
        }
    };

    const handleOpenNew = () => {
        setoptions(false);
        setTimeout(() => {
            if (playlist) {
                dispatch(updateCurrentdata({ ...data, type: "my-playlist" }));
            } else {
                dispatch(updateCurrentdata(data));
            }
            dispatch(openPlaylist(true));
            dispatch(openAddPlaylist(true));
        }, 0);
    };

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
        // eslint-disable-next-line
    }, []);
    return (
        <div ref={opref} onClick={stayInModel} className="opt06">
            {main ? (
                <>
                    {!playlist && (
                        <div className="opt03" onClick={handleLiked}>
                            {liked ? "Remove from Library" : "Save to Library"}
                        </div>
                    )}
                    <div className="opt03 opt05" onClick={playCategory}>
                        Play {data.type && data.type === "my-playlist" ? "Playlist" : data.type} Now
                    </div>
                    <div className="opt03" onClick={handleAddToQueue}>
                        Add to Queue
                    </div>
                    <div className="opt03" onClick={handleMode}>
                        Add to Playlist
                        <div>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="opt03" onClick={handleMode}>
                        <div className="app01">
                            <div className="opt07">
                                <i className="fa-solid fa-chevron-left"></i>
                            </div>
                            Back
                        </div>
                    </div>
                    <div className="opt08">
                        <div className="opt03" onClick={handleOpenNew}>
                            <div>
                                <span className="opt09">+</span> <span>New Playlist</span>
                            </div>
                        </div>
                    </div>
                    {myPlaylists.map((playlist) => (
                        <div key={playlist.id} className="opt03" onClick={handleAddToPlaylist.bind({ id: playlist.id })}>
                            {playlist.name}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default memo(Options);
