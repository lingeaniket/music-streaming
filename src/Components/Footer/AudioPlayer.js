import { useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";

import { handleSeek, handleVolumeSeek } from "./audioFunction";

import AudioTab from "./AudioTab/AudioTab";
import AudioSettingTab from "./AudioSettingsTab/AudioSettingTab";

import "./audioPlayer.css";

const AudioPlayer = () => {
    const selectedSong = useSelector((state) => state.player.currentSong);

    const [volume, setVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSongDetails, setCurrentSongDetails] = useState("");

    const audioRef = useRef(new Audio(currentSong));
    const isSeeking = useRef(false);

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
        handleVolumeOverlay(newVolume * 100);
        audioRef.current.volume = newVolume;
    };

    const handleOverlay = (percent) => {
        handleSeek(percent);
    };

    const handleVolumeOverlay = (percent) => {
        handleVolumeSeek(percent);
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

    const handleInputSeekChange = (e) => {
        isSeeking.current = true;
        const seekTime = parseFloat(e.target.value);
        const percent = (seekTime * 100) / audioRef.current.duration;
        handleOverlay(percent);
        setCurrentTime(seekTime);
    };

    useEffect(() => {
        const adRef = audioRef.current;
        adRef.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            adRef.removeEventListener("timeupdate", handleTimeUpdate);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCurrentSong(selectedSong?.downloadUrl[2]?.link);
        setCurrentSongDetails(selectedSong);
        setTimeout(() => {
            if (selectedSong?.downloadUrl) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }, 200);
        handleVolumeOverlay(volume * 100);
        handleOverlay(0);
        // eslint-disable-next-line
    }, [selectedSong]);

    return (
        <>
            <div className="audio-player01">
                <div className="audio-player02">
                    <div className="audio-player03">
                        <img src={currentSongDetails?.image ? currentSongDetails?.image[2].link : ""} alt="" />
                    </div>
                    <div className="audio-player04">
                        <h4 className="audio-player05">{currentSongDetails?.name}</h4>
                        <div className="audio-player05">{currentSongDetails?.primaryArtists}</div>
                    </div>
                </div>
            </div>
            <AudioTab
                audioRef={audioRef}
                currentSong={currentSong}
                currentTime={currentTime}
                togglePlay={togglePlay}
                isPlaying={isPlaying}
                handleInputSeekChange={handleInputSeekChange}
                handleInputSeek={handleInputSeek}
            />
            <AudioSettingTab volume={volume} handleVolumeChange={handleVolumeChange} />
        </>
    );
};

export default AudioPlayer;
