import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { playAlbum } from "../../../../Features/musicPlayerSlice";
import { useNavigate } from "react-router-dom";

const ListItem = ({ val }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAlbum = async (e) => {
        console.log(val.type);
        if (val.type === "album") {
            const albumSongsData = await axios.get(`https://saavn.me/albums?id=${val.id}`);
            const albumData = albumSongsData.data.data;
            const playerData = {
                song: albumData.songs[0],
                playlist: albumData.songs > 2 ? albumData.songs.alice(1, albumData.songCount) : albumData.songs[1],
            };

            dispatch(playAlbum(playerData));
        } else if (val.type === "song") {
            console.log(val.id);
            // const id = "https://saavn.me/songs?id=5WXAlMNt";
            const albumSongsData = await axios.get(`https://saavn.me/songs?id=${val.id}`);
            const albumData = albumSongsData.data.data;
            const playerData = {
                song: albumData[0],
                playlist: [],
            };

            dispatch(playAlbum(playerData));
        }

        e.stopPropagation();
    };

    const handleAlbumRoute = () => {
        navigate(`/${val.type}/${val.name}/${val.id}`);
    };

    return (
        <div className="list02" key={val.id}>
            <div className="listButtons" onClick={handleAlbumRoute}>
                <div className="list03">
                    <div className="list04">
                        <img className="listImg" src={val?.image[2].link} alt="" />
                    </div>
                    <div className="listTabs">
                        <div className="list05">
                            <div className="list06">
                                <div className="mainBtnHov">
                                    <div className="list07" onClick={handleAlbum}>
                                        <div className="playBtn"></div>
                                    </div>
                                    <div className="list07" onClick={handleAlbum}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
                                            <path
                                                fill="#ffffff"
                                                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                                        <path
                                            fill="#ffffff"
                                            d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512">
                                        <path
                                            fill="#ffffff"
                                            d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="listTitle">{val.name ? val.name : val.title}</h4>
                    <p className="listTitle">Artist and singers</p>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
