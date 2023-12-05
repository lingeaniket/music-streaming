import axios from "axios";
import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

const Footer = () => {
    const [musicdata, setMusicData] = useState("");
    useEffect(() => {
        const loadMusic = async () => {
            await axios.get("https://saavn.me/search/songs?query=kun+faya+kun&page=1&limit=2").then((res) => {
                setMusicData(res.data.data.results[0].downloadUrl[0].link);
                console.log(res.data.data.results[0].downloadUrl[0].link);
            });
        };

        loadMusic();
    }, []);
    return (
        <div className="footer">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        width: "30%",
                        minWidth: "180px",
                    }}
                >
                    Player Image
                </div>
                <div
                    style={{
                        width: "40%",
                        maxWidth: "722px",
                    }}
                >
                    {musicdata && (
                        <AudioPlayer src={musicdata}/>
                        // <audio
                        //     controls="controls"
                        //     style={{
                        //         opacity: 0.5,
                        //         pointerEvents: "none",
                        //     }}
                        // >
                        //     <source src={musicdata} type="audio/mp3" />
                        // </audio>
                    )}

                    {/* <input type="range" />
                    <div>
                        <progress />
                    </div> */}
                </div>
                <div
                    style={{
                        width: "30%",
                        minWidth: "180px",
                    }}
                >
                    settings
                </div>
            </div>
        </div>
    );
};

export default Footer;
