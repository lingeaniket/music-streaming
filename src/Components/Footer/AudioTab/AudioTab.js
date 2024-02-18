import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line
import { faBackwardStep, faForwardStep, faPause, faPlay, faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";


import { formatTime } from "../../commonFunctions.js";
import { handleLoop, playNextSong, playPrevSong } from "../../../Features/musicPlayerSlice.js";

const AudioTab = ({ audioRef, currentTime, togglePlay, handleInputSeekChange, handleInputSeek }) => {
    const dispatch = useDispatch();
    const isLoop = useSelector((state) => state.player.isLoop);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const currentSongIndex = useSelector((state) => state.player.songIndex);

    const handleSongEnd = () => {
        dispatch(playNextSong());
    };

    const handlePrevSong = () => {
        dispatch(playPrevSong());
    };

    const handleRepeat = ()=>{
        dispatch(handleLoop());
    }

    return (
        <div className="audio-player06 w-40">
            <div>
                <div className="app01 app06 audio-player07">
                    <div className="app02 app01">
                        <div className="audio-player08 app01">
                            <div className="audio-player09 audio-player12 app01 app02">
                                <button onClick={handleRepeat}>
                                    <FontAwesomeIcon icon={faRepeat} size="xl" style={{ color: isLoop ? "green" : "white" }} />
                                </button>
                            </div>
                            <div className="audio-player09 audio-player12 app01 app02">
                                <button disabled={currentSongIndex === 0} onClick={handlePrevSong}>
                                    <FontAwesomeIcon icon={faBackwardStep} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                            <div className="audio-player09 audio-player12 app01 app02">
                                <button onClick={togglePlay}>
                                    {isPlaying ? (
                                        <FontAwesomeIcon icon={faPause} size="xl" style={{ color: "#ffffff" }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlay} size="xl" style={{ color: "#ffffff" }} />
                                    )}
                                </button>
                                
                            </div>
                            <div className="audio-player09 audio-player12 app01 app02">
                                <button onClick={handleSongEnd}>
                                    <FontAwesomeIcon icon={faForwardStep} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>

                            <div className="audio-player09 audio-player12 app01 app02">
                                <button disabled={true}>
                                    <FontAwesomeIcon icon={faShuffle} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 app01 song-main-range">
                        <div className="time-stamp">{formatTime(currentTime)}</div>
                        <div className="range-cont">
                            <input
                                type="range"
                                min="0"
                                id="seek-range"
                                className="range-input"
                                max={audioRef?.current?.audioEl?.current?.duration ? audioRef?.current?.audioEl?.current?.duration : 0}
                                step="0.01"
                                value={currentTime}
                                onInput={handleInputSeekChange}
                                onMouseUp={handleInputSeek}
                                onTouchEnd={handleInputSeek}
                            />
                            <div className="overlayDiv" id="overlay-div"></div>
                        </div>
                        <div className="time-stamp">{formatTime(audioRef?.current?.audioEl?.current?.duration)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(AudioTab);
