import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep, faPause, faPlay, faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";

import {formatTime} from "../../commonFunctions.js"

const AudioTab = ({ audioRef, currentSong, currentTime, togglePlay, isPlaying, handleInputSeekChange, handleInputSeek }) => {
    return (
        <div className="audio-player06">
            <div>
                <audio id="audio-player" ref={audioRef} src={currentSong} />
                <div className="audio-container">
                    <div className="audio-player07">
                        <div className="audio-player08">
                            <div className="audio-player09 audio-player12">
                                <button>
                                    <FontAwesomeIcon icon={faRepeat} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                            <div className="audio-player09 audio-player12">
                                <button>
                                    <FontAwesomeIcon icon={faBackwardStep} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                            <div className="audio-player09 audio-player12">
                                <button onClick={togglePlay}>
                                    {isPlaying ? (
                                        <FontAwesomeIcon icon={faPause} size="xl" style={{ color: "#ffffff" }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlay} size="xl" style={{ color: "#ffffff" }} />
                                    )}
                                </button>
                            </div>
                            <div className="audio-player09 audio-player12">
                                <button>
                                    <FontAwesomeIcon icon={faForwardStep} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>

                            <div className="audio-player09 audio-player12">
                                <button>
                                    <FontAwesomeIcon icon={faShuffle} size="xl" style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                        </div>
                    </div>
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
    );
};

export default AudioTab;