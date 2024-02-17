import axios from "axios";
import React, { useEffect, useState, memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItunesNote } from "@fortawesome/free-brands-svg-icons";
import { convertName } from "../../commonFunctions";
import { apiWebsite } from "../../../apiWeb";

const QueueList = ({ item }) => {
    const [songData, setSongData] = useState({});

    useEffect(() => {
        const loadData = async (id) => {
            const data = await axios.get(`${apiWebsite}/songs?id=${id}`);
            setSongData(data.data.data[0]);
        };

        if (item) {
            loadData(item);
        }
    }, [item]);

    return (
        <div className="queue10">
            <div className="app06">
                <div className="queue12 app05">
                    <FontAwesomeIcon icon={faItunesNote} size="2xs" />
                </div>
                <div className="queue13">
                    <img src={songData.image ? songData.image[0].link : ""} alt="" />
                </div>
                <div className="queue14">
                    <div>
                        <h5 className="queue15">{songData.name ? convertName(songData.name) : ""}</h5>
                    </div>
                    <div>
                        <h5 className="queue16">{convertName(songData.primaryArtists)}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(QueueList);
