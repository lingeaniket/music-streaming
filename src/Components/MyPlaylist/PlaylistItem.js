import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlaylistItem = ({ playlist }) => {
    const { id } = useParams();
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
    }, [playlist, id]);
    return (
        <div className={`app06 mplay03 ${playlist.id === Number(id) ? "mplay01" : ""}`} onClick={handleNavigate}>
            <div className="mplay02 app01">
                {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="app05 w-50 h-50">
                        {imageData[idx] ? (
                            <img height={'100%'} width={'100%'} src={imageData[idx].image[1].link} alt="" />
                        ) : (
                            <>
                                <i
                                    style={{
                                        fontSize: "6px",
                                    }}
                                    className="fa-solid fa-music"
                                ></i>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: "13px",
                        }}
                    >
                        {playlist.name}
                    </span>
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
