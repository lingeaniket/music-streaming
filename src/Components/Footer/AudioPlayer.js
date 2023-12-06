// AudioPlayer.js
import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css"; // Import the CSS file for styling
import { useSelector } from "react-redux";

const AudioPlayer = () => {
    const [currentSong, setCurrentSong] = useState("");
    const [currentSongDetails, setCurrentSongDetails] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    // eslint-disable-next-line
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(new Audio(currentSong));
    const isSeeking = useRef(false); // Use a ref to track whether the user is currently seeking

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    // eslint-disable-next-line
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        handleVolumeOverlay(newVolume * 100);
        audioRef.current.volume = newVolume;
    };

    const handleOverlay = (percent) => {
        document.getElementById("seek-range").style.background = `linear-gradient(90deg, white ${percent}%, gray 0)`;
        document.getElementById("overlay-div").style.width = `calc(${percent}% + ${percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"})`;
    };
    const handleVolumeOverlay = (percent) => {
        document.getElementById("seek-volume").style.background = `linear-gradient(90deg, white ${percent}%, gray 0)`;
        document.getElementById("overlay-volume-div").style.width = `calc(${percent}% + ${
            percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"
        })`;
    };

    const handleTimeUpdate = () => {
        if (!isSeeking.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const newProgress = (currentTime / duration) * 100;
            handleOverlay(newProgress);
            setCurrentTime(currentTime);
        }
    };

    const handleInputSeek = () => {
        isSeeking.current = false;
        audioRef.current.currentTime = currentTime;
    };

    useEffect(() => {
        const adRef = audioRef.current;
        adRef.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            adRef.removeEventListener("timeupdate", handleTimeUpdate);
        };
        // eslint-disable-next-line
    }, []);

    const handleInputSeekChange = (e) => {
        isSeeking.current = true;
        const seekTime = parseFloat(e.target.value);
        const percent = (seekTime * 100) / audioRef.current.duration;
        handleOverlay(percent);
        setCurrentTime(seekTime);
    };

    const selectedSong = useSelector((state) => state.player.currentSong);

    useEffect(() => {
        console.log(selectedSong);
        setCurrentSong(selectedSong?.downloadUrl[2]?.link);
        setCurrentSongDetails(selectedSong);
        setTimeout(() => {
            if(selectedSong?.downloadUrl){

                audioRef.current.play();
                setIsPlaying(true);
            }
        }, 200);
        handleVolumeOverlay(volume*100)
        handleOverlay(0);
    }, [selectedSong]);

    return (
        <>
            <div
                style={{
                    width: "30%",
                    minWidth: "180px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        padding: "10px",
                    }}
                >
                    <div
                        style={{
                            width: "60px",
                            aspectRatio: "1/1",
                        }}
                    >
                        <img
                            src={currentSongDetails?.image ? currentSongDetails?.image[2].link : ""}
                            alt=""
                            style={{
                                verticalAlign: "middle",
                                width: "100%",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            paddingLeft: "16px",
                            width: "calc(100% - 60px)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <h4
                            style={{
                                textOverflow: "ellipsis",
                                padding: 0,
                                margin: 0,
                                overflow: "hidden",
                                lineHeight: 1.4,
                                fontSize: "13px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {currentSongDetails?.name}
                        </h4>
                        <div
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                lineHeight: 1.4,
                                fontSize: "13px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {currentSongDetails?.primaryArtists}
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "40%",
                    maxWidth: "722px",
                }}
            >
                <div>
                    <audio id="audio-player" ref={audioRef} src={currentSong} />
                    <div className="audio-container">
                        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
                        <div className="range-container">
                            <div className="time-stamp">{formatTime(currentTime)}</div>
                            <div className="range-cont">
                                <input
                                    type="range"
                                    min="0"
                                    id="seek-range"
                                    className="range-input"
                                    max={audioRef.current.duration ? audioRef.current.duration : 0}
                                    step="0.01"
                                    value={currentTime}
                                    onInput={handleInputSeekChange}
                                    onMouseUp={handleInputSeek}
                                />
                                <div className="overlayDiv" id="overlay-div"></div>
                            </div>
                            <div className="time-stamp">{formatTime(audioRef.current.duration)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "30%",
                    minWidth: "180px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div>Volume</div>
                    <div style={{
                        paddingLeft: '16px'
                    }}>
                        <div className="range-cont">
                            <input
                                type="range"
                                min="0"
                                id="seek-volume"
                                className="range-input"
                                max={1}
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                            <div className="overlayDiv" id="overlay-volume-div"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudioPlayer;

const formatTime = (time) => {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "00:00";
};
