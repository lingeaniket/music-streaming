import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";

import { handleSeek, handleVolumeSeek } from "./audioFunction";

import AudioTab from "./AudioTab/AudioTab";
import AudioSettingTab from "./AudioSettingsTab/AudioSettingTab";

import "./audioPlayer.css";
import axios from "axios";
import { toggleQueue } from "../../Features/musicPlayerSlice";

const AudioPlayer = () => {
    const selectedSong = useSelector((state) => state.player.currentSong);
    const dispatch = useDispatch()

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

    const handleQueue = () => {
        if(window.innerWidth < 768){
            dispatch(toggleQueue());
        }
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
        const loadData = async (id) => {
            const data = await axios.get(`https://saavn.me/songs?id=${id}`);
            const curSong = data.data.data[0];
            setCurrentSong(curSong.downloadUrl[4].link);
            setCurrentSongDetails(curSong);
            setTimeout(() => {
                audioRef.current.play();
                setIsPlaying(true);
            }, 200);
            handleVolumeOverlay(volume * 100);
            handleOverlay(0);
        };
        if (selectedSong) {
            loadData(selectedSong);
        }
        // eslint-disable-next-line
    }, [selectedSong]);

    return (
        <>
            <div className="audio-player01 w-30">
                <div className="audio-player02 app01">
                    <div className="audio-player03" onClick={handleQueue}>
                        <img src={currentSongDetails?.image ? currentSongDetails?.image[2].link : ""} alt="" />
                    </div>
                    <div className="audio-player04 app02 app08">
                        <h4 className="audio-player05">{currentSongDetails?.name?.replace(/&quot;/g, '"')}</h4>
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
