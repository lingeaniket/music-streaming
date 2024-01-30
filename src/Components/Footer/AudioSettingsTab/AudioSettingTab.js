import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

import { toggleQueue } from "../../../Features/musicPlayerSlice";

const AudioSettingTab = ({ volume, handleVolumeChange }) => {
    const dispatch = useDispatch();
    const queueOpened = useSelector((state) => state.player.queueOpened);

    const handleQueue = () => {
        dispatch(toggleQueue());
    };
    return (
        <div className="audio-player01 w-30 app01">
            <div className="audio-player10 w-50 app06">
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
            <div className="audio-player13 app01 app03 app07">
                <div className="audio-player14 app01 app03 app07" onClick={handleQueue}>
                    <div className="audio-player15 app01 app04">
                        <i className="fa-solid fa-list-ul fa-lg" style={{ color: `${queueOpened ? "rgb(43, 197, 180)" : "white"}` }}></i>
                    </div>
                    {queueOpened && (
                        <div className="audio-player16 app01 app02">
                            <FontAwesomeIcon icon={faCircle} style={{ color: "rgb(43, 197, 180)", fontSize: "5px" }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(AudioSettingTab);
