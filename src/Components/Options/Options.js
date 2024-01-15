import React, { useEffect, useRef, useState } from "react";
import "./options.css";
import { useDispatch, useSelector } from "react-redux";
import { addSongsToPlaylist, openPlaylist, updateCurrentdata } from "../../Features/newPlaylistSlice";
import axios from "axios";

const Options = ({ liked, data, handleLike, setoptions }) => {
    console.log(data);
    const opref = useRef();
    const myPlaylists = useSelector((state) => state.playlist.myPlaylists);

    const [main, setMain] = useState(true);
    const dispatch = useDispatch();

    const handleLiked = (e) => {
        setoptions(false);
        handleLike(e);
    };

    async function handleAddToPlaylist() {
        const currentid = this.id;
        const { type, id } = data;
        if (type === "album" || type === "playlist") {
            const data = await axios.get(`https://saavn.me/${type}s?id=${id}`);
            dispatch(addSongsToPlaylist({ id: currentid, songs: data.data.data.songs }));
        } else if (type === "song") {
            const data = await axios.get(`https://saavn.me/songs?id=${id}`);
            dispatch(addSongsToPlaylist({ id: currentid, songs: data.data.data[0] }));
        }
        dispatch(updateCurrentdata(""));
        setoptions(false);
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
            dispatch(updateCurrentdata(data));
            dispatch(openPlaylist(true));
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
        <div
            ref={opref}
            onClick={stayInModel}
            style={{
                width: "150px",
                padding: "8px 0",
                boxShadow: "0px 4px 12px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: "black",
                background: "white",
            }}
        >
            {main ? (
                <>
                    <div className="opt03" onClick={handleLiked}>
                        {liked ? "Remove from Library" : "Save to Library"}
                    </div>
                    <div className="opt03">Play Playlist Now</div>
                    <div className="opt03">Add to Queue</div>
                    <div className="opt03" onClick={handleMode}>
                        Add to Playlist
                    </div>
                </>
            ) : (
                <>
                    <div className="opt03" onClick={handleMode}>
                        Back
                    </div>
                    <div
                        style={{
                            border: "1px solid #e9e9e9 ",
                            borderLeft: "none",
                            borderRight: "none",
                            margin: "5px 0",
                            padding: "5px 0",
                        }}
                    >
                        <div className="opt03" onClick={handleOpenNew}>
                            <div>
                                <span
                                    style={{
                                        fontSize: "16px",
                                        paddingRight: "10px",
                                    }}
                                >
                                    +
                                </span>{" "}
                                <span>New Playlist</span>
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

export default Options;
