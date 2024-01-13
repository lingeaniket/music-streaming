import axios from "axios";

export const formatTime = (time) => {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "00:00";
};

export const getAutoPlaylist = async (stationid) => {
    if (stationid) {
        const data = await axios.get(`https://music-streaming-api.onrender.com/api/v1/music/autoPlay?entityId=${stationid}`);

        const autoPlaylist = data.data.queue;
        const playlist = [];
        for (let key in autoPlaylist) {
            playlist.push(autoPlaylist[key].song.id);
        }

        return playlist;
    }
};

export function convertName(name) {
    const sequenceMap = {
        "%20": " ",
        "%22": '"',
        "%27": "'",
        "%2C": ",",
        "%3F": "?",
        "&quot;": '"',
        "&#039;": "'",
        "&amp;": "&",
    };

    return name.replace(/%20|%22|%27|%2C|%3F|&quot;|&#039;|&amp;/g, (match) => sequenceMap[match]);
}
