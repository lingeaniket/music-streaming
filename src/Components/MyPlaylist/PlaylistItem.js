import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaylistItem = ({ playlist }) => {
    const [imageData, setImageData] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/my-list/${playlist.id}`);
    };

    useEffect(() => {
        const loadImages = async () => {
            const imgData = [];
            for (let i = 0; i < 4; i++) {
                if (playlist.songs[i]) {
                    const data = await axios.get(`https://saavn.me/songs?id=${playlist.songs[i]}`);
                    imgData.push(data.data.data[0]);
                }
            }

            setImageData(imgData);
        };

        loadImages();
    }, [playlist]);
    return (
        <div
            onClick={handleNavigate}
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    height: "50px",
                    margin: "5px",
                    width: "50px",
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {[0, 1, 2, 3].map((idx) => (
                    <div
                        style={{
                            width: "50%",
                            height: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {imageData[idx] ? (
                            <img src={imageData[idx].image[2].link} alt="" />
                        ) : (
                            <>
                                <i className="fa-solid fa-music fa-2xs"></i>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <span>{playlist.name}</span>
                </div>
                <div>
                    <span
                        style={{
                            fontSize: "11px",
                        }}
                    >
                        {playlist.songs.length}
                        <span> {playlist.songs.length > 1 ? "songs" : "song"}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PlaylistItem;
