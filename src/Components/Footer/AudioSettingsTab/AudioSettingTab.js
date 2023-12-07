import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

const AudioSettingTab = ({ volume, handleVolumeChange }) => {
    return (
        <div className="audio-player01">
            <div className="audio-player10">
                <div className="audio-player11">
                    {volume === 0 ? (
                        <FontAwesomeIcon icon={faVolumeXmark} size="lg" />
                    ) : volume > 0 && volume < 0.25 ? (
                        <FontAwesomeIcon icon={faVolumeOff} size="lg" />
                    ) : volume >= 0.25 && volume < 0.75 ? (
                        <FontAwesomeIcon icon={faVolumeLow} size="lg" />
                    ) : (
                        volume >= 0.75 && <FontAwesomeIcon icon={faVolumeHigh} size="lg" />
                    )}
                </div>
                <div className="audio-player09">
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
    );
};

export default AudioSettingTab;
