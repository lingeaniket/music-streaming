// AudioPlayer.js
import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css"; // Import the CSS file for styling

const AudioPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(new Audio(src));
    const isSeeking = useRef(false); // Use a ref to track whether the user is currently seeking

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const handleOverlay = (percent) => {
        document.getElementById("seek-range").style.background = `linear-gradient(90deg, white ${percent}%, gray 0)`;
        document.getElementById("overlay-div").style.width = `calc(${percent}% + ${percent > 50 ? "0px" : percent < 1 ? "0px" : "5px"})`;
    };

    const handleTimeUpdate = () => {
        if (!isSeeking.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const newProgress = (currentTime / duration) * 100;
            setProgress(newProgress);
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
    }, []);

    const handleInputSeekChange = (e) => {
        isSeeking.current = true;
        const seekTime = parseFloat(e.target.value);
        const percent = (seekTime * 100) / audioRef.current.duration;
        handleOverlay(percent);
        setCurrentTime(seekTime);
    };

    return (
        <div>
            <audio ref={audioRef} src={src} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
                <div className="range-container">
                    <div className="time-stamp">{formatTime(currentTime)}</div>
                    <div
                        style={{
                            width: "100%",
                            position: "relative",
                        }}
                        className="range-cont"
                    >
                        <input
                            type="range"
                            min="0"
                            id="seek-range"
                            className="range-input"
                            max={audioRef.current.duration}
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
    );
};

export default AudioPlayer;

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
