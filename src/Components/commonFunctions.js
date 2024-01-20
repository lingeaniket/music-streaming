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

    return name ? name.replace(/%20|%22|%27|%2C|%3F|&quot;|&#039;|&amp;/g, (match) => sequenceMap[match]) : "";
}

export function closeForceOptions() {
    const containers = document.querySelectorAll(".options01");
    const containersArray = Array.from(containers);

    for (let i = 0; i < containersArray.length; i++) {
        const optionsDiv = containersArray[i];
        optionsDiv.style.visibility = "hidden";
        optionsDiv.style.opacity = 0;
    }
}

export async function addToQueue() {
    const { id, type } = this;
    if (id && type) {
        let songArray = [];
        if (type === "album" || type === "playlist") {
            const albumData = await axios.get(`https://saavn.me/${type}s?id=${id}`);
            songArray = albumData.data.data.songs;
        } else if (type === "song") {
            const songData = await axios.get(`https://saavn.me/songs?id=${id}`);
            songArray = songData.data.data;
        } else if (type === "my-plylist") {
            const data = localStorage.getItem("my-playlists") ? JSON.parse(localStorage.getItem("my-playlists")) : [];
            const prevSongs = data.filter((playlist, idx) => {
                return playlist.id === id;
            })[0];
            songArray = prevSongs.songs;
        }

        return songArray.map((song) => song.id);
    }
}
