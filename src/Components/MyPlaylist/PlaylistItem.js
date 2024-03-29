import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiWebsite } from "../../apiWeb";

const PlaylistItem = ({ playlist, handleClose }) => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [imageData, setImageData] = useState([]);

    const handleNavigate = () => {
        if (handleClose) {
            handleClose();
        }
        navigate(`/my-list/${playlist.id}`);
    };

    useEffect(() => {
        const loadImages = async () => {
            const imgData = [];
            for (let i = 0; i < 4; i++) {
                if (playlist.songs[i]) {
                    const data = await axios.get(`${apiWebsite}/song?id=${playlist.songs[i]}`);
                    imgData.push(data.data.data.songs[0]);
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
                            <img height={"100%"} width={"100%"} src={imageData[idx].image[1].link} alt="" />
                        ) : (
                            <>
                                <i className="fa-solid fa-music mplayMusic"></i>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <span className="mplay05">{playlist.name}</span>
                </div>
                <div>
                    <span className="mplay06">
                        {playlist.songs.length}
                        <span> {playlist.songs.length > 1 ? "songs" : "song"}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(PlaylistItem);
