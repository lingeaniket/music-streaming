import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleQueue } from "../../../Features/musicPlayerSlice";

const AudioSettingTab = ({ volume, handleVolumeChange }) => {
    const queueOpened = useSelector((state) => state.player.queueOpened);

    const dispatch = useDispatch();

    const handleQueue = () => {
        dispatch(toggleQueue());
    };
    return (
        <div
            className="audio-player01"
            style={{
                display: "flex",
            }}
        >
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
            <div className="audio-player13">
                <div className="audio-player14" onClick={handleQueue}>
                    <div
                        className="audio-player15"
                        style={{
                            border: `2px solid ${queueOpened ? "green" : "white"}`,
                        }}
                    >
                        <FontAwesomeIcon icon={faPlay} size="2xs" style={{ color: `${queueOpened ? "green" : "white"}` }} />
                    </div>
                    {queueOpened && (
                        <div className="audio-player16">
                            <FontAwesomeIcon icon={faCircle} style={{ color: "green", fontSize: "5px" }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioSettingTab;
