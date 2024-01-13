import axios from "axios";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItunesNote } from "@fortawesome/free-brands-svg-icons";

const QueueList = ({ item }) => {
    const [songData, setSongData] = useState({});

    useEffect(() => {
        const loadData = async (id) => {
            const data = await axios.get(`https://saavn.me/songs?id=${id}`);
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
                    <img src={songData.image ? songData.image[2].link : ""} alt="" />
                </div>
                <div className="queue14">
                    <div>
                        <h5 className="queue15">{songData.name ? songData.name : ""}</h5>
                    </div>
                    <div>
                        <h5 className="queue16">{songData.primaryArtists}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueueList;
