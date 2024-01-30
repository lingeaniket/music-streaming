import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect, memo } from "react";
import "./audioPlayer.css";

import { handleSeek, handleVolumeSeek } from "./audioFunction";
import { playNextSong, toggleIsPlaying, toggleQueue } from "../../Features/musicPlayerSlice";

import AudioTab from "./AudioTab/AudioTab";
import AudioSettingTab from "./AudioSettingsTab/AudioSettingTab";

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const selectedSong = useSelector((state) => state.player.currentSong);

    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSong, setCurrentSong] = useState("");
    const [currentSongDetails, setCurrentSongDetails] = useState("");

    const audioRef = useRef(new Audio(currentSong));
    const isSeeking = useRef(false);

    const togglePlay = () => {
        const adRef = audioRef.current.audioEl;
        if (isPlaying) {
            adRef.current.pause();
        } else {
            adRef.current.play();
        }
        dispatch(toggleIsPlaying());
    };

    const handleVolumeChange = (e) => {
        const adRef = audioRef.current.audioEl;
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        handleVolumeOverlay(newVolume * 100);
        adRef.current.volume = newVolume;
    };

    const handleOverlay = (percent) => {
        handleSeek(percent);
    };

    const handleVolumeOverlay = (percent) => {
        handleVolumeSeek(percent);
    };

    const handleTimeUpdate = () => {
        const adRef = audioRef.current.audioEl;
        if (!isSeeking.current) {
            const currentTime = adRef.current.currentTime;
            const duration = adRef.current.duration;
            const newProgress = (currentTime / duration) * 100;
            handleOverlay(newProgress);
            setCurrentTime(currentTime);
        }
    };

    const handleInputSeek = () => {
        const adRef = audioRef.current.audioEl;
        isSeeking.current = false;
        adRef.current.currentTime = currentTime;
    };

    const handleInputSeekChange = (e) => {
        const adRef = audioRef.current.audioEl;
        isSeeking.current = true;
        const seekTime = parseFloat(e.target.value);
        const percent = (seekTime * 100) / adRef.current.duration;
        handleOverlay(percent);
        setCurrentTime(seekTime);
    };

    const handleQueue = () => {
        if (window.innerWidth < 768) {
            dispatch(toggleQueue());
        }
    };
    const handleSongEnd = () => {
        dispatch(playNextSong());
    };

    useEffect(() => {
        const adRef = audioRef.current.audioEl.current;

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
                audioRef.current.audioEl.current.play();
                dispatch(toggleIsPlaying({ type: true }));
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
            <ReactAudioPlayer volume={volume} id="audio-player" ref={audioRef} src={currentSong} onEnded={handleSongEnd} />
            <AudioTab
                audioRef={audioRef}
                currentSong={currentSong}
                currentTime={currentTime}
                togglePlay={togglePlay}
                handleInputSeekChange={handleInputSeekChange}
                handleInputSeek={handleInputSeek}
            />
            <AudioSettingTab volume={volume} handleVolumeChange={handleVolumeChange} />
        </>
    );
};

export default memo(AudioPlayer);
